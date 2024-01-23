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
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function DropdownMenuButton({ styleButton, icon, title }) {
  const [tagsModalOpen, setTagsModalOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={twMerge(
              "px-4 flex gap-2 items-center font-bold hover-bg-gray-500",
              styleButton
            )}
          >
            {icon}
            {title}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Global Action</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setTagsModalOpen((pre) => !pre)}>
              Create Tag
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal
        open={tagsModalOpen}
        setOpen={setTagsModalOpen}
        modalTitle={"Create Tags"}
      >
        <CreateTagForm setTagsModalOpen={setTagsModalOpen} />
      </Modal>
    </>
  );
}
