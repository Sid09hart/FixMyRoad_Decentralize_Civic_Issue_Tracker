import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle2,
  Mail,
} from "lucide-react";

const steps = [
  {
    title: "Report a Pothole",
    icon: <AlertTriangle className="h-8 w-8 text-orange-400" />,
    desc: "Capture a photo, drop a pin, and submit a report in seconds.",
  },
  {
    title: "Community Validates",
    icon: <CheckCircle2 className="h-8 w-8 text-teal-400" />,
    desc: "Other users confirm the report to ensure authenticity.",
  },
  {
    title: "Authority Notified",
    icon: <Mail className="h-8 w-8 text-cyan-400" />,
    desc: "Once validated, authorities are automatically alerted by email.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-[#2a2a2a] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white tracking-tight">
          How It Works
        </h2>
        <p className="text-lg text-zinc-400 mb-16 max-w-2xl">
          FixMyRoad empowers you to take civic action in just three simple steps.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="animate-fadeIn"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <Card className="bg-[#333333] border-none rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] duration-300">
                <CardContent className="p-6 flex flex-col items-start space-y-4">
                  <div className="bg-[#1e1e1e] p-3 rounded-full">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold font-sans">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-sm">{step.desc}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
