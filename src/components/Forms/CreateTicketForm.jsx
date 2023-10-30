import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuButton,
  DropdownMenuCheckboxes,
  SelectComponent,
} from "../DropdownButton";
import { VscAdd, VscChevronUp, VscChromeClose, VscTag } from "react-icons/vsc";
import { SubmitButton } from "../Buttons";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";

export default function CreateTicketForm() {
  const [tagsIsOption, setTagsIsOption] = useState(false);
  const [tags, setTags] = useState([
    {
      name: "test",
      id: 1,
      isSelected: false,
    },
    {
      name: "hello",
      id: 5,
      isSelected: false,
    },
  ]);

  const [selectedTag, setSelectedTag] = useState([]);

  const handleSelect = (tag) => {
    const isMatched = selectedTag.find((item) => item.name === tag.name);
    if (!isMatched) {
      setSelectedTag([...selectedTag, tag]);
    }
    tags.find((item, index) => {
      if (item.name === tag.name) {
        const targetedItem = tags[index];
        targetedItem.isSelected = true;
        const newArray = [...tags];
        newArray.splice(index, 1);
        setTags([...newArray, targetedItem]);
      }
    });
  };

  const handleRemove = (tag) => {
    selectedTag.find((item, index) => {
      if (item.name === tag.name) {
        const newA = [...selectedTag];
        newA.splice(index);
        setSelectedTag(newA);
      }

      tags.find((item, index) => {
        if (item.name === tag.name) {
          console.log(tag);
          const targetedItem = tags[index];
          targetedItem.isSelected = false;
          const newArray = [...tags];
          newArray.splice(index, 1);
          setTags([...newArray, targetedItem]);
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
      };
      return axios.post(`/api/tickets`, ticketData);
    },
  });

  return (
    <form onSubmit={mutation.mutate}>
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
              className="py-2 bg-white border rounded-lg px-2"
              id="department"
              name="department"
            >
              <option value="">select department</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="department"
          className="block text-sm mt-2 text-black dark:text-black font-medium leading-6 "
        >
          Department
        </label>

        <div className="mt-2 relative ">
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
          <div
            className={`absolute rounded-lg drop-shadow-xl border bg-white mt-2  p-1 w-[12rem] z-[100] overflow-hidden overflow-y-auto h-[8rem] ${
              tagsIsOption ? "block" : "hidden"
            }`}
          >
            {tags.map((item) => (
              <p
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`p-1 hover:bg-slate-400 rounded ${
                  item.isSelected ? "bg-gray-200" : ""
                }`}
              >
                {item.name}
              </p>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-1 overflow-x-auto overflow-hidden">
            {selectedTag.map((item) => (
              <span
                key={item.id}
                className="bg-purple-300 px-3 rounded-full font-bold py-1 flex gap-2 items-center break-keep"
              >
                {item.name}{" "}
                <VscChromeClose
                  onClick={() => handleRemove(item)}
                  className=" hover:bg-gray-100 rounded-full h-5 p-[3px] cursor-pointer w-5"
                />{" "}
              </span>
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
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitButton
          cssClass={
            " border-0 hover:bg-gray-300 text-black hover:text-gray-900 font-bold border hover:border-gray-300"
          }
          icon={<VscAdd size={18} />}
          title={"Create ticket"}
        />
      </div>
    </form>
  );
}
