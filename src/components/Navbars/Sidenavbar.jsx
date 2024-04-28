import { cn } from "@/lib/utils";
import { LineChart } from "lucide-react";
import Link from "next/link";

export const LinkComponent = ({ linkObject, className }) => {
    return (
        <Link
            href={linkObject.route}
            className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 soft-bg-hover ",
                className
            )}
        >
            {linkObject?.icon ? (
                linkObject.icon
            ) : (
                <LineChart className="h-5 w-5" />
            )}
            {linkObject.title}
        </Link>
    );
};

export const LinkComponentLg = ({ linkObject, className }) => {
    return (
        <Link
            href={linkObject.route}
            className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-md px-3 py-2 soft-bg-hover ",
                className
            )}
        >
            {linkObject?.icon ? (
                linkObject.icon
            ) : (
                <LineChart className="h-5 w-5" />
            )}
            {linkObject.title}
        </Link>
    );
};
