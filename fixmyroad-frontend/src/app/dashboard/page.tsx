"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";

// Types
type PotholeReport = {
  _id: string;
  photoUrl: string;
  description: string;
  status: string;
  points?: number;
  rewardPoints?: number;
  createdAt: string;
};

export default function DashboardPage() {
  const [reports, setReports] = useState<PotholeReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("/api/potholes/me", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setReports(res.data);
      } catch (err) {
        toast.error("Failed to fetch reports.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await api.get("/api/users/me", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setPoints(res.data.points || 0);
      } catch (err) {
        console.error("Failed to fetch user points", err);
      }
    };

    fetchReports();
    fetchUser();
  }, []);

  const statusBadge = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case "approved":
        return <Badge className="bg-green-600/10 text-green-400 border-green-600/40" variant="outline">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-600/10 text-red-400 border-red-600/40" variant="outline">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500/10 text-yellow-300 border-yellow-500/40" variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] py-16 px-4 text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#00f7f0] mb-2">
            🗂 My Reports
          </h1>
          <p className="text-lg text-zinc-400 font-medium">
            🎁 Reward Points: <span className="text-white font-bold">{points}</span>
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-32 w-full rounded-xl bg-zinc-800" />
            ))}
          </div>
        ) : reports.length === 0 ? (
          <p className="text-center text-zinc-400 text-lg">
            No reports submitted yet.
          </p>
        ) : (
          <div className="grid gap-6">
            {reports.map((report) => (
              <Card key={report._id} className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl shadow-md">
                <CardHeader className="flex flex-row justify-between items-start gap-4 pb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={report.photoUrl}
                      alt="Report"
                      className="w-24 h-24 object-cover rounded-lg border border-zinc-700"
                    />
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold text-white">
                        {report.description}
                      </CardTitle>
                      <p className="text-sm text-zinc-400">
                        📅 {new Date(report.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    {statusBadge(report.status)}
                    {report.rewardPoints != null && (
                      <p className="text-sm text-teal-400 font-medium">
                        +{report.rewardPoints} points
                      </p>
                    )}

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive" className="gap-1 bg-red-600 hover:bg-red-700">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-[#1e1e1e] border border-zinc-700 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this report?</AlertDialogTitle>
                          <AlertDialogDescription className="text-zinc-400">
                            This will permanently remove the report and deduct any earned points.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={async () => {
                              try {
                                await api.delete(`/api/potholes/${report._id}`, {
                                  headers: { Authorization: `Bearer ${getToken()}` },
                                });
                                setReports((prev) => prev.filter((r) => r._id !== report._id));
                                setPoints((prev) => prev - (report.rewardPoints || 0));
                                toast.success("Report deleted.");
                              } catch (err) {
                                toast.error("Failed to delete report.");
                                console.error(err);
                              }
                            }}
                          >
                            Yes, Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}