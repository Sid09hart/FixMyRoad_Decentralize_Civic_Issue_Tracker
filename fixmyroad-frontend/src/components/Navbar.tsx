"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";  // Import the context hook
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, UserCircle, ShieldCheck } from "lucide-react";
import { useEffect } from "react"; // Ensure component re-renders on context update

export default function Navbar() {
  const { isAuthenticated, userName, isAdmin, logout } = useAuth(); // Access auth context

  // Ensure the component updates when the context changes
  useEffect(() => {
    console.log("Navbar re-rendered due to auth change", isAuthenticated,userName, isAdmin);
  }, [isAuthenticated,isAdmin]); // Only run when isAuthenticated or isAdmin changes

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1c1c1e] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Logo" className="h-8 w-8 rounded-full" />
            <Link href="/" className="text-2xl font-semibold tracking-tight text-white hover:text-gray-300">
              FixMyRoad
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <NavItem label="Dashboard" href="/dashboard" />
                <NavItem label="Report" href="/report" />
                <NavItem label="Leaderboard" href="/leaderboard" />
                {isAdmin && (
                  <NavItem
                    label="Admin"
                    href="/admin/dashboard"
                    icon={<ShieldCheck className="w-4 h-4 text-emerald-400" />}
                  />
                )}

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer border border-gray-600">
                      <AvatarImage src="" alt={userName || "User"} />
                      <AvatarFallback className="bg-gray-800 text-white">
                        {userName?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44 bg-[#2a2a2d] text-white border border-gray-700">
                    <DropdownMenuItem disabled>
                      <UserCircle className="w-4 h-4 mr-2 text-gray-400" />
                      {userName || "Profile"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="w-4 h-4 mr-2 text-red-500" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:text-gray-400">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-5 rounded-md">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ label, href, icon }: { label: string; href: string; icon?: React.ReactNode }) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className="text-white hover:text-emerald-400 transition px-3 flex items-center gap-1"
      >
        {icon}
        {label}
      </Button>
    </Link>
  );
}
