"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { AiOutlineLogin } from "react-icons/ai";

export default function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const data = useSession();
  // const { data: session } = data;
  //
  //

  return (
    <div className="">
      <div className="relative h-screen grid place-content-center mx-auto  isolate px-6 lg:px-8">
        <div className="mx-auto min-w-min py-32 sm:py-35 md:py-56 lg:p-64 ">
          <div
            className="absolute inset-x-0 -z-10 top-0 transform-gpu overflow-hidden blur-3xl "
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-200 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Read our blogs.{" "}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div> */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-6xl">
              Streamline Your Support Experience with Our Ticket Tracker
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              – Effortlessly Manage, Monitor, and Resolve your Inquiries, All in
              One Place!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div
                onClick={() => signIn()}
                className="rounded-md flex items-center cursor-pointer gap-2 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in here
                <AiOutlineLogin size={20} />
              </div>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-200"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
