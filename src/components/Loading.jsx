import { cn } from "@/lib/utils";
import { VscLoading } from "react-icons/vsc";

export const LoadingState = ({ message, className, loadingProps }) => (
    <>
        <span
            className={cn(
                "flex items-center gap-2 text-white font-bold text-lg",
                className
            )}
        >
            <VscLoading
                {...loadingProps}
                className={cn("animate-spin", loadingProps?.className)}
            />
            {message || "Loading..."}
        </span>
    </>
);
