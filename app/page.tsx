import { Hero } from "@/sections/Hero";
import { WearablesBanner } from "@/sections/WearablesBanner";
import { SleepAdviceSection } from "@/sections/SleepAdviceSection";
import { RealPeopleSection } from "@/sections/RealPeopleSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WearablesBanner />
      <SleepAdviceSection />
      <RealPeopleSection />
    </>
  );
}
