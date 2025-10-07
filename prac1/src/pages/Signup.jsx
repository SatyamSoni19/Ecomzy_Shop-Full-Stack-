import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Make submitHandler async
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Signup Successful 🎉");
        navigate("/login");
      } else {
        toast.error(data.message || "Signup failed!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl w-[90%] sm:w-[400px] p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-md">
          Create Account 🚀
        </h1>
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={changeHandler}
            className="px-4 py-3 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={changeHandler}
            className="px-4 py-3 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={changeHandler}
            className="px-4 py-3 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-white mt-6">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-yellow-300 font-bold hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;