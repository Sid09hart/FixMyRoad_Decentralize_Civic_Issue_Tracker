import { CTASection } from "./(home)/components/CTASection";
import { FeaturesSection } from "./(home)/components/FeatureSection";
import HeroSection from "./(home)/components/HeroSection";
import { HowItWorksSection } from "./(home)/components/HowItWorksSection";
import { TestimonialsSection } from "./(home)/components/TestimonialsSection";
export default function Home() {
  return (
    <main className="bg-gray-100 dark:bg-black">
      <HeroSection />
      {/* <HowItWorksSection /> */}
      {/* More sections coming soon like Testimonials, CTA, etc. */}
      <FeaturesSection/>
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
