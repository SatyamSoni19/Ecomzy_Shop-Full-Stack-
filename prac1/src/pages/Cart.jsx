import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';
import { NavLink } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { toast } from "react-toastify";
import { clearCartAPI } from "../routes/slices/CartSlice";
import { AppContext } from '../context/AppContext';
import { products as allProducts } from '../data';

const Cart = () => {
  // cart is now an array of product IDs from MongoDB
  const cartIds = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { theme } = useContext(AppContext);

  // Group items by quantity
  const itemCounts = {};
  cartIds.forEach(id => {
    itemCounts[id] = (itemCounts[id] || 0) + 1;
  });

  // Resolve product IDs to full product objects with quantity
  const cartItems = Object.keys(itemCounts)
    .map((id) => {
      const product = allProducts.find((p) => p.id === Number(id));
      if (product) return { ...product, quantity: itemCounts[id] };
      return null;
    })
    .filter(Boolean); // filter out any IDs not found in data.js

  const totalItemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  useEffect(() => {
    setTotalAmount(cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0));
  }, [cartItems]);

  // ✅ handle confirm payment — clear cart via API
  const handleConfirmPayment = () => {
    dispatch(clearCartAPI());

    setShowModal(false);
    toast.success("🎉 Thank you for your purchase!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  // Premium dark luxury theme styles
  const bgClass = 'bg-[#0A0A0A]';
  const textClass = 'text-[#FFFFFF]';
  const summaryBgClass = 'bg-[#111111] border border-[#262626] text-[#FFFFFF]';
  const modalBgClass = 'bg-[#111111] border border-[#262626] text-[#FFFFFF]';
  const inputBgClass = 'bg-[#151515] border-[#262626] text-[#FFFFFF] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/30';

  return (
    <div className={`min-h-screen p-4 transition-all duration-300 ${bgClass}`}>
      {cartItems.length > 0 ? (
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 py-10">
          {/* Left Section: Cart Items */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#10B981] mb-6 uppercase tracking-wider">Your Cart</h1>
            {cartItems.map((item, index) => (
              <CartItem key={item.id} item={item} itemIndex={index} />
            ))}
          </div>

          {/* Right Section: Summary */}
          <div className={`w-full md:w-[300px] rounded-lg shadow-md p-6 h-fit sticky top-10 transition-colors duration-300 ${summaryBgClass}`}>
            <h2 className="text-xl font-semibold text-[#10B981] mb-4 uppercase tracking-wider">Summary</h2>
            <p className="mb-2 text-[#A1A1AA]">
              <span className="font-medium">Total Items:</span> {totalItemsCount}
            </p>
            <p className="mb-6 text-[#A1A1AA]">
              <span className="font-medium">Total Amount:</span> ${totalAmount.toFixed(2)}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-[#10B981] hover:bg-[#059669] text-[#0A0A0A] py-2.5 rounded font-semibold transition duration-300 uppercase tracking-wider text-sm cursor-pointer shadow-md active:scale-98"
            >
              Checkout Now
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 space-y-6">
          <h1 className={`text-2xl font-bold ${textClass}`}>Your Cart is Empty!</h1>
          <NavLink to={"/"}>
            <button className="bg-[#10B981] hover:bg-[#059669] text-[#0A0A0A] px-6 py-2.5 rounded transition duration-300 uppercase tracking-wider font-semibold cursor-pointer active:scale-98 shadow-md">
              Shop Now
            </button>
          </NavLink>
        </div>
      )}

      {/* ✅ Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // stop closing when clicking inside modal
            className={`rounded-xl shadow-lg p-6 w-[90%] max-w-lg transition-all duration-300 ${modalBgClass}`}
          >
            <h2 className="text-2xl font-bold mb-4 text-[#10B981] uppercase tracking-wider">Checkout</h2>

            {/* Billing Section */}
            <div className="space-y-4">
              {/* Address */}
              <div>
                <label className="block font-medium mb-1 text-[#A1A1AA]">
                  Address
                </label>
                <textarea
                  placeholder="Enter your delivery address"
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 focus:border-[#10B981] ${inputBgClass}`}
                  rows="3"
                ></textarea>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block font-medium mb-1 text-[#A1A1AA]">
                  Payment Method
                </label>
                <select className={`w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 focus:border-[#10B981] ${inputBgClass}`}>
                  <option>Credit/Debit Card</option>
                  <option>UPI</option>
                  <option>Cash on Delivery</option>
                </select>
              </div>

              {/* Order Summary */}
              <div className="flex justify-between font-medium text-[#A1A1AA]">
                <span>Items Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-[#A1A1AA]">
                <span>Delivery Charges:</span>
                <span>$5</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#10B981]">
                <span>Grand Total:</span>
                <span>${(totalAmount + 5).toFixed(2)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 rounded font-medium bg-[#151515] border border-[#262626] hover:bg-[#262626] text-white uppercase tracking-wider text-sm transition-colors duration-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="px-6 py-2.5 rounded bg-[#10B981] hover:bg-[#059669] text-[#0A0A0A] font-bold uppercase tracking-wider text-sm transition-colors duration-300 shadow-md active:scale-98 cursor-pointer"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;