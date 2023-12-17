import { SelectComponent } from "@/components/DropdownButton";
import toast, { LoaderIcon } from "react-hot-toast";
import { createUserMutation } from "./userUtils";
import { useMutation, useQuery } from "react-query";
import { getDepartmentData } from "@/app/dashboard/tickets/component/forms/utils";
import { useState } from "react";
import { Role } from "@prisma/client";

export default function UserCreateUser({ refreshFunction }) {
  const [formError, setFormError] = useState({});
  const [departmentMemberId, setSelectedDepartment] = useState(null);
  const [role, setSelectedRole] = useState(null);

  const departmentRes = useQuery("department-data", getDepartmentData);
  const mutation = useMutation({
    mutationFn: async (event) =>
      createUserMutation(event, { role, departmentMemberId }, setFormError),

    onSettled: async (data) => {
      const response = await data;
      if (response) {
        if (response.data?.success) {
          toast.success(response.data?.message);
          refreshFunction();
          setTimeout(() => {
            modalClose(false);
          }, 1000);
        } else {
          toast.error(response.data?.message);
        }
      }
      formElement.current.reset();
    },
  });

  return (
    <>
      {" "}
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={mutation.mutate} className="space-y-4 !text-left">
          <div className=" grid grid-cols md:grid-cols-2 lg:grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm text-gray-800 dark:text-gray-800 font-medium leading-6 "
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
              {/* {errorResponseData && (
                <small className="text-red-500 capitalize font-bold">
                  {errorResponseData.first_name}
                </small>
              )} */}
            </div>

            <div>
              <label
                htmlFor="lasr_name"
                className="block text-sm text-gray-800 dark:text-gray-800 font-medium leading-6 "
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

              {/* {errorResponseData && (
                <small className="text-red-500 capitalize font-bold">
                  {errorResponseData.last_name}
                </small>
              )} */}
            </div>
          </div>

          <div className=" grid grid-cols md:grid-cols-2 lg:grid-cols-2 gap-2">
            <div className="">
              <label className="block text-sm text-gray-800 dark:text-gray-800 font-medium leading-6 ">
                Select department
              </label>
              <div className="mt-2">
                <SelectComponent
                  setterFunction={setSelectedDepartment}
                  subTitle={"Department"}
                  data={
                    departmentRes.data?.success ? departmentRes.data.data : []
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact_number"
                className="block text-sm text-gray-800 dark:text-gray-800 font-medium leading-6 "
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
              {/* {errorResponseData && (
              <small className="text-red-500 capitalize font-bold">
                {errorResponseData.contact_number}
              </small>
            )} */}
            </div>
          </div>

          <div className="w-full">
            <label className=" text-sm flex items-center gap-2 text-gray-800 dark:text-gray-800 font-medium leading-6 ">
              Select role
              {/* <ToolTip icon={<VscQuestion size={23} className="text-gray-800 dark:text-gray-800" /> } text={"data display"} /> */}
            </label>
            <SelectComponent
              setterFunction={setSelectedRole}
              subTitle={"User Role"}
              data={[
                // { name: Role.Admin, id: Role.Admin },
                { name: Role.User, id: Role.User },
              ]}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-800 dark:text-gray-800 font-medium leading-6 "
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
            {/* {errorResponseData && (
              <small className="text-red-500 capitalize font-bold">
                {errorResponseData.email}
              </small>
            )} */}
          </div>

          <div className=" grid grid-cols md:grid-cols-2 lg:grid-cols-2 gap-2">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className=" text-sm flex items-center gap-2 text-gray-800 dark:text-gray-800 font-medium leading-6 "
                >
                  Password
                  {/* <ToolTip icon={<VscQuestion size={23} className="text-gray-800 dark:text-gray-800" /> } text={"data display"} /> */}
                </label>
              </div>
              <div className="mt-2">
                <input
                  //   ref={passwd}
                  id="password"
                  name="password"
                  //   onChange={checkPassword}
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="mt-1">
                  {/* {validationLevel ? (
                    <PasswordValidatorConponent
                      validateLevel={validationLevel}
                    />
                  ) : null} */}
                </div>
              </div>
              {/* {errorResponseData && (
                <small className="text-red-500 capitalize font-bold">
                  {errorResponseData.password}
                </small>
              )} */}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-800 dark:text-gray-800 font-medium leading-6 "
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  //   ref={conformPasswd}
                  //   onChange={checkPassword}
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {/* {errorResponseData && (
                <small className="text-red-500 capitalize font-bold">
                  {errorResponseData.confirm_password}
                </small>
              )} */}
            </div>
          </div>

          <div className="flex justify-end">
            {false ? (
              <div className="flex w-full justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 dark:text-gray-800 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <LoaderIcon className="w-[1rem] h-[1rem]" /> Singing up...
              </div>
            ) : (
              <button
                type="submit"
                className=" justify-center rounded-md bg-indigo-600 px-5 text-white py-1 text-sm font-semibold leading-6  dark:text-gray-800 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create user
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
