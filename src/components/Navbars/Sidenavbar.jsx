import { cn } from "@/lib/utils";
import { LineChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const LinkComponent = ({ linkObject, className }) => {
    const pathName = usePathname();
    console.log(pathName);
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
                `mx-[-0.65rem] flex items-center gap-4 rounded-md px-3 py-2 soft-bg-hover ${
                    linkObject.active && "temp-bg"
                } `,
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

export const useNavActive = () => {
    const pathName = usePathname();
    const path = pathName.split("/");

    return (route) => {
        const routePath = route.split("/");
        return path[2] === routePath[2];
    };
};
