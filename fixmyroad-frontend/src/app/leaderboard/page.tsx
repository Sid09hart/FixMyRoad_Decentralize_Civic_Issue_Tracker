"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

type User = {
  name: string;
  email: string;
  points: number;
};

const rankBadge = (rank: number) => {
  const styles = [
    "bg-yellow-400 text-black", // 🥇 1st
    "bg-gray-400 text-white",   // 🥈 2nd
    "bg-orange-500 text-white", // 🥉 3rd
  ];
  return (
    <Badge className={`rounded-full px-3 py-1 text-sm font-medium ${styles[rank] || "bg-neutral-600 text-white"}`}>
      #{rank + 1}
    </Badge>
  );
};

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/users/leaderboard")
      .then((res) => setUsers(res.data))
      .catch(() => console.error("Leaderboard fetch failed"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1c1c1c] to-[#101010] py-20 px-4 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          🏆 Leaderboard
        </h1>

        <Card className="bg-[#1b1b1b]/80 backdrop-blur-md border border-neutral-700 shadow-2xl rounded-2xl">
          <CardContent className="p-6">
            <ScrollArea className="h-[400px] pr-2">
              <div className="space-y-4">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        className="h-16 w-full rounded-xl bg-[#2a2a2a]"
                      />
                    ))
                  : users.map((user, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 ${
                          index < 3
                            ? "bg-gradient-to-r from-purple-800/40 via-pink-600/20 to-transparent"
                            : "bg-neutral-800/40"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {rankBadge(index)}
                          <div>
                            <div className="text-lg font-semibold text-white">{user.name}</div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                          </div>
                        </div>
                        <div className="text-right text-blue-400 font-bold text-lg">
                          {user.points} pts
                        </div>
                      </div>
                    ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
