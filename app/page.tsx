import { Hero } from "@/sections/Hero";
import { WearablesBanner } from "@/sections/WearablesBanner";
import { SleepAdviceSection } from "@/sections/SleepAdviceSection";
import { RealPeopleSection } from "@/sections/RealPeopleSection";
import { ClosingTheLoopSection } from "@/sections/ClosingTheLoopSection";
import { HowItWorksSection } from "@/sections/HowItWorksSection";
import { HowTruneKnowsSection } from "@/sections/HowTruneKnowsSection";
import { BuiltToLearnSection } from "@/sections/BuiltToLearnSection";
import { CommunitySection } from "@/sections/CommunitySection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { FinalCTASection } from "@/sections/FinalCTASection";
import { SecuritySection } from "@/sections/SecuritySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WearablesBanner />
      <SleepAdviceSection />
      <RealPeopleSection />
      <ClosingTheLoopSection />
      <HowItWorksSection />
      <HowTruneKnowsSection />
      <BuiltToLearnSection />
      <CommunitySection />
      <TestimonialsSection />
      <FinalCTASection />
      <SecuritySection />
    </>
  );
}
