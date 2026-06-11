import React from 'react';
import { FaTruck, FaUndo, FaShieldAlt, FaHeadphones, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const benefits = [
    {
      icon: <FaTruck className="text-xl group-hover:scale-110 transition-transform duration-300" />,
      title: "Free Delivery",
      subtitle: "On orders over INR 2,000",
    },
    {
      icon: <FaUndo className="text-xl group-hover:scale-110 transition-transform duration-300" />,
      title: "Easy Returns",
      subtitle: "30-day hassle-free",
    },
    {
      icon: <FaShieldAlt className="text-xl group-hover:scale-110 transition-transform duration-300" />,
      title: "Secure Checkout",
      subtitle: "100% encrypted",
    },
    {
      icon: <FaHeadphones className="text-xl group-hover:scale-110 transition-transform duration-300" />,
      title: "24/7 Support",
      subtitle: "Always here for you",
    },
  ];

  const paymentMethods = ["VISA", "MC", "AMEX", "PAYPAL"];

  return (
    <footer className="w-full bg-[#0A0A0A] font-sans">
      {/* Benefits Badges Section */}
      <div className="bg-[#111111] border-t border-b border-[#262626] py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((b, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl border border-[#262626] flex items-center justify-center bg-[#151515] text-[#10B981] group-hover:border-[#10B981]/30 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.02)]">
                {b.icon}
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-wider uppercase text-[#FFFFFF]">
                  {b.title}
                </h3>
                <p className="text-xs text-[#71717A] mt-0.5">{b.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright and Legal Section */}
      <div className="bg-[#0A0A0A] py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[10px] tracking-widest text-[#71717A] uppercase text-center md:text-left">
            &copy; 2026 ECOMZY. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            {/* Payment Logos */}
            <div className="flex gap-2">
              {paymentMethods.map((m) => (
                <span
                  key={m}
                  className="text-[9px] font-bold tracking-wider text-[#71717A] bg-[#111111] border border-[#262626] px-2.5 py-1 rounded"
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="bg-[#10B981] hover:bg-[#059669] text-[#0A0A0A] p-3 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
