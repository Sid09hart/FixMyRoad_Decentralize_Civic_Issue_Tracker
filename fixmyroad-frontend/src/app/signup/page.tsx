"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";  // Import the useAuth hook
import { api } from "@/lib/axios";  // Axios instance for API calls
import { AxiosError } from "axios";  // Import AxiosError for proper error typing
import { setToken } from "@/lib/auth";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();
  const { login } = useAuth();  // Use the login function from context

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  "use client";

// Inside SignupPage
const handleSubmit = async (e: any) => {
  e.preventDefault();
  try {
    const res = await api.post("/api/auth/register", form);
    console.log("Signup response:", res.data); // Log the response
    setToken(res.data.token);
     login(res.data.token, res.data.name, res.data.isAdmin);

    router.push("/");
    // window.location.reload(); 
  } catch (err: any) {
    console.log("Signup error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0f1a] px-4">
      <div className="w-full max-w-md p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500 text-transparent bg-clip-text">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
          />

          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
