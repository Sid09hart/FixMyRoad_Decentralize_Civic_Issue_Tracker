import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Report Potholes Instantly",
    description:
      "Snap a photo, describe the pothole, and submit the report directly from your mobile device.",
  },
  {
    title: "Validate Reports",
    description:
      "Help validate other users’ reports to ensure accuracy before they are sent to authorities.",
  },
  {
    title: "Track Fixes in Real-Time",
    description:
      "Get real-time updates on the status of pothole reports and know when they are fixed.",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-24 bg-[#1a1a1a] text-white border-t border-[#2f2f2f]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
          Features You’ll Love
        </h2>
        <p className="text-zinc-400 mb-16 max-w-2xl text-lg">
          FixMyRoad makes it effortless to take civic action and stay informed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-2xl shadow-sm hover:shadow-md transition hover:scale-[1.02] duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-[#1f1f1f]">
                    <CheckCircle className="text-teal-400 w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
