import { getTagsList } from "@/app/dashboard/tickets/component/forms/utils";
import { Popover } from "@headlessui/react";
import { useState } from "react";
import { VscAdd, VscCheck } from "react-icons/vsc";
import { useQuery } from "react-query";

export default function TagsPopover() {
  const [tags, setTags] = useState([]);
  useQuery("tags-list", () => getTagsList(setTags), {
    onSuccess: (response) => {
      if (response?.success) {
        const formatted = response.data?.map((item) => ({
          name: item.title,
          id: item.id,
          color: item.color,
          isSelected: false,
        }));
        setTags(formatted);
      }
    },
  });

  return (
    <Popover className="relative">
      <Popover.Button>
        <VscAdd size={18} />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 bg-gray-500">
        <div className="p-2 rounded-full  ">
          {tags?.sort().map((item) => (
            <div
              key={item.id}
              className={`text-center cursor-pointer hover:opacity-50 rounded-full px-3 mb-1 flex items-center text-white justify-between text-sm ${item.color}`}
            >
              {item.name}
              {<VscCheck />}
            </div>
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  );
}
