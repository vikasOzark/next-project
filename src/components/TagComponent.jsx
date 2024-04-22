import { cn } from "@/lib/utils";
import { VscChromeClose } from "react-icons/vsc";

export default function Tag({ tag, className, onClick, isLoading }) {
    return (
        <div
            onClick={() => onClick(tag)}
            className={cn(
                "px-2 mb-1 w-fit flex items-center justify-between gap-3 cursor-pointer group hover:border-gray-200 transition-all hover:border-2 border-2 border-transparent rounded-full ",
                tag.color,
                className
            )}
        >
            {tag.title}{" "}
            <span className="hover:bg-gray-500 hover:bg-text-700 rounded-full p-1 ">
                <VscChromeClose size={15} />
            </span>
        </div>
    );
}
