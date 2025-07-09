"use client";

import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle, MapPin, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const {isAuthenticated} =useAuth();
  const router = useRouter();
  
const handleStartReporting=()=>{
  if(isAuthenticated){
    router.push("/report");
  }else{
    router.push("/login");
  }
}



  return (
    <main className="bg-[#121212] text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-24 text-center">
        
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          <span> 🚧  </span>
          <span className="text-transparent bg-gradient-to-r from-[#00FFD1] to-[#00B4FF] bg-clip-text">
            FixMyRoad
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-xl">
          Report potholes. Validate reports. Help the city fix roads faster and smarter.
        </p>
        <div className="mt-8">
          <Badge className="text-sm px-6 py-3 bg-[#00FFD1] text-black hover:bg-[#00e2bb] transition font-semibold cursor-pointer shadow-md rounded-full"
          onClick={handleStartReporting}>
            
            Start Reporting Now
          </Badge>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#1a1a1a] py-20 px-6 md:px-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
          How It Works
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          We empower citizens to report potholes, validate each other’s reports, and notify city authorities automatically.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="bg-[#222] border border-gray-700 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <MapPin className="text-[#00B4FF] w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">📍 Report</h3>
            <p className="mt-2 text-sm text-gray-400">
              Snap a photo, describe the pothole, and pin the location on the map.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#222] border border-gray-700 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <CheckCircle className="text-[#00FF95] w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">✅ Validate</h3>
            <p className="mt-2 text-sm text-gray-400">
              Users verify reports. Once 3 people confirm, it’s sent to the authority.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#222] border border-gray-700 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <Send className="text-[#D8A3FF] w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">📩 Notify</h3>
            <p className="mt-2 text-sm text-gray-400">
              We automatically email officials with location, photo, and details.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
