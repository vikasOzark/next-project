import { VscInfo, VscPass, VscWarning } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

export const SimpleErrorMessage = ({ message, className }) => (
  <p
    className={twMerge(
      "text-red-500 font-bold text-lg flex gap-2 items-center justify-center",
      className
    )}
  >
    {" "}
    <VscWarning /> {message}
  </p>
);

export const SimpleSuccessMessage = ({ message, className }) => (
  <p
    className={twMerge(
      "text-green-500 font-bold text-lg flex gap-2 items-center justify-center",
      className
    )}
  >
    {" "}
    <VscPass /> {message}
  </p>
);

export const SimpleInfoMessage = ({ message, className }) => (
  <p
    className={twMerge(
      "text-gray-500 font-bold text-lg flex gap-2 items-center justify-center",
      className
    )}
  >
    {" "}
    <VscInfo /> {message}
  </p>
);
