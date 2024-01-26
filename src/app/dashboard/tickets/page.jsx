"use client";

import { TicketTableComponent } from "./component/components";
import {
  VscChromeClose,
  VscClose,
  VscSearch,
  VscSymbolKeyword,
} from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import { DropdownMenuButton } from "./component/TicketTableGlobleAction";
import MergeTickets from "./component/MergeTickets";
import CreateTicketButton from "./component/forms/TicketCreateButton";
import { FilterByCreation } from "./component/FilterComponent";
import { useSearchParams, useRouter } from "next/navigation";
import TicketSearch from "./component/TicketSearch";

export const SelectContext = React.createContext();

export default function Tickets({ searchParams }) {
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [queryTicketTitle, setSearchQuery] = useState("");

  return (
    <>
      <SelectContext.Provider
        value={{
          selectedTickets,
          setSelectedTickets,
          queryTicketTitle,
          searchParams,
        }}
      >
        <main>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <SelectedDataInfo
                selectedTickets={selectedTickets}
                setSelectedTickets={setSelectedTickets}
              />
              <TicketSearch
                queryTicketTitle={queryTicketTitle}
                setSearchQuery={setSearchQuery}
              />
              <FilterByCreation />
            </div>
            <div className="flex items-center gap-2">
              <MergeTickets />
              <CreateTicketButton />
              <DropdownMenuButton
                title={"Quick Actions"}
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
