import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Make this async
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Login Successful 🎉");

        // Token save in localStorage
        localStorage.setItem("token", data.token);

        setIsAuthenticated(true);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Invalid email or password!");
    }
  };

  // ✅ Return should be inside the component
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl w-[90%] sm:w-[400px] p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-md">
          Welcome Back 👋
        </h1>
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={changeHandler}
            className="px-4 py-3 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={changeHandler}
            className="px-4 py-3 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            Login
          </button>
        </form>
        <p className="text-center text-white mt-6">
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            className="text-yellow-300 font-bold hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;