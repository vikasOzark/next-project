import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { twMerge } from "tailwind-merge";
import { LoadingButton, SubmitButton } from "../Buttons";
import { VscOrganization } from "react-icons/vsc";
import toast from "react-hot-toast";

export const CreateDepartmentForm = ({ router }) => {
  const departmentMutation = useMutation(async (jsonBody) => {
    const response = await fetch("/api/departments", {
      method: "POST",
      headers: {},
      body: JSON.stringify(jsonBody),
    });
    return await response.json();
  });

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
      user: 1,
    };
    departmentMutation.mutate(payload);
  };

  useEffect(() => {
    if (departmentMutation.isSuccess) {
      if (departmentMutation.data.success) {
        toast.success(departmentMutation.data?.message);
      } else {
        toast.error(departmentMutation.data?.message);
      }
    }
    router.refresh();
  }, [departmentMutation.isLoading]);

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
                className={twMerge("input_css")}
                placeholder="ex. Accounts"
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
                className={twMerge("input_css")}
                placeholder="ex. something..."
              />
            </div>
          </div>
        </div>

        <div className=" py-3 sm:flex sm:flex-row-reverse">
          {!departmentMutation.isLoading && (
            <SubmitButton
              title={"Create department"}
              cssClass={"text-white"}
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
