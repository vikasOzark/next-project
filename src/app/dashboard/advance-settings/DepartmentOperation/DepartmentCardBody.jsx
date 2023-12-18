"use client";

import { Suspense } from "react";
import { Departments } from "./Departments";
import BaseAdvancedCardLayout from "../BaseCardLaylout";
import { MdOutlineContactEmergency } from "react-icons/md";
import { cn } from "@/lib/utils";

export default function DepartmentCardBody({ className }) {
  return (
    <>
      <div>
        <Departments />
      </div>
    </>
  );
}
