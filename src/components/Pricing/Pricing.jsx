"use client";

import { PLAN } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import PricingBgGradient from "./PricingBgGradient";
import StarterPlanComponent from "./StarterPlan";
import PremiumPlan from "./PremiumPlan";
import { urlRoutes } from "@/utils/urlRoutes";

export default function PricingSection() {
  const search = useSearchParams();
  const query = new URLSearchParams(search);
  const router = useRouter();

  const handleSelectPlan = (plan) => {
    query.set("plan", plan);
    router.push(urlRoutes.LOGIN_IN + `?${query.toString()}`);
  };

  return (
    <section>
      <div className="h-screen grid place-content-center text-white mx-auto">
        <div className="container px-6 py-8 mx-auto">
          <div className="xl:items-center xl:-mx-8 xl:flex">
            <div className="flex flex-col items-center xl:items-start xl:mx-8">
              <h1 className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent text-3xl font-extrabold capitalize lg:text-3xl ">
                Our Pricing Plan
              </h1>

              <div className="mt-4 ">
                <span className="inline-block w-40 h-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full"></span>
                <span className="inline-block w-4 h-2 mx-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full"></span>
                <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full"></span>
              </div>

              <p className="mt-4 font-medium text-white dark:text-gray-300">
                You can get All Access by selecting your plan!
              </p>
            </div>

            <div className="flex-1 xl:mx-8 ">
              <div className="mt-8 space-y-8 md:-mx-4 gap-4 md:flex md:items-center md:justify-center md:space-y-0 xl:mt-0">
                <StarterPlanComponent handleSelectPlan={handleSelectPlan} />
                <PricingBgGradient isFocused={true}>
                  <PremiumPlan handleSelectPlan={handleSelectPlan} />
                </PricingBgGradient>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
