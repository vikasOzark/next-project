"use client";

import { TicketTableComponent } from "./component/components";
import { VscChromeClose, VscSearch, VscSymbolKeyword } from "react-icons/vsc";
import React, { useState } from "react";
import { DropdownMenuButton } from "./component/TicketTableGlobleAction";
import MergeTickets from "./component/MergeTickets";
import CreateTicketButton from "./component/forms/TicketCreateButton";
import { FilterByCreation } from "./component/FilterComponent";
export const SelectContext = React.createContext();

export default function Tickets({ searchParams }) {
  const query = new URLSearchParams(searchParams);

  const [selectedTickets, setSelectedTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query.toString());
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleQuery = (event) => {
    const query = event.target.value;

    // Clear previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        setSearchQuery(query);
      }, 500)
    );
  };

  return (
    <>
      <SelectContext.Provider
        value={{ selectedTickets, setSelectedTickets, searchQuery }}
      >
        <main>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <div className="">
                <div className="bg-gray-700 flex items-center px-3 rounded-full ">
                  <input
                    type="text"
                    onChange={handleQuery}
                    className="w-full p-2 px-3 text-white focus:outline-none bg-transparent rounded-full"
                    placeholder="Search"
                  />
                  <VscSearch size={25} color="white" />
                </div>
              </div>
              <SelectedDataInfo
                selectedTickets={selectedTickets}
                setSelectedTickets={setSelectedTickets}
              />
              <FilterByCreation />
            </div>
            <div className="flex items-center gap-2">
              <MergeTickets />
              <CreateTicketButton />
              <DropdownMenuButton
                title={"Actions"}
                icon={<VscSymbolKeyword />}
                styleButton="hover:bg-slate-600 bg-transparent"
              />
            </div>
          </div>
          <div className="mt-2 w-full">
            <TicketTableComponent />
          </div>
        </main>
      </SelectContext.Provider>
    </>
  );
}

const SelectedDataInfo = ({ selectedTickets, setSelectedTickets }) => {
  const handleUnSelectAll = () => {
    selectedTickets.map((ticket) => {
      document.getElementById(ticket.id).checked = false;
    });
    setSelectedTickets([]);
  };

  if (selectedTickets.length) {
    return (
      <span className="bg-white flex gap-2 items-center rounded-full px-4 py-1">
        <div className="flex gap-2">
          <span>Selected ticket</span>
          <span className="text-blue-900 font-bold">
            {selectedTickets.length}
          </span>
        </div>
        <VscChromeClose
          onClick={handleUnSelectAll}
          className="hover:bg-gray-300 rounded-full cursor-pointer"
        />
      </span>
    );
  }
  return null;
};

// const Filtering = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const sorting = searchParams.get("sort") || "desc";

//   const handleSort = (sorting) => {
//     router.push(`?sort=${sorting}`);
//     router.refresh();
//   };

//   return (
//     <>
//       <div className=" items-center flex text-white cursor-pointer hover:bg-gray-500 rounded-md">
//         {sorting === "desc" ? (
//           <AiOutlineSortAscending onClick={() => handleSort("asc")} size={28} />
//         ) : (
//           <AiOutlineSortDescending
//             onClick={() => handleSort("desc")}
//             size={28}
//           />
//         )}
//       </div>
//     </>
//   );
// };
