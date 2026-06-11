import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useDispatch } from "react-redux";
import { fetchCart } from "../routes/slices/CartSlice";
import { fetchFavourites } from "../routes/slices/LikeSlice";

const GoogleSuccess = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("loading"); // loading | success | error

  const BASE_URL = window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://ecomzy-shop-full-stack.onrender.com";

  useEffect(() => {
    const handleGoogleSuccess = async () => {
      try {
        // The JWT is already set as an httpOnly cookie by the backend redirect.
        // We just need to fetch the user profile to get user data.
        const response = await fetch(`${BASE_URL}/api/v1/profile`, {
          method: "GET",
          credentials: "include", // Sends the httpOnly cookie
        });

        const data = await response.json();

        if (data.success && data.user) {
          // Store user exactly like existing login does
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          setIsAuthenticated(true);

          // Hydrate cart & favourites from MongoDB
          dispatch(fetchCart());
          dispatch(fetchFavourites());

          setStatus("success");
          toast.success("Welcome! Google login successful 🎉");

          // Redirect to homepage after brief delay
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setStatus("error");
          toast.error("Google login failed. Please try again.");
          setTimeout(() => navigate("/login"), 2000);
        }
      } catch (error) {
        console.error("Google success handler error:", error);
        setStatus("error");
        toast.error("Something went wrong. Please try again.");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    handleGoogleSuccess();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#10B981]/5 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#10B981]/5 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 text-center p-12 bg-[#111111] rounded-2xl border border-[#262626] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-[#FFFFFF] mb-2">Signing you in...</h2>
            <p className="text-[#A1A1AA] text-sm">Completing Google authentication</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#10B981]/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#FFFFFF] mb-2">Welcome!</h2>
            <p className="text-[#A1A1AA] text-sm">Redirecting to homepage...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#FFFFFF] mb-2">Authentication Failed</h2>
            <p className="text-[#A1A1AA] text-sm">Redirecting to login...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleSuccess;
