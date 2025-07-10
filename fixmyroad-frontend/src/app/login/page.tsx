"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";  // Import the useAuth hook
import { api } from "@/lib/axios";  // Axios instance for API calls
import { setToken } from "@/lib/auth";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const { login } = useAuth();  // Use the login function from context

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  "use client";

// Inside LoginPage
const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();
  try {
    const res = await api.post("/api/auth/login", form);
    console.log("Login response:", res.data); // Log the full response
    setToken(res.data.token);  // Ensure the token is saved

     login(res.data.token, res.data.name, res.data.isAdmin);

    router.push("/");  // Redirect to home after successful login
  } catch (err) {
    console.log("Login error:", err);  // Log the error response
    alert("Login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0f1a] px-4">
      <div className="w-full max-w-md p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Login to FixMyRoad
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
            />
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-green-400 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
