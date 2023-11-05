import { twMerge } from "tailwind-merge";

export const TicketStatusCard = ({
  title,
  data,
  analyticString,
  icon,
  style,
}) => {
  return (
    <>
      <div
        className={twMerge(
          `rounded-xl bg-white ms-2 text-card-foreground shadow`,
          style
        )}
      >
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">{title}</h3>
          {icon}
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">{data}</div>
          <p className="text-xs text-muted-foreground">{analyticString}</p>
        </div>
      </div>
    </>
  );
};
