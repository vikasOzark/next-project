"use client";

import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/Pricing/Pricing";

export default function Home() {


  return (
    <>
      <section>
        {/* <TracingBeam> */}
        <HeroSection />
        {/* </TracingBeam> */}
      </section>
      <PricingSection />
    </>
  );
}
