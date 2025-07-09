// src/lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Comes from .env
  withCredentials: true, // If you’re using cookies for auth
});
