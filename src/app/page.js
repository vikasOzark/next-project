"use client";

import HeroSection from "@/components/HeroSection";
import dynamic from "next/dynamic";
import PricingSection from "@/components/Pricing/Pricing";
import { Suspense } from "react";

const EditorComp = dynamic(() => import("@/components/Editor"), { ssr: false });

const markdown = `
Hello **world**!
`;

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
