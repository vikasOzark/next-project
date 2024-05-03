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

export const PageLoader = () => (
    <div className="h-screen grid place-content-center justify-center items-center">
        <div className="flex gap-2 flex-row items-center justify-center">
            <div className="loader-new"></div>
            <p className="text-2xl text-white font-bold">
                Loading <span className=" animate-pulse delay-600">.</span>
                <span className=" animate-pulse delay-700">.</span>
                <span className=" animate-pulse delay-800">.</span>
            </p>
        </div>
    </div>
);
