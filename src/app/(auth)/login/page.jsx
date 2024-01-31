"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { loginHandler } from "./loginUtils";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorResponseData, setErrorResponseData] = useState({});
  const router = useRouter();
  const params = useSearchParams();

  const config = {
    setLoading,
    setErrorResponseData,
    router,
    params,
  };

  return (
    <>
      <div className="grid mt-auto place-content-center items-center h-[100vh]">
        <div className=" w-fit drop-shadow-lg soft-bg overflow-hidden rounded-xl p-4 px-6 bg-opacity-50 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="mx-auto"
            /> */}
            <h2 className="lg:mt-5 md:mt-5 mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>

          <form action="" onSubmit={(event) => loginHandler(event, config)}>
            <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-white font-medium leading-6 "
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errorResponseData?.email && (
                    <small className="text-red-500 font-bold">
                      {errorResponseData?.email}
                    </small>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm text-white font-medium leading-6 "
                    >
                      Password
                    </label>
                    {/* <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div> */}
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errorResponseData?.password && (
                      <small className="text-red-500 font-bold">
                        {errorResponseData?.password}
                      </small>
                    )}
                  </div>
                </div>
                {errorResponseData && (
                  <small className="text-red-500 font-bold">
                    {errorResponseData?.error}
                  </small>
                )}
                <div>
                  {loading ? (
                    <div className="flex w-full justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      <LoaderIcon className="w-[1rem] h-[1rem]" /> Singing up...
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {loading ? "Loading..." : "Sign in"}
                    </button>
                  )}

                  <Link
                    href={"/singup"}
                    className="text-white font-bold mt-2 flex items-center gap-2"
                  >
                    {`Don't have a account,`}{" "}
                    <span className="text-blue-500 hover:underline">
                      Sing up here
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
