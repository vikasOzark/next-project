import { CreateTagForm } from "@/components/Forms/CreateTagForm";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Status } from "@prisma/client";
import { CgReorder } from "react-icons/cg";

import { usePathname, useRouter } from "next/navigation";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { VscFilter, VscListFilter } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

export function FilterByCreation() {
  const router = useRouter();
  const pathName = usePathname();

  const handleOrderBy = (query) => {};
  const handleSort = (query) => {};
  const handleFilter = (query) => {
    console.log(query);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={twMerge(
              "px-2 flex gap-2 bg-transparent items-center font-bold hover:bg-gray-500",
              ""
            )}
          >
            <VscFilter size={25} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-0">
          <DropdownMenuLabel>Filter</DropdownMenuLabel>

          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className={"gap-2"}>
                <VscListFilter size={20} /> Order by
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleOrderBy("new-to-old")}>
                    New to old
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleOrderBy("old-to-new")}>
                    Old to new
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            {sorting === "desc" ? (
              <DropdownMenuItem
                className={"gap-2"}
                onClick={() => handleSort("asc")}
              >
                <AiOutlineSortAscending size={20} /> Asc
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className={"gap-2"}
                onClick={() => handleSort("desc")}
              >
                <AiOutlineSortDescending size={20} /> Desc
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger size={20} className={"gap-2"}>
                <CgReorder />
                Filter by
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {Object.entries(Status).map((status) => (
                    <DropdownMenuItem
                      onClick={() => handleFilter(status[0])}
                      key={status[0]}
                    >
                      {status[1]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
