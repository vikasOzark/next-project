import { useOnClickOutside } from "@/hooks/modalClose.hook";
import { useRef, useState } from "react";
import { VscActivateBreakpoints, VscCircleSlash } from "react-icons/vsc";

export default function ColorPickerDropDown({
    color: selectedColor,
    setColor,
}) {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const niceColors = [
        "#FF6347", // Tangerine
        "#FFCE56", // Sunflower
        "#4CAF50", // Green teal
        "#2196F3", // Royal blue
        "#9C27B0", // Wisteria purple
        "#3F51B5", // Indigo
        "#E91E63", // Cerise pink
        "#F44336", // Red
        "#FFEB3B", // Canary yellow
        "#C0CA33", // Lime green
    ];

    const inputRef = useRef(null);
    useOnClickOutside({
        ref: inputRef,
        handler: () => setShowColorPicker(false),
    });

    const bg = { backgroundColor: selectedColor };

    return (
        <>
            <div className="relative" ref={inputRef}>
                <div
                    onClick={() => setShowColorPicker((pre) => !pre)}
                    type="button"
                    style={selectedColor !== "" ? bg : {}}
                    className="soft-bg soft-bg-hover p-2 rounded-md cursor-pointer"
                >
                    <VscActivateBreakpoints size={20} />
                </div>
                {showColorPicker && (
                    <div className="absolute mt-1 soft-bg p-3 rounded-lg w-[12rem] right-0 cursor-pointer z-50">
                        <div className="grid grid-cols-5 gap-1">
                            {niceColors.map((color) => {
                                return (
                                    <>
                                        <div
                                            onClick={() => setColor(color)}
                                            style={{ backgroundColor: color }}
                                            class={`h-8 w-8 rounded-md bg-slate-700 ${
                                                color === selectedColor &&
                                                " ring-gray-400"
                                            }`}
                                        ></div>
                                    </>
                                );
                            })}
                            <div
                                onClick={() => setColor("")}
                                class={`h-8 w-8 rounded-md soft-bg softer-bg softer-bg-hover grid place-content-center`}
                            >
                                <VscCircleSlash size={20} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
