import { useRef, useState } from "react";
import { VscAdd, VscChevronUp, VscChromeClose, VscTag } from "react-icons/vsc";
import { LoadingButton, SubmitButton } from "../Buttons";

export const CreateTagForm = (setTagsIsOption) => {
  const [tagColor, setTagColor] = useState(null);
  const formElement = useRef();

  const handleColor = (color) => {
    setTagColor(color);
  };

  const mutation = useMutation({
    mutationFn: (event) => {
      event.preventDefault();
      const ticketData = {
        title: event.target.title.value,
        color: tagColor,
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
          toast.success(response.data?.message);
          setTagColor(null);
          setTimeout(() => {
            setTagsIsOption(false);
          }, 1000);
        } else {
          setTagColor(null);
          toast.error(response.data?.message);
        }
      }
    },
  });

  return (
    <>
      <form ref={formElement}>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="title"
              className="block text-sm text-black dark:text-white font-medium leading-6 "
            >
              Tag title
            </label>
            <div className="mt-2">
              <input
                ref={tagTitleRef}
                id="title"
                name="title"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <p>{tagTitleRef.current?.value}</p>
              {/* {mutation.isError && formError?.title && (
                <small className="text-red-500 font-bold">
                  {formError?.title}
                </small>
              )} */}
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="ticketDetil"
            className="block mt-2 text-sm w-full text-black dark:text-black font-medium leading-6 "
          >
            Tag Color
          </label>
          <div className="mt-2 grid grid-cols-3 gap-1 md:grid-cols-4 lg:grid-cols-5">
            <div
              onClick={() => handleColor("bg-red-400")}
              className={`bg-red-400 h-5 rounded ${
                tagColor === "bg-red-400" ? " border-2 border-black" : ""
              }`}
            ></div>
            <div
              onClick={() => handleColor("bg-blue-400")}
              className={`bg-blue-400 h-5 rounded cursor-pointer hover:bg-blue-500 ${
                tagColor === "bg-blue-400" ? " border-2 border-black" : ""
              }`}
            ></div>
            <div
              onClick={() => handleColor("bg-purple-400")}
              className={`bg-purple-400 h-5 rounded cursor-pointer hover:bg-purple-500 ${
                tagColor === "bg-purple-400" ? " border-2 border-black" : ""
              }`}
            ></div>
            <div
              onClick={() => handleColor("bg-yellow-400")}
              className={`bg-yellow-400 h-5 rounded cursor-pointer hover:bg-yellow-500 ${
                tagColor === "bg-yellow-400" ? " border-2 border-black" : ""
              }`}
            ></div>
            <div
              onClick={() => handleColor("bg-slate-400")}
              className={`bg-slate-400 h-5 rounded cursor-pointer hover:bg-slate-500 ${
                tagColor === "bg-slate-400" ? " border-2 border-black" : ""
              }`}
            ></div>
            {/* {mutation.isError && formError?.ticketDetil && (
              <small className="text-red-500 font-bold">
                {formError?.ticketDetil}
              </small>
            )} */}
          </div>
        </div>

        <div className="flex justify-end mt-2">
          {false ? (
            <LoadingButton title={"Creating..."} />
          ) : (
            <SubmitButton
              cssClass={
                " border-0 mr-0 hover:bg-gray-300 text-black hover:text-gray-900 font-bold border hover:border-gray-300"
              }
              icon={<VscAdd size={18} />}
              title={"Create Tag"}
            />
          )}
        </div>
      </form>
    </>
  );
};
