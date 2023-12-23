import { CreateTagForm } from "@/components/Forms/CreateTagForm";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, usePathname, useRouter } from "next/navigation";
import { VscListFilter } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

export function FilterByCreation() {
  const router = useRouter();
  const pathName = usePathname();

  const handleQuery = (query) => {
    if (pathName.includes("?")) {
      router.push(`sortTicket=${query}`);
    } else {
      router.push(`?sortTicket=${query}`);
    }
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
            <VscListFilter size={28} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleQuery("new-to-old")}>
              New to old
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleQuery("old-to-new")}>
              Old to new
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
