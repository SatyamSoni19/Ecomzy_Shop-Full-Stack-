import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const BASE_URL = window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://ecomzy-shop-full-stack.onrender.com";

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/api/v1/auth/google`;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Enable cookies
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Welcome back! 🚀");
        //localStorage.setItem("token", data.token);
        if (data.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        setIsAuthenticated(true);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#10B981]/5 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#10B981]/5 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-[#111111] rounded-2xl border border-[#262626] shadow-[0_0_50px_rgba(0,0,0,0.8)] hover:border-[#10B981]/25 hover:shadow-[0_0_40px_rgba(16,185,129,0.05)] transition-all duration-500">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-wider text-[#FFFFFF] mb-2 uppercase">
            Welcome Back
          </h1>
          <p className="text-[#A1A1AA] text-sm tracking-wide">Sign in to continue your journey</p>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 mb-6 text-sm font-semibold rounded-lg bg-[#1A1A1A] border border-[#333333] text-[#FFFFFF] hover:bg-[#222222] hover:border-[#10B981]/40 focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
        >
          <FaGoogle className="text-lg" style={{ color: "#4285F4" }} />
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-[#262626]"></div>
          <span className="text-xs text-[#71717A] uppercase tracking-wider font-medium">or</span>
          <div className="flex-1 h-px bg-[#262626]"></div>
        </div>

        <form className="space-y-6" onSubmit={submitHandler}>
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-[#71717A] group-focus-within:text-[#10B981] transition-colors duration-300" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={changeHandler}
                className="w-full pl-10 pr-4 py-3 bg-[#151515] border border-[#262626] rounded-lg text-[#FFFFFF] placeholder-[#71717A] focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/30 transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-[#71717A] group-focus-within:text-[#10B981] transition-colors duration-300" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={changeHandler}
                className="w-full pl-10 pr-12 py-3 bg-[#151515] border border-[#262626] rounded-lg text-[#FFFFFF] placeholder-[#71717A] focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/30 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#71717A] hover:text-[#10B981] transition-colors cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full group relative flex justify-center items-center py-3 px-4 text-sm font-bold rounded-lg text-[#0A0A0A] bg-[#10B981] hover:bg-[#059669] focus:outline-none focus:ring-1 focus:ring-[#10B981] transition-all duration-300 transform active:scale-[0.98] shadow-md uppercase tracking-wider font-semibold cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Sign In <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#71717A] text-sm">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="font-bold text-[#10B981] hover:text-[#6EE7B7] transition-colors duration-300"
            >
              Create Account
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;