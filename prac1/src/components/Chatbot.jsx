import React, { useState, useRef, useEffect, useContext } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaShoppingBag, FaHeart, FaExternalLinkAlt } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add } from '../routes/slices/CartSlice';
import { addLike } from '../routes/slices/LikeSlice';
import { toast } from 'react-toastify';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi there! I'm your AI Personal Stylist. 🤖 Tell me what you're looking for! Try: 'nike shoes', 'headphones under $200', 'gaming laptop', or 'show me sneakers'", sender: 'bot' }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const { products, theme } = useContext(AppContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Parse price from query
    const parsePriceFilter = (query) => {
        const lowerQuery = query.toLowerCase();
        let minPrice = 0;
        let maxPrice = Infinity;

        // Match patterns like "under $100", "below 200", "less than $50"
        const underMatch = lowerQuery.match(/(?:under|below|less than|cheaper than)\s*\$?(\d+)/);
        if (underMatch) {
            maxPrice = parseFloat(underMatch[1]);
        }

        // Match patterns like "over $100", "above 200", "more than $50"
        const overMatch = lowerQuery.match(/(?:over|above|more than|expensive than)\s*\$?(\d+)/);
        if (overMatch) {
            minPrice = parseFloat(overMatch[1]);
        }

        // Match patterns like "between $50 and $100", "from 50 to 100"
        const betweenMatch = lowerQuery.match(/(?:between|from)\s*\$?(\d+)\s*(?:and|to|-)\s*\$?(\d+)/);
        if (betweenMatch) {
            minPrice = parseFloat(betweenMatch[1]);
            maxPrice = parseFloat(betweenMatch[2]);
        }

        return { minPrice, maxPrice };
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setInput("");
        setIsTyping(true);

        // Simulate AI thinking delay
        setTimeout(() => {
            const recommendations = findProducts(userMessage);

            if (recommendations.length > 0) {
                setMessages(prev => [
                    ...prev,
                    {
                        text: `I found ${recommendations.length} items that match your style! Check these out:`,
                        sender: 'bot',
                        products: recommendations.slice(0, 5) // Show top 5
                    }
                ]);
            } else {
                // Suggest categories when no results
                const categories = [...new Set(products.map(p => p.category))].sort();
                const categoryList = categories.slice(0, 5).join(', ');
                setMessages(prev => [
                    ...prev,
                    {
                        text: `Hmm, I couldn't find anything matching that exactly. Try searching for:\n\n📦 Categories: ${categoryList}\n💰 Price: "under $100", "between $50-$200"\n🔍 Brands: "nike", "apple", "samsung"`,
                        sender: 'bot'
                    }
                ]);
            }
            setIsTyping(false);
        }, 1500);
    };

    const findProducts = (query) => {
        const lowerQuery = query.toLowerCase();
        const keywords = lowerQuery.split(" ").filter(word => word.length > 2); // Ignore small words
        const { minPrice, maxPrice } = parsePriceFilter(query);

        let results = products.filter(product => {
            const title = product.title.toLowerCase();
            const desc = product.description.toLowerCase();
            const category = product.category.toLowerCase();

            // Check if ANY keyword matches title, description or category
            const matchesKeywords = keywords.some(keyword =>
                title.includes(keyword) ||
                desc.includes(keyword) ||
                category.includes(keyword)
            );

            // Check price range
            const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

            return matchesKeywords && matchesPrice;
        });

        // Sort by rating (highest first)
        results.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));

        return results;
    };

    const handleAddToCart = (product) => {
        dispatch(add(product));
        toast.success(`${product.title} added to cart!`);
    };

    const handleAddToFavorites = (product) => {
        dispatch(addLike(product));
        toast.info(`${product.title} added to favorites!`);
    };

    const handleViewProduct = (product) => {
        if (product.productUrl) {
            window.open(product.productUrl, '_blank', 'noopener,noreferrer');
        }
    };

    // Quick reply buttons
    const quickReplies = [
        "Show me sneakers",
        "Electronics under $500",
        "Top rated products"
    ];

    const handleQuickReply = (reply) => {
        setInput(reply);
    };

    // Theme classes
    const bgClass = theme === 'dark' ? 'bg-slate-800' : 'bg-white';
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-800';
    const borderClass = theme === 'dark' ? 'border-slate-700' : 'border-gray-200';
    const inputBgClass = theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-800';

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {/* Chat Window */}
            {isOpen && (
                <div className={`mb-4 w-[380px] h-[550px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp border ${bgClass} ${borderClass}`}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-2 rounded-full">
                                <FaRobot className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">AI Stylist</h3>
                                <p className="text-xs opacity-80">Always online</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
                            <FaTimes />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : `${theme === 'dark' ? 'bg-slate-700 text-gray-100' : 'bg-white text-gray-800 border border-gray-200'} rounded-bl-none shadow-sm`
                                    }`}>
                                    <p className="whitespace-pre-line">{msg.text}</p>

                                    {/* Product Recommendations */}
                                    {msg.products && (
                                        <div className="mt-3 space-y-2">
                                            {msg.products.map(product => (
                                                <div
                                                    key={product.id}
                                                    className={`flex gap-2 p-2 rounded-lg ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-50'}`}
                                                >
                                                    <img src={product.image} alt={product.title} className="w-12 h-12 object-contain bg-white rounded" />
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="font-bold text-xs truncate">{product.title}</p>
                                                        <p className="text-xs text-green-500 font-bold">${product.price}</p>
                                                        <div className="flex gap-1 mt-1">
                                                            <button
                                                                onClick={() => handleAddToCart(product)}
                                                                className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition flex items-center gap-1"
                                                                title="Add to Cart"
                                                            >
                                                                <FaShoppingBag className="text-[10px]" />
                                                                Cart
                                                            </button>
                                                            <button
                                                                onClick={() => handleAddToFavorites(product)}
                                                                className="text-xs bg-pink-600 text-white px-2 py-1 rounded hover:bg-pink-700 transition flex items-center gap-1"
                                                                title="Add to Favorites"
                                                            >
                                                                <FaHeart className="text-[10px]" />
                                                            </button>
                                                            {product.productUrl && (
                                                                <button
                                                                    onClick={() => handleViewProduct(product)}
                                                                    className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700 transition flex items-center gap-1"
                                                                    title="View on Store"
                                                                >
                                                                    <FaExternalLinkAlt className="text-[10px]" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-white'} p-3 rounded-2xl rounded-bl-none shadow-sm border ${borderClass}`}>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    {messages.length <= 2 && (
                        <div className={`px-3 py-2 border-t ${borderClass} ${bgClass}`}>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Quick searches:</p>
                            <div className="flex gap-2 flex-wrap">
                                {quickReplies.map((reply, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleQuickReply(reply)}
                                        className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <form onSubmit={handleSend} className={`p-3 border-t ${borderClass} ${bgClass}`}>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className={`flex-1 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBgClass}`}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <FaPaperPlane className="text-sm" />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
                {isOpen ? <FaTimes className="text-xl" /> : <FaRobot className="text-2xl animate-pulse" />}

                {/* Tooltip */}
                {!isOpen && (
                    <span className="absolute right-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Ask AI Stylist
                    </span>
                )}
            </button>
        </div>
    );
};

export default Chatbot;
