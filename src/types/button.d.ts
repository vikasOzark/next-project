import { IconType } from "react-icons";

export type ButtonNewPropType = {
    className: string;
    icon: IconType;
    title: string;
    onClick: () => void;
    isLoading: boolean;
    children: React.ReactNode;
};
