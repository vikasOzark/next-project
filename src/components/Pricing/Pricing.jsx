export default function PricingSection() {
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
              <div className="mt-8 space-y-8 md:-mx-4 md:flex md:items-center md:justify-center md:space-y-0 xl:mt-0">
                <div className="max-w-sm mx-auto border rounded-lg md:mx-4 dark:border-gray-700 bg-[#EEEDEB]">
                  <div className="p-6">
                    <h1 className="text-xl font-extrabold text-gray-700 capitalize lg:text-2xl ">
                      Starter
                    </h1>

                    <p className="mt-4 text-gray-500 dark:text-gray-300">
                      Start today and experience the ease of raising tickets and
                      solving in no time.
                    </p>

                    <h2 className="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl dark:text-gray-300">
                      2499 <span className="text-base font-medium">/Month</span>
                    </h2>

                    <p className="mt-1 text-gray-500 dark:text-gray-300">
                      Monthly
                    </p>

                    <button className="w-full px-4 py-2 mt-6 tracking-wide hover:text-white capitalize transition-colors duration-300 transform border border-blue-600 text-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                      Start Now
                    </button>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700" />

                  <div className="p-6">
                    <h1 className="text-lg font-medium text-gray-700 capitalize lg:text-xl ">
                      What’s included:
                    </h1>

                    <div className="mt-8 space-y-4">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                          10 users
                        </span>
                      </div>

                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                          30 tickets/day
                        </span>
                      </div>

                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                          Chat support
                        </span>
                      </div>

                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                          Optimize hashtags
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-sm mx-auto border rounded-lg md:mx-4 dark:border-gray-700 bg-[#EEEDEB]">
                  <div className="p-6">
                    <h1 className="text-xl font-extrabold text-gray-700 capitalize lg:text-2xl">
                      Premium
                    </h1>

                    <p className="mt-4 text-gray-500 dark:text-gray-300">
                      Start today and experience the ease of raising tickets and
                      solving in no time.
                    </p>

                    <h2 className="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl dark:text-gray-300">
                      $50.00{" "}
                      <span className="text-base font-medium">/life time</span>
                    </h2>

                    <p className="mt-1 text-gray-500 dark:text-gray-300">
                      One time payment
                    </p>

                    <button className="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                      Start today
                    </button>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700" />

                  <div className="p-6">
                    <h1 className="text-lg font-medium text-gray-700 capitalize lg:text-xl ">
                      What’s included:
                    </h1>

                    <div className="mt-8 space-y-4">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                          Unlimited users
                        </span>
                      </div>

                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                          Unlimited tickets
                        </span>
                      </div>

                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                          Chat support 24/7*
                        </span>
                      </div>

                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                          Optimize hashtags
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
