import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const PasswordValidatorConponent = ({ validateLevel }) => {
  const [styleProvider, setStyleProvider] = useState(null);

  useEffect(() => {
    const passwdValue = validateLevel.toUpperCase();

    if (passwdValue === "WEAK") {
      setStyleProvider("w-[25%] bg-yellow-500");
    } else if (passwdValue === "MEDIUM") {
      setStyleProvider("w-[50%] bg-purple-400");
    } else if (passwdValue === "STRONG") {
      setStyleProvider("w-[75%] bg-blue-700");
    } else if (passwdValue === "VERY STRONG") {
        setStyleProvider("w-[100%] bg-green-600");
    }
  }, [validateLevel]);

  return (
    <>
      <div className="h-[5px] rounded-full">
        <div
          className={twMerge(`bg-red-500 h-full transition-all duration-200 rounded-full`, styleProvider)}
        ></div>
      </div>
    </>
  );
};
