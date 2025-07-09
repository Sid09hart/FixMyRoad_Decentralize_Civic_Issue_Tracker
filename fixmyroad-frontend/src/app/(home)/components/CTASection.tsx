"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-[#121212] text-white text-center border-t border-[#2f2f2f]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight text-[#00f7f0]">
          Help Make Your Roads Safer
        </h2>
        <p className="text-lg text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          FixMyRoad empowers you to take action. Report potholes, validate reports, and help your city fix them faster. Together, we make roads safer.
        </p>

        <Button
          onClick={() => window.location.href = "/report"}
          className="bg-[#00f7f0] hover:bg-[#00e0da] text-black font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300 flex items-center gap-2 mx-auto"
        >
          Start Reporting Now
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
