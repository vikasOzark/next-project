import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { twMerge } from "tailwind-merge";
import { LoadingButton, SubmitButton } from "../Buttons";
import { VscOrganization } from "react-icons/vsc";
import toast from "react-hot-toast";

export const CreateDepartmentForm = () => {
  const departmentMutation = useMutation(
    async (jsonBody) => {
      const response = await fetch("/api/departments", {
        method: "POST",
        headers: {},
        body: JSON.stringify(jsonBody),
      });
      return await response.json();
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      },
      onError: (error) => {
        toast.error(data?.message);
      },
    }
  );

  /**
   * This function is used to submit the create department form.
   * This function submits the request on the server and server will request
   * to the API server.
   * @param {Event} event browser event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const formValues = event.target;
    const payload = {
      department: formValues.department.value,
      description: formValues.description.value,
      password: formValues.password.value,
      user: 1,
    };
    departmentMutation.mutate(payload);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="">
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Deparment Name
            </label>
            <div className="mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="department"
                id="department"
                className={twMerge(
                  "block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                )}
                placeholder="Department name"
              />
              {departmentMutation.isSuccess &&
                !departmentMutation.data.success && (
                  <small className="text-red-500 font-bold">
                    {departmentMutation.data?.data.department}
                  </small>
                )}
            </div>
          </div>

          <div>
            <label
              htmlFor="desprition"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Short Description
            </label>
            <div className="mt-2 rounded-md shadow-sm">
              <textarea
                name="description"
                id="desprition"
                className={twMerge(
                  "block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                )}
                placeholder="ex. something..."
              />
            </div>
          </div>

          <div className="mt-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Admin password
            </label>
            <small>
              Please provide admin password to authorize the authenticity.
            </small>
            <div className="mt-2 rounded-md shadow-sm">
              <input
                type="password"
                name="password"
                id="password"
                className={twMerge(
                  "block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                )}
                placeholder="*******"
              />
              {departmentMutation.isSuccess &&
                !departmentMutation.data.success && (
                  <small className="text-red-500 font-bold">
                    {departmentMutation.data?.data.department}
                  </small>
                )}
            </div>
          </div>
        </div>

        <div className=" py-3 sm:flex sm:flex-row-reverse">
          {!departmentMutation.isLoading && (
            <SubmitButton
              title={"Create department"}
              cssClass={"text-black hover:bg-gray-300 transition-all"}
              icon={<VscOrganization />}
            />
          )}
          {departmentMutation.isLoading && (
            <LoadingButton title={"Proccessing..."} />
          )}
        </div>
      </form>
    </>
  );
};
