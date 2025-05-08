import dynamic from "next/dynamic";

// Lazy load components
const HeroSection = dynamic(() => import("@/features/landing/HeroSection"));
const FAQSection = dynamic(() => import("@/features/landing/FAQSection"));
const DownloadAppSection = dynamic(
  () => import("@/features/landing/DownloadAppSection")
);
const CTASection = dynamic(() => import("@/features/landing/CTASection"));
const CampusSection = dynamic(() => import("@/features/landing/CampusSection"));
// const TestimonialSection = dynamic(
//   () => import("@/features/landing/TestimonialSection")
// );

const JoinAsOwnerSection = dynamic(
  () => import("@/features/landing/JoinAsOwnerSection")
);
import AnimateSection from "@/components/AnimatedSection";
import FeaturesSection from "@/features/landing/FeaturesSection";
import KostRecomendedSection from "@/features/landing/KostRecomendedSection";
import CitySection from "@/features/landing/CitySection";

export default function Home() {
  return (
    <>
      <div className="bg-gray-50 ">
        {/* <Navbar /> */}

        <AnimateSection id="hero">
          <HeroSection />
        </AnimateSection>

        <AnimateSection id="recomended">
          <KostRecomendedSection />
        </AnimateSection>
        <AnimateSection id="city">
          <CitySection />
        </AnimateSection>

        <AnimateSection id="campus">
          <CampusSection />
        </AnimateSection>

        <AnimateSection id="features">
          <FeaturesSection />
        </AnimateSection>

        {/* <AnimateSection id="testimonial">
          <TestimonialSection />
        </AnimateSection> */}

        <AnimateSection id="join-as-owner">
          <JoinAsOwnerSection />
        </AnimateSection>

        <AnimateSection id="faq">
          <FAQSection />
        </AnimateSection>

        <AnimateSection id="download-app">
          <DownloadAppSection />
        </AnimateSection>

        <AnimateSection id="cta">
          <CTASection />
        </AnimateSection>
      </div>
    </>
  );
}
