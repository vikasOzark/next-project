import { VscAdd, VscCheck, VscChevronUp, VscChromeClose, VscTag } from "react-icons/vsc";
import { LoadingButton, SubmitButton } from "../Buttons";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import formValidator from "@/utils/formValidator";
import toast from "react-hot-toast";

export default function CreateTicketForm({refreshFunction, modalClose}) {
  const formElement = useRef();
  const [tagsIsOption, setTagsIsOption] = useState(false);
  const [formError, setFormError] = useState({})
  const [tags, setTags] = useState([]);
  
  const responseTagsData = useQuery("tags-list", async () => {
    const response = await fetch("/api/tags");
    const json_response = await response.json();

    if (json_response?.success) {
      const formatted = json_response.data?.map(item => ({
         name : item.title, id: item.id, color: item.color, isSelected: false
       }))
       setTags(formatted);
    }

    return json_response;
  });


  const responseData = useQuery("departments", async () => {
    const response = await fetch("/api/departments");
    const json_response = await response.json();
    return json_response;
  });

  const [selectedTag, setSelectedTag] = useState([]);

  const handleSelect = (tag) => {
    const isMatched = selectedTag.find((item) => item.id === tag.id);
    if (!isMatched) {
      setSelectedTag([...selectedTag, tag]);
    }

    tags.find((item, index) => {
      if (item.id === tag.id) {
        const newUpdated = [...tags];
        if (!newUpdated[index].isSelected) {
          newUpdated[index].isSelected = true;
        }
        setTags(newUpdated);
      }
    });
  };

  const handleRemove = (tag) => {
    selectedTag.find((item, index) => {
      if (item.id === tag.id) {
        const newA = [...selectedTag];
        newA.splice(index, 1);
        setSelectedTag(newA);
      }

      tags.find((item, index) => {
        if (item.id === tag.id) {
          const newUpdated = [...tags];
          newUpdated[index].isSelected = false;
          setTags(newUpdated);
        }
      });
    });
  };

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
        setFormError(isError)
        throw new Error()
      }
      
      return axios.post(`/api/tickets`, ticketData);
    },

    onSettled: async (data) => {
      const response = await data
      if (response ) {
        if (response.data?.success) {
          toast.success("Ticket is created.")
          refreshFunction()
          setTimeout(() => {
            modalClose(false)
          }, 1000);
        } else {
          toast.error(response.data?.message)
        } 
      }
      
      setSelectedTag([]);
      const resetTags = tags.map((item) => {
        return { ...item, ["isSelected"]: false };
      });
      setTags(resetTags);
      formElement.current.reset();
    },
  });


  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setTagsIsOption(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <form ref={formElement} onSubmit={mutation.mutate}>
      <div
        ref={dropdownRef}
        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3"
      >
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
            {mutation.isError && formError?.taskTitle && <small className="text-red-500 font-bold">{formError?.taskTitle}</small> }
          </div>
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-sm text-black dark:text-black font-medium leading-6 "
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
            {mutation.isError && formError?.department && <small className="text-red-500 font-bold">{formError?.department}</small> }
          </div>
        </div>

      </div>

      <div>
        <label
          htmlFor="department"
          className="block text-sm mt-2 text-black dark:text-black font-medium leading-6 "
        >
          Add Tags
        </label>

        <div className="mt-2 relative flex items-center gap-2">
          <div className="">
            <button
              type="button"
              onClick={() => setTagsIsOption((pre) => !pre)}
              className="px-4 py-1 border hover:border-gray-300 flex gap-2 items-center rounded-lg hover:bg-gray-300"
            >
              <VscTag />
              Add tag{" "}
              {tagsIsOption ? (
                <VscChevronUp className=" rotate-180 transition-transform " />
              ) : (
                <VscChevronUp className="transition-transform" />
              )}
            </button>
          </div>

          <div className="mt-2 flex  items-center gap-1 overflow-x-auto overflow-hidden">
            {selectedTag.map((item) => (
              <span
                key={item.id}
                className={`px-3 rounded-full font-bold py-1 flex text-white gap-2 items-center break-keep ${item.color}`}
              >
                {item.name}{" "}
                <VscChromeClose
                  onClick={() => handleRemove(item)}
                  className=" hover:bg-gray-100 rounded-full h-5 p-[3px] cursor-pointer w-5"
                />{" "}
              </span>
            ))}
          </div>

          <div
            className={`absolute rounded-lg top-8 drop-shadow-xl border bg-white mt-2  p-1 w-[12rem] z-[100] overflow-hidden overflow-y-auto h-[8rem] ${
              tagsIsOption ? "block" : "hidden"
            }`}
          >
            {tags?.sort().map((item) => (
              <p
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`p-1 hover:bg-slate-300 font-bold rounded-full px-3 mb-1 flex items-center text-white justify-between ${item.color }`}
              >
                {item.name}
                {item.isSelected && <VscCheck />}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="ticketDetil"
          className="block mt-2 text-sm w-full text-black dark:text-black font-medium leading-6 "
        >
          Ticket Detail
        </label>
        <div className="mt-2">
          <textarea
            id="ticketDetil"
            name="ticketDetil"
            className="py-2 bg-white border w-full rounded-lg px-2"
          />
          {mutation.isError && formError?.ticketDetil && <small className="text-red-500 font-bold">{formError?.ticketDetil}</small> }
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
