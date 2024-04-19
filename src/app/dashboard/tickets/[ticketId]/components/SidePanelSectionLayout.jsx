import { cn } from "@/lib/utils";

export default function SidePanelSection({ children, title, icon, className }) {
    return (
        <>
            <div className={cn("mb-2", className)}>
                <p className="border-b mb-2 flex items-center gap-2 pb-1 border-gray-700 text-sm font-bold">
                    {icon}
                    {title}
                </p>
                {children}
            </div>
        </>
    );
}
