"use client"
import Link from 'next/link';
import { redirect } from 'next/navigation'
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const [errorResponseData, setResponseData] = useState({})
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setLoginData({...loginData, [name] : value})
    }

    const loginHandler = async () => {
        setResponseData({})
        setSuccess(false)
        try {
          await fetch('api/users/login', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify(loginData)
          })
          .then(response => response.json())
          .then(response => {
            console.log(response);
              setResponseData(response); 
              setSuccess(true);
              if (!response.success) {
                  toast.error(response.message)
                  return
              }
  
              if (response.success) {
                toast.success(response.message)
                setTimeout(() => {
                  redirect("/dashboard")
                }, 3000)
              }
          })
         
        } catch (error) {
          toast.error("Something went wrong. ")
          console.log(error);
        }
    }


    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html className="h-full bg-white">
          <body className="h-full">
          ```
        */}
        <div className="flex min-h-full flex-1 h-full  flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm text-white font-medium leading-6 ">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {isSuccess&& errorResponseData&& <small className='text-red-500 font-bold'>{errorResponseData.data?.email}</small>}
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm text-white font-medium leading-6 ">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {isSuccess&& errorResponseData&& <small className='text-red-500 font-bold'>{errorResponseData.data?.password}</small>}

              </div>
  
              <div>
                <button
                  onClick={() => loginHandler()}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading?"Loading...": "Sign in"}
                </button>
                <Link href={"/singup"} className='text-white font-bold mt-2 flex items-center gap-2' >Don't have a account, Singup here <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  