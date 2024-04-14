import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import * as React from "react";

export function DropdownMenuCheckboxes({ title, subTitle, data }) {
    const [showStatusBar, setShowStatusBar] = React.useState(true);
    const [showActivityBar, setShowActivityBar] = React.useState(false);
    const [showPanel, setShowPanel] = React.useState(false);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>{title}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{subTitle}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                >
                    Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={showActivityBar}
                    onCheckedChange={setShowActivityBar}
                >
                    Activity Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                >
                    Panel
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function SelectComponent({ setterFunction, className, subTitle, data }) {
    return (
        <Select onValueChange={setterFunction}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select ${subTitle.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className={cn(" soft-bg border-none", className)}>
                <SelectGroup>
                    <SelectLabel>{subTitle}</SelectLabel>
                    {data?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
