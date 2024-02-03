"use client";

import HeroSection from "@/components/HeroSection";
import dynamic from "next/dynamic";
import PricingSection from "@/components/Pricing/Pricing";
import { Suspense } from "react";
import { useGetUserVerify } from "./api";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const EditorComp = dynamic(() => import("@/components/Editor"), { ssr: false });
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
