import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { remove } from "../routes/slices/CartSlice";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  // ✅ handle confirm payment
  const handleConfirmPayment = () => {
    // clear cart
    cart.forEach((item) => dispatch(remove({ id: item.id })));

    setShowModal(false);
    toast.success("🎉 Thank you for your purchase!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {cart.length > 0 ? (
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 py-10">
          {/* Left Section: Cart Items */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-green-700 mb-6">Your Cart</h1>
            {cart.map((item, index) => (
              <CartItem key={item.id} item={item} itemIndex={index} />
            ))}
          </div>

          {/* Right Section: Summary */}
          <div className="w-full md:w-[300px] bg-white rounded-lg shadow-md p-6 h-fit sticky top-10">
            <h2 className="text-xl font-semibold text-green-700 mb-4">Summary</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Total Items:</span> {cart.length}
            </p>
            <p className="text-gray-700 mb-6">
              <span className="font-medium">Total Amount:</span> ${totalAmount.toFixed(2)}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition duration-200"
            >
              Checkout Now
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 space-y-6">
          <h1 className="text-2xl font-bold text-gray-700">Your Cart is Empty!</h1>
          <NavLink to={"/"}>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition duration-200">
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
            className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-green-700">Checkout</h2>

            {/* Billing Section */}
            <div className="space-y-4">
              {/* Address */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Address
                </label>
                <textarea
                  placeholder="Enter your delivery address"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows="3"
                ></textarea>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Payment Method
                </label>
                <select className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400">
                  <option>Credit/Debit Card</option>
                  <option>UPI</option>
                  <option>Cash on Delivery</option>
                </select>
              </div>

              {/* Order Summary */}
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Items Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Delivery Charges:</span>
                <span>$5</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-green-700">
                <span>Grand Total:</span>
                <span>${(totalAmount + 5).toFixed(2)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold"
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