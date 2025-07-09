// src/app/layout.tsx (or RootLayout.tsx)

import "./globals.css";
import Navbar from "@/components/Navbar";
import { Urbanist } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";  // Import AuthProvider

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
});

export const metadata = {
  title: "FixMyRoad",
  description: "Report potholes. Make roads better.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${urbanist.variable} font-sans`}>
      <body className="bg-[#0c0f1a] text-white font-sans">
        <AuthProvider>  {/* Wrap the app with AuthProvider */}
          <Navbar />
          <Toaster richColors position="top-center" />
          <main>{children}</main>  {/* Render page-specific content */}
        </AuthProvider>
      </body>
    </html>
  );
}
