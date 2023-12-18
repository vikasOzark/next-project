import { cn } from "@/lib/utils";

export default function BaseAdvancedCardLayout({
  children,
  title,
  icon,
  ActionButton,
  className,
  childrenClass,
}) {
  return (
    <>
      <div
        className={cn(
          `lg:col-span-4 md:col-span-6 md:text-lg advance-card-ar shadow-lg text-white font-bold lg:text-lg rounded-xl softer-bg p-2`,
          className
        )}
      >
        <div className="">
          <h3 className="text-gray-300 text-2xl mb-4">
            <div className="flex justify-between items-baseline ">
              <div className="flex items-center gap-2">
                {icon}
                {title}
              </div>
              <div>{ActionButton}</div>
            </div>
          </h3>
        </div>
        <div className={cn("", childrenClass)}>{children}</div>
      </div>
    </>
  );
}
