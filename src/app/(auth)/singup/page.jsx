"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

export default function SingUp() {
    const [loading, setLoading] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const [errorResponseData, setErrorResponseData] = useState({})
    const [userData, setUserData] = useState({
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      password: "",
      confirm_password: ""
    })

    const singupHandler = async (e) => {
      e.preventDefault()
      setErrorResponseData({})
      setSuccess(false)
      fetch('http://127.0.0.1:8000/v1/api/auth/singup/', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then(response => {
          setErrorResponseData(response); 
          setSuccess(true);
          if (!response.success) {
              toast.error(response.message)
              return
          }

          if (response.success) {
            toast.success(response.message)
          }
      })
    }

    return (
      <>
        <div className="flex min-h-full flex-1 h-full  flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
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
              <div className="flex justify-between items-center">
                <div>
                  <label htmlFor="first_name" className="block text-sm text-white font-medium leading-6 ">
                      First Name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setUserData({...userData, ["first_name"] : e.target.value})}
                      id="first_name"
                      name="first_name"
                      type="text"
                      autoComplete="text"
                      className="input_css"
                    />
                  </div>
                    {isSuccess&& errorResponseData&& <small className='text-red-500 font-bold'>{errorResponseData.data?.first_name}</small>}
                </div>

                <div>
                  <label htmlFor="lasr_name" className="block text-sm text-white font-medium leading-6 ">
                      Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setUserData({...userData, ["last_name"] : e.target.value})}
                      id="lasr_name"
                      name="last_name"
                      type="text"
                      autoComplete="text"
                      
                      className="input_css"
                    />
                  </div>
                    {isSuccess&& errorResponseData&& <small className='text-red-500 font-bold'>{errorResponseData.data?.last_name}</small>}
                </div>

              </div>

              <div>
                  <label htmlFor="username" className="block text-sm text-white font-medium leading-6 ">
                      Username
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setUserData({...userData, ["username"] : e.target.value})}
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="text"
                      
                      className="input_css"
                    />
                  </div>
                    {isSuccess&& errorResponseData&& <small className='text-red-500 font-bold'>{errorResponseData.data?.username}</small>}
                </div>


              <div>
                <label htmlFor="email" className="block text-sm text-white font-medium leading-6 ">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setUserData({...userData, ["email"] : e.target.value})}
                    id="email"
                    name="email"
                    type="text  "
                    autoComplete="email"
                    
                    className="input_css"
                  />
                </div>
                  {isSuccess&& errorResponseData&& <small className='text-red-500 font-bold'>{errorResponseData.data?.email}</small>}
              </div>
  
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm text-white font-medium leading-6 ">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setUserData({...userData, ["password"] : e.target.value})}
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
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm text-white font-medium leading-6 ">
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setUserData({...userData, ["confirm_password"] : e.target.value})}
                      id="confirm_password"
                      name="confirm_password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                    {isSuccess&& errorResponseData&& <small className='text-red-500 font-bold'>{errorResponseData.data?.confirm_password}</small>}
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
                <Link href={"/login"} className='text-white font-bold mt-2 flex items-center gap-2' >Already have account, Login here <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
  