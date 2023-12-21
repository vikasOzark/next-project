import { VscAdd } from "react-icons/vsc";
import { LoadingButton, SubmitButton } from "../../../../../components/Buttons";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import formValidator from "@/utils/formValidator";
import toast from "react-hot-toast";
import { getDepartmentData } from "./utils";
import { TagsOptions } from "./TagsDropDownOptions";

export default function CreateTicketForm({ modalClose }) {
  const formElement = useRef();

  const [formError, setFormError] = useState({});
  const queryClient = useQueryClient();

  const responseData = useQuery("departments", getDepartmentData);
  const [selectedTag, setSelectedTag] = useState([]);

  const mutation = useMutation({
    mutationFn: (event) => {
      event.preventDefault();
      const ticketData = {
        taskTitle: event.target.taskTitle.value,
        ticketDetil: event.target.ticketDetil.value,
        department: event.target.department.value,
        tags: selectedTag,
      };

      const isError = formValidator(ticketData);
      if (isError) {
        setFormError(isError);
        throw new Error();
      }

      return axios.post(`/api/tickets`, ticketData);
    },

    onSettled: async (data) => {
      const response = await data;
      if (response) {
        if (response.data?.success) {
          toast.success("Ticket is created.");
          setTimeout(() => {
            modalClose(false);
          }, 1000);
        } else {
          toast.error(response.data?.message);
        }
      }

      setSelectedTag([]);
      formElement.current.reset();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets-list"] });
    },
  });

  return (
    <form ref={formElement} onSubmit={mutation.mutate}>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="taskTitle"
            className="block text-sm text-black dark:text-white font-medium leading-6 "
          >
            Ticket title
          </label>
          <div className="mt-2">
            <input
              id="taskTitle"
              name="taskTitle"
              type="text"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {mutation.isError && formError?.taskTitle && (
              <small className="text-red-500 font-bold">
                {formError?.taskTitle}
              </small>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-sm text-black   font-medium leading-6 "
          >
            Department
          </label>
          <div className="mt-2">
            <select
              className="py-2 bg-white border rounded-lg px-2 w-full"
              id="department"
              name="department"
            >
              <option value="">select department</option>
              {responseData.isSuccess && responseData.data?.success
                ? responseData.data.data?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))
                : null}
            </select>
            {mutation.isError && formError?.department && (
              <small className="text-red-500 font-bold">
                {formError?.department}
              </small>
            )}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="department"
          className="block text-sm mt-2 text-black   font-medium leading-6 "
        >
          Assign tags
        </label>

        <div className="mt-2 relative flex items-center gap-2">
          <TagsOptions
            setSelectedTag={setSelectedTag}
            selectedTag={selectedTag}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="ticketDetil"
          className="block mt-2 text-sm w-full text-black   font-medium leading-6 "
        >
          Ticket Detail
        </label>
        <div className="mt-2">
          <textarea
            id="ticketDetil"
            name="ticketDetil"
            className="py-2 bg-white border w-full rounded-lg px-2"
          />
          {mutation.isError && formError?.ticketDetil && (
            <small className="text-red-500 font-bold">
              {formError?.ticketDetil}
            </small>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        {mutation.isLoading ? (
          <LoadingButton title={"Creating..."} />
        ) : (
          <SubmitButton
            cssClass={
              " border-0 mr-0 hover:bg-gray-300 text-black hover:text-gray-900 font-bold border hover:border-gray-300"
            }
            icon={<VscAdd size={18} />}
            title={"Create ticket"}
          />
        )}
      </div>
    </form>
  );
}
