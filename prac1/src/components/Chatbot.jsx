import React, { useState, useRef, useEffect, useContext } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaShoppingBag, FaHeart } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCartAPI } from '../routes/slices/CartSlice';
import { addToFavAPI } from '../routes/slices/LikeSlice';
import { toast } from 'react-toastify';

const BASE_URL = window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://ecomzy-shop-full-stack.onrender.com";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi there! I'm your AI Shopping Assistant. 🤖 Tell me what you're looking for! Try: 'gaming laptops under $2000', 'best headphones for gym', 'compare iPhone and Samsung', or 'show me sneakers'", sender: 'bot' }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const messagesEndRef = useRef(null);
    const { allProducts, theme } = useContext(AppContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setInput("");
        setIsTyping(true);

        // Update chat history with user message
        const updatedHistory = [...chatHistory, { role: 'user', text: userMessage }];

        try {
            const response = await fetch(`${BASE_URL}/api/v1/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    message: userMessage,
                    products: allProducts,
                    chatHistory: updatedHistory.slice(-10),
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Map recommended product IDs to actual product objects
                const recommendedProducts = (data.recommendedProducts || [])
                    .map(id => allProducts.find(p => p.id === id))
                    .filter(Boolean)
                    .slice(0, 5);

                setMessages(prev => [
                    ...prev,
                    {
                        text: data.reply,
                        sender: 'bot',
                        products: recommendedProducts.length > 0 ? recommendedProducts : undefined,
                    }
                ]);

                // Update chat history with bot response
                setChatHistory([
                    ...updatedHistory,
                    { role: 'bot', text: data.reply }
                ]);
            } else {
                setMessages(prev => [
                    ...prev,
                    { text: data.message || "Sorry, I couldn't process that. Please try again!", sender: 'bot' }
                ]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [
                ...prev,
                { text: "Oops! I'm having trouble connecting right now. Please try again in a moment. 🔄", sender: 'bot' }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        dispatch(addToCartAPI({ productId: product.id, title: product.title, category: product.category }));
        toast.success(`${product.title} added to cart!`);
    };

    const handleAddToFavorites = (e, product) => {
        e.stopPropagation();
        dispatch(addToFavAPI({ productId: product.id, title: product.title, category: product.category }));
        toast.info(`${product.title} added to favorites!`);
    };

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`);
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

    // Premium dark luxury theme styles
    const bgClass = 'bg-[#111111]';
    const textClass = 'text-[#FFFFFF]';
    const borderClass = 'border-[#262626]';
    const inputBgClass = 'bg-[#151515] text-[#FFFFFF] placeholder-[#71717A] border border-[#262626] focus:border-[#10B981]';

    return (
        <>
            {/* Backdrop Blur Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className="fixed bottom-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 right-0 sm:right-6 left-0 sm:left-auto z-50 font-sans px-2 sm:px-0">
                {/* Chat Window */}
                {isOpen && (
                    <div className={`mb-4 w-full sm:w-[380px] md:w-[400px] h-[70vh] sm:h-[400px] md:h-[420px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp border ${bgClass} ${borderClass}`}>
                        {/* Header */}
                        <div className="bg-[#111111] border-b border-[#262626] p-3 sm:p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-2">
                                <div className="bg-[#151515] border border-[#262626] p-1.5 sm:p-2 rounded-full text-[#10B981]">
                                    <FaRobot className="text-lg sm:text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xs sm:text-sm tracking-wider uppercase">AI Stylist</h3>
                                    <p className="text-[10px] sm:text-xs text-[#10B981] opacity-90">Always online</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-[#151515] p-1 rounded-full transition text-white">
                                <FaTimes className="text-lg sm:text-xl" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-[#0A0A0A]">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-2 sm:p-3 text-xs sm:text-sm ${msg.sender === 'user'
                                        ? 'bg-[#10B981]/25 border border-[#10B981]/40 text-[#FFFFFF] rounded-br-none'
                                        : 'bg-[#151515] border border-[#262626] text-[#FFFFFF] rounded-bl-none shadow-sm'
                                        }`}>
                                        <p className="whitespace-pre-line">{msg.text}</p>

                                        {/* Product Recommendations */}
                                        {msg.products && (
                                            <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
                                                {msg.products.map(product => (
                                                    <div
                                                        key={product.id}
                                                        onClick={() => handleProductClick(product)}
                                                        className="flex gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg bg-[#111111] border border-[#262626] cursor-pointer hover:border-[#10B981]/40 hover:bg-[#151515] transition-all duration-200"
                                                    >
                                                        <img src={product.image} alt={product.title} className="w-10 h-10 sm:w-12 sm:h-12 object-contain bg-white rounded flex-shrink-0 p-1" />
                                                        <div className="flex-1 overflow-hidden min-w-0">
                                                            <p className="font-bold text-[10px] sm:text-xs truncate text-white hover:text-[#10B981] transition-colors">{product.title}</p>
                                                            <p className="text-[10px] sm:text-xs text-[#10B981] font-bold">${product.price}</p>
                                                            <div className="flex gap-0.5 sm:gap-1 mt-1 flex-wrap">
                                                                <button
                                                                    onClick={(e) => handleAddToCart(e, product)}
                                                                    className="text-[10px] sm:text-xs bg-[#10B981] hover:bg-[#059669] text-[#0A0A0A] px-2.5 py-1 rounded transition duration-200 flex items-center gap-1 font-bold cursor-pointer"
                                                                    title="Add to Cart"
                                                                >
                                                                    <FaShoppingBag className="text-[8px] sm:text-[10px]" />
                                                                    <span>Cart</span>
                                                                </button>
                                                                <button
                                                                    onClick={(e) => handleAddToFavorites(e, product)}
                                                                    className="text-[10px] sm:text-xs bg-[#151515] text-[#10B981] border border-[#10B981]/30 hover:bg-[#10B981]/10 px-2 py-1 rounded transition flex items-center gap-0.5 cursor-pointer"
                                                                    title="Add to Favorites"
                                                                >
                                                                    <FaHeart className="text-[8px] sm:text-[10px]" />
                                                                </button>
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
                                    <div className="bg-[#151515] p-2 sm:p-3 rounded-2xl rounded-bl-none shadow-sm border border-[#262626]">
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#10B981] rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#10B981] rounded-full animate-bounce delay-100"></div>
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#10B981] rounded-full animate-bounce delay-200"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {messages.length <= 2 && (
                            <div className={`px-2 sm:px-3 py-1.5 sm:py-2 border-t border-[#262626] ${bgClass}`}>
                                <p className="text-[10px] sm:text-xs text-[#71717A] mb-1 sm:mb-2 uppercase tracking-wider">Quick searches:</p>
                                <div className="flex gap-1 sm:gap-2 flex-wrap">
                                    {quickReplies.map((reply, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleQuickReply(reply)}
                                            className="text-[10px] sm:text-xs bg-[#151515] border border-[#262626] text-[#10B981] px-2.5 sm:px-3 py-1 rounded-full hover:bg-[#10B981]/10 transition cursor-pointer"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        <form onSubmit={handleSend} className={`p-2 sm:p-3 border-t border-[#262626] ${bgClass}`}>
                            <div className="flex gap-1.5 sm:gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={isTyping ? "AI is thinking..." : "Ask me anything..."}
                                    disabled={isTyping}
                                    className={`flex-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 disabled:opacity-50 ${inputBgClass}`}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="bg-[#10B981] text-[#0A0A0A] p-2 rounded-full hover:bg-[#059669] disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer flex items-center justify-center w-8 h-8"
                                >
                                    <FaPaperPlane className="text-xs sm:text-sm" />
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Floating Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#10B981] text-[#0A0A0A] hover:bg-[#059669] rounded-full shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 ml-auto mr-2 sm:mr-0 cursor-pointer"
                >
                    {isOpen ? <FaTimes className="text-lg sm:text-xl" /> : <FaRobot className="text-xl sm:text-2xl animate-pulse" />}

                    {/* Tooltip */}
                    {!isOpen && (
                        <span className="hidden sm:block absolute right-16 bg-[#111111] border border-[#262626] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Ask AI Stylist
                        </span>
                    )}
                </button>
            </div>
        </>
    );
};

export default Chatbot;
