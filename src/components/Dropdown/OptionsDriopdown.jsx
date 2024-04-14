import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "@/hooks/modalClose.hook";

const OptionsDropdown = ({
    buttonTitle,
    icon,
    className,
    children,
    bodyClass,
}) => {
    const dropRef = useRef();
    const [open, setOpen] = useState(false);
    useOnClickOutside({ ref: dropRef, handler: () => setOpen(false) });

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
                <div
                    className={cn(
                        "absolute mt-1 soft-bg p-1 rounded-lg w-[10rem] right-0 cursor-pointer z-50",
                        bodyClass
                    )}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default OptionsDropdown;
