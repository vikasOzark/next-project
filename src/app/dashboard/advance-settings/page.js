"use client";

import { MdOutlineContactEmergency } from "react-icons/md";
import BaseAdvancedCardLayout from "./BaseCardLaylout";
import { CreateDepartment, Departments } from "./DepartmentOperation/Departments";
import ManageTags, { CreateTag } from "./Tags/Tags";
import { AiOutlineTag } from "react-icons/ai";
import { ActionButton } from "@/components/Buttons";

export default function AdvancedSettings() {
  return (
    <>
      <div className="">
        <div className="grid mt-5 gap-4 grid-cols-1 md:grid-cols-12 lg:grid-cols-12">
          <BaseAdvancedCardLayout
            title={"Department"}
            icon={<MdOutlineContactEmergency />}
            ActionButton={<CreateDepartment />}
          >
            <Departments />
          </BaseAdvancedCardLayout>

          <BaseAdvancedCardLayout title="Manage Tags" icon={<AiOutlineTag />} ActionButton={<CreateTag />}>
            <ManageTags />
          </BaseAdvancedCardLayout>
        </div>
      </div>
    </>
  );
}
