"use client";

import { MdOutlineContactEmergency } from "react-icons/md";
import BaseAdvancedCardLayout from "../../BaseCardLaylout";
import {
  CreateDepartment,
  Departments,
} from "../../DepartmentOperation/Departments";

export default function DepartmentPage() {
  return (
    <>
      <div className="">
        <BaseAdvancedCardLayout
          title={"Department"}
          icon={<MdOutlineContactEmergency />}
          ActionButton={<CreateDepartment />}
        >
          <Departments />
        </BaseAdvancedCardLayout>
      </div>
    </>
  );
}
