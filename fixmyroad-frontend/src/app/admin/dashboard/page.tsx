"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { getToken } from "@/lib/auth";
import { toast } from "sonner";

type Report = {
  _id: string;
  photoUrl: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  rewardPoints?: number;
  createdAt: string;
  reportedBy: {
    name: string;
    email: string;
  };
};

export default function AdminDashboardPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [editingRewardId, setEditingRewardId] = useState<string | null>(null);
  const [newRewardPoints, setNewRewardPoints] = useState<number>(0);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get("/api/admin/reports", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setReports(res.data);
    } catch {
      toast.error("Failed to load reports");
    }
  };

  const filteredReports =
    filter === "all"
      ? reports
      : reports.filter((r) => r.status?.toLowerCase() === filter);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      setLoading(true);
      const res = await api.put(
        `/api/admin/reports/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(`Report ${status}`);
      if (res.data?.emailSent) {
        toast.success("✅ Email sent to user and authority");
      }
      fetchReports();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (id: string) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    try {
      setLoading(true);
      await api.delete(`/api/admin/reports/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      toast.success("Report deleted");
      fetchReports();
    } catch {
      toast.error("Failed to delete report");
    } finally {
      setLoading(false);
    }
  };

  const saveRewardPoints = async (id: string) => {
    try {
      setLoading(true);
      await api.patch(
        `/api/admin/reports/${id}/reward`,
        { rewardPoints: newRewardPoints },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success("Reward points updated");
      fetchReports();
      setEditingRewardId(null);
    } catch {
      toast.error("Failed to update reward points");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-[#0c0f1a] text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text">
        Admin Dashboard
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-3 mb-8">
        {["all", "pending", "approved", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === status
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Reports */}
      <div className="grid gap-6 max-w-4xl mx-auto">
        {filteredReports.map((report) => (
          <div
            key={report._id}
            className="rounded-2xl p-5 backdrop-blur-md bg-white/5 border border-white/10 shadow-md transition-all hover:shadow-lg"
          >
            <img
              src={report.photoUrl}
              alt="Pothole"
              className="w-full h-60 object-cover rounded-xl mb-4 border border-white/10"
            />

            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">📍 Description:</span>{" "}
                {report.description}
              </p>
              <p>
                <span className="text-gray-400">📅 Date:</span>{" "}
                {new Date(report.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="text-gray-400">👤 Reported by:</span>{" "}
                {report.reportedBy.name} ({report.reportedBy.email})
              </p>
              <p>
                <span className="text-gray-400">📌 Status:</span>{" "}
                <span
                  className={`font-bold ${
                    report.status === "approved"
                      ? "text-green-400"
                      : report.status === "rejected"
                      ? "text-yellow-300"
                      : "text-orange-400"
                  }`}
                >
                  {report.status}
                </span>
              </p>

              {/* Reward Points */}
              {editingRewardId === report._id ? (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    min={0}
                    value={newRewardPoints}
                    onChange={(e) => setNewRewardPoints(Number(e.target.value))}
                    className="bg-white/10 text-white px-3 py-1 rounded w-24 border border-white/20 focus:outline-none"
                  />
                  <button
                    onClick={() => saveRewardPoints(report._id)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setEditingRewardId(null)}
                    className="text-gray-400 text-sm hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p>
                  <span className="text-gray-400">🎖️ Reward Points:</span>{" "}
                  {report.rewardPoints || 0}{" "}
                  <button
                    onClick={() => {
                      setEditingRewardId(report._id);
                      setNewRewardPoints(report.rewardPoints || 0);
                    }}
                    className="ml-2 text-blue-400 hover:underline text-xs"
                  >
                    Edit
                  </button>
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              {report.status === "pending" && (
                <>
                  <button
                    onClick={() => updateStatus(report._id, "approved")}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white text-sm"
                    disabled={loading}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(report._id, "rejected")}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white text-sm"
                    disabled={loading}
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => deleteReport(report._id)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white text-sm"
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
