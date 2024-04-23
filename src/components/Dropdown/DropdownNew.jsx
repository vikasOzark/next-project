import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ButtonComponent } from "../Buttons";

export default function DropdownNew({
    children,
    btnClassName,
    className,
    title,
    icon,
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className={cn(
                        "px-4 flex gap-2 border-0 rounded-md items-center font-bold hover:bg-gray-600 text-white",
                        btnClassName
                    )}
                >
                    {icon}
                    {title}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className={cn("bg-[#1f1e24] border-0 p-2", className)}
            >
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
