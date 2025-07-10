import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    location: "New York, USA",
    feedback:
      "FixMyRoad helped me report a pothole near my office, and within days, it was fixed! It's such an easy process.",
    rating: 5,
    image: "/images/john.jpg",
  },
  {
    name: "Jane Smith",
    location: "London, UK",
    feedback:
      "I love how I can validate reports, making sure we’re all contributing to safer roads. It's a fantastic initiative!",
    rating: 4,
    image: "/images/jane.jpg",
  },
  {
    name: "Mark Johnson",
    location: "Sydney, Australia",
    feedback:
      "FixMyRoad makes it so easy to report road issues. The validation system is genius, and I can track the progress in real-time.",
    rating: 5,
    image: "/images/mark.jpg",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#1f1f1f] text-white border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight">
          What Our Users Say
        </h2>
        <p className="text-lg text-zinc-400 mb-16 max-w-2xl mx-auto">
          Real feedback from citizens who have made their roads safer with FixMyRoad.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-[#2a2a2a] border border-[#333333] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6 space-y-4">
                {/* Avatar and User Info */}
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 ring-2 ring-teal-400">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 text-left">
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-zinc-400">{testimonial.location}</p>
                  </div>
                </div>

                {/* Feedback */}
                <p className="text-sm text-zinc-300 leading-relaxed">
                  "{testimonial.feedback}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 w-5 h-5" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
