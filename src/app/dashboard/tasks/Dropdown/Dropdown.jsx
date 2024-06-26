import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
const Dropdown = ({ buttonTitle, icon, className, children }) => {
    const dropRef = useRef();
    const [open, setOpen] = useState(false);
    useOut;

    return (
        <div ref={dropRef} className={cn("relative", className)}>
            <div
                onClick={() => setOpen((pre) => !pre)}
                className="flex items-center gap-2"
            >
                {icon}
                {buttonTitle}
            </div>
            {open && (
                <div className="absolute mt-1 soft-bg soft-bg-border p-3 rounded-lg w-[12rem] right-0 cursor-pointer z-50">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
