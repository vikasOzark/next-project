"use client";

import formValidator from "@/utils/formValidator";
import passwdValidator from "@/app/(auth)/singup/passwordValidator";
import { PasswordValidatorConponent } from "@/app/(auth)/singup/PasswordValidatorComponent";
import Link from "next/link";
import { useRef, useState } from "react";
import { LoaderIcon, toast } from "react-hot-toast";

export default function SingUp() {
  const [loading, setLoading] = useState(false);
  const [errorResponseData, setErrorResponseData] = useState({});
  const [validationLevel, setValidationLevel] = useState("");

  const passwd = useRef();
  const conformPasswd = useRef();

  const checkPassword = () => {
    const passwdValue = passwd.current.value;

    passwdValidator(passwdValue, setValidationLevel);
    if (passwdValue !== conformPasswd.current.value) {
      setErrorResponseData({ confirm_password: "Please match your password." });
    } else {
      setErrorResponseData({});
    }
  };

  const singupHandler = async (e) => {
    e.preventDefault();

    const payload = {
      email: e.target.email.value,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      contact_number: e.target.contact_number.value,
      password: e.target.password.value,
    };

    const isError = formValidator(payload);
    if (!isError) {
      setLoading(true);
      setErrorResponseData({});
      fetch("api/users/singup/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((response) => {
          if (!response.success) {
            toast.error(response.message);
            return;
          }

          if (response.success) {
            toast.success(response.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setErrorResponseData(isError);
    }
  };

  return (
    <>
      <div className="w-scree h-screen grid place-content-center">
        <div className="flex min-h-full flex-1  soft-bg rounded-xl w-fit flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full  sm:max-w-sm">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign up to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={singupHandler}>
              <div className="flex gap-x-2.5 justify-between items-center">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm text-white font-medium leading-6 "
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      autoComplete="text"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errorResponseData && (
                    <small className="text-red-500 capitalize font-bold">
                      {errorResponseData.first_name}
                    </small>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lasr_name"
                    className="block text-sm text-white font-medium leading-6 "
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lasr_name"
                      name="last_name"
                      type="text"
                      autoComplete="text"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errorResponseData && (
                    <small className="text-red-500 capitalize font-bold">
                      {errorResponseData.last_name}
                    </small>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact_number"
                  className="block text-sm text-white font-medium leading-6 "
                >
                  Contact Number
                </label>
                <div className="mt-2">
                  <input
                    id="contact_number"
                    name="contact_number"
                    type="text"
                    autoComplete="text"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errorResponseData && (
                  <small className="text-red-500 capitalize font-bold">
                    {errorResponseData.contact_number}
                  </small>
                )}
              </div>

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
                    type="text  "
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errorResponseData && (
                  <small className="text-red-500 capitalize font-bold">
                    {errorResponseData.email}
                  </small>
                )}
              </div>

              <div className="flex justify-between gap-2 items-center">
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className=" text-sm flex items-center gap-2 text-white font-medium leading-6 "
                    >
                      Password
                      {/* <ToolTip icon={<VscQuestion size={23} className="text-white" /> } text={"data display"} /> */}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      ref={passwd}
                      id="password"
                      name="password"
                      onChange={checkPassword}
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="mt-1">
                      {validationLevel ? (
                        <PasswordValidatorConponent
                          validateLevel={validationLevel}
                        />
                      ) : null}
                    </div>
                  </div>
                  {errorResponseData && (
                    <small className="text-red-500 capitalize font-bold">
                      {errorResponseData.password}
                    </small>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm text-white font-medium leading-6 "
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      ref={conformPasswd}
                      onChange={checkPassword}
                      id="confirm_password"
                      name="confirm_password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errorResponseData && (
                    <small className="text-red-500 capitalize font-bold">
                      {errorResponseData.confirm_password}
                    </small>
                  )}
                </div>
              </div>

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
                    Sign in
                  </button>
                )}
                <Link
                  href={"/login"}
                  className="text-white font-bold mt-2 flex items-center gap-2"
                >
                  Already have account, Login here{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
