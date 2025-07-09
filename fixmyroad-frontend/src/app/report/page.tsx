"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import dynamic from "next/dynamic";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import the map with SSR disabled
const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

export default function ReportPage() {
  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!getToken()) router.push("/login");

    if (typeof window !== "undefined") {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        () => {
          toast.error("Could not fetch location.");
        }
      );
    }
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPhoto(file ?? null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo || !description || !location) {
      toast.warning("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("description", description);
    formData.append("lat", location.lat.toString());
    formData.append("lng", location.lng.toString());

    try {
      setLoading(true);
      await api.post("/api/potholes", formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      toast.success("Pothole reported successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Failed to report pothole.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1c1c1c] to-[#101010] py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-[#1b1b1b]/80 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl text-white">
          <CardHeader className="text-center pb-0">
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              🛣️ Report a Pothole
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Upload Photo */}
              <div className="space-y-2">
                <Label htmlFor="photo" className="text-gray-300">
                  Upload Photo
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  id="photo"
                  onChange={handlePhotoChange}
                  className="bg-[#222] text-white border border-neutral-700 file:text-white file:bg-blue-600 file:border-none"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl border border-neutral-700"
                  />
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the pothole's size, location, and severity..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="bg-[#222] text-white border border-neutral-700"
                />
              </div>

              {/* Map */}
              <div className="space-y-2">
                <Label className="text-gray-300">Location Preview</Label>
                <div className="border border-neutral-700 rounded-xl overflow-hidden">
                  {location ? (
                    <LeafletMap lat={location.lat} lng={location.lng} />
                  ) : (
                    <Skeleton className="h-48 w-full rounded-xl bg-[#333]" />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-5 text-base font-semibold bg-blue-600 hover:bg-blue-500 transition rounded-xl"
              >
                {loading ? "Submitting..." : "🚧 Submit Report"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
