const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are Ecomzy AI Shopping Assistant.

Your purpose is to help customers discover products, compare options, recommend products, explain features, and improve shopping decisions.

Rules:
- Only recommend products provided in the product list.
- Never invent products.
- Explain why products match the user's needs.
- If no exact match exists, suggest the closest alternatives from the product list.
- Be concise and helpful.
- Sound like a premium shopping assistant.
- Use emojis sparingly to feel friendly but professional.

IMPORTANT: You must ALWAYS respond in this exact valid JSON format and nothing else:
{
  "reply": "Your explanation and recommendations here",
  "recommendedProductIds": [1, 2, 3]
}

If the user is just greeting or chatting (not asking about products), still use the JSON format but set recommendedProductIds to an empty array [].`;

// ============================================================
// Pre-filter products on the server (keeps Gemini token cost low)
// ============================================================
const preFilterProducts = (query, products) => {
    const lowerQuery = query.toLowerCase();
    const keywords = lowerQuery
        .split(/\s+/)
        .filter((word) => word.length > 2)
        .filter((word) => !["the", "and", "for", "can", "you", "show", "find", "get", "what", "which", "are", "best", "good", "top", "give", "want", "need", "looking", "some", "any", "please", "help", "with"].includes(word));

    // Parse price constraints from the query
    let minPrice = 0;
    let maxPrice = Infinity;

    const underMatch = lowerQuery.match(/(?:under|below|less than|cheaper than|max|upto|up to)\s*\$?(\d+)/);
    if (underMatch) maxPrice = parseFloat(underMatch[1]);

    const overMatch = lowerQuery.match(/(?:over|above|more than|at least|min|minimum)\s*\$?(\d+)/);
    if (overMatch) minPrice = parseFloat(overMatch[1]);

    const betweenMatch = lowerQuery.match(/(?:between|from)\s*\$?(\d+)\s*(?:and|to|-)\s*\$?(\d+)/);
    if (betweenMatch) {
        minPrice = parseFloat(betweenMatch[1]);
        maxPrice = parseFloat(betweenMatch[2]);
    }

    // Score each product by relevance
    const scored = products.map((product) => {
        let score = 0;
        const title = product.title.toLowerCase();
        const desc = product.description.toLowerCase();
        const category = product.category.toLowerCase();

        keywords.forEach((keyword) => {
            if (title.includes(keyword)) score += 3;    // Title match = highest
            if (category.includes(keyword)) score += 2; // Category match
            if (desc.includes(keyword)) score += 1;     // Description match
        });

        // Price filter — only penalise if price constraints exist
        if (product.price < minPrice || product.price > maxPrice) {
            score = -1; // Exclude out-of-range products
        }

        // Bonus for high rating
        if (product.rating && product.rating.rate >= 4.7) score += 0.5;

        return { ...product, score };
    });

    // Return top 10 products with score > 0, or top 10 by rating if nothing matched
    const matched = scored.filter((p) => p.score > 0).sort((a, b) => b.score - a.score);

    if (matched.length > 0) {
        return matched.slice(0, 10);
    }

    // Fallback: return top 10 by rating so Gemini always has something to work with
    return [...products]
        .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
        .slice(0, 10);
};

// ============================================================
// Extract JSON from Gemini response (handles markdown fences)
// ============================================================
const extractJSON = (text) => {
    // Try direct parse first
    try {
        return JSON.parse(text);
    } catch (_) {
        // ignore
    }

    // Try extracting from markdown code fences
    const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
        try {
            return JSON.parse(fenceMatch[1].trim());
        } catch (_) {
            // ignore
        }
    }

    // Try extracting first { ... } block
    const braceMatch = text.match(/\{[\s\S]*\}/);
    if (braceMatch) {
        try {
            return JSON.parse(braceMatch[0]);
        } catch (_) {
            // ignore
        }
    }

    // Complete fallback
    return {
        reply: text,
        recommendedProductIds: [],
    };
};

// ============================================================
// POST /api/v1/chat
// ============================================================
exports.chat = async (req, res) => {
    try {
        const { message, products, chatHistory } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Products list is required",
            });
        }

        // Step 1: Pre-filter products
        const filteredProducts = preFilterProducts(message, products);

        // Step 2: Build product context for Gemini (minimal fields to save tokens)
        const productContext = filteredProducts.map((p) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            category: p.category,
            description: p.description,
            rating: p.rating?.rate || 0,
            ratingCount: p.rating?.count || 0,
        }));

        // Step 3: Build conversation history (last 10 messages)
        const recentHistory = (chatHistory || []).slice(-10);
        const historyText = recentHistory
            .map((msg) => `${msg.role === "user" ? "Customer" : "Assistant"}: ${msg.text}`)
            .join("\n");

        // Step 4: Build the full prompt
        const userPrompt = `${historyText ? `Previous conversation:\n${historyText}\n\n` : ""}Available products:\n${JSON.stringify(productContext, null, 2)}\n\nCustomer's new message: "${message}"\n\nRespond with the JSON format specified in your instructions.`;

        // Step 5: Call Gemini 2.5 Flash
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: SYSTEM_PROMPT,
        });

        const result = await model.generateContent(userPrompt);
        const response = result.response;
        const responseText = response.text();

        // Step 6: Parse structured response
        const parsed = extractJSON(responseText);

        return res.status(200).json({
            success: true,
            reply: parsed.reply || "I'm here to help! Could you tell me more about what you're looking for?",
            recommendedProducts: parsed.recommendedProductIds || [],
        });
    } catch (error) {
        console.error("Chat Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get AI response. Please try again.",
            error: error.message,
        });
    }
};
