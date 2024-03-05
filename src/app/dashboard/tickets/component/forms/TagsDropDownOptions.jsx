import {
    VscCheck,
    VscChevronUp,
    VscChromeClose,
    VscTag,
} from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getTagsList } from "./utils";

export const TagsOptions = ({ setSelectedTag, selectedTag }) => {
    const [tags, setTags] = useState([]);
    useQuery("tags-list", () => getTagsList(setTags), {
        onSuccess: (response) => {
            if (response?.success) {
                const formatted = response.data?.map((item) => ({
                    name: item.title,
                    id: item.id,
                    color: item.color,
                    isSelected: false,
                }));
                setTags(formatted);
            }
        },
    });

    const [tagsIsOption, setTagsIsOption] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setTagsIsOption(false);
        }
    };

    const handleSelect = (tag) => {
        const isMatched = selectedTag.find((item) => item.id === tag.id);
        if (!isMatched) {
            setSelectedTag([...selectedTag, tag]);
        }

        tags.find((item, index) => {
            if (item.id === tag.id) {
                const newUpdated = [...tags];
                if (!newUpdated[index].isSelected) {
                    newUpdated[index].isSelected = true;
                }
                setTags(newUpdated);
            }
        });
    };

    const handleRemove = (tag) => {
        selectedTag.find((item, index) => {
            if (item.id === tag.id) {
                const newA = [...selectedTag];
                newA.splice(index, 1);
                setSelectedTag(newA);
            }

            tags.find((item, index) => {
                if (item.id === tag.id) {
                    const newUpdated = [...tags];
                    newUpdated[index].isSelected = false;
                    setTags(newUpdated);
                }
            });
        });
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return (
        <>
            <div className="">
                <button
                    type="button"
                    onClick={() => setTagsIsOption((pre) => !pre)}
                    className="px-4 py-1 border border-gray-400 hover:border-gray-700 text-white flex gap-2 items-center rounded-lg hover:bg-gray-500"
                >
                    <VscTag />
                    Add tag{" "}
                    {tagsIsOption ? (
                        <VscChevronUp className=" rotate-180 transition-transform " />
                    ) : (
                        <VscChevronUp className="transition-transform" />
                    )}
                </button>
            </div>

            <div className="mt-2 flex  items-center gap-1 overflow-x-auto overflow-hidden">
                {selectedTag.map((item) => (
                    <span
                        key={item.id}
                        className={`px-3 text-sm rounded-full font-bold py-1 flex text-white gap-2 items-center break-keep ${item.color}`}
                    >
                        {item.name}{" "}
                        <VscChromeClose
                            onClick={() => handleRemove(item)}
                            className=" hover:bg-gray-100 rounded-full h-5 p-[3px] cursor-pointer w-5"
                        />{" "}
                    </span>
                ))}
            </div>

            <div
                ref={dropdownRef}
                className={`absolute rounded-lg top-8 drop-shadow-xl border bg-gray-500 mt-2  p-2 w-[12rem] z-[100] overflow-hidden overflow-y-auto h-[8rem] ${
                    tagsIsOption ? "block" : "hidden"
                }`}
            >
                {tags?.sort().map((item) => (
                    <p
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className={`text-center cursor-pointer hover:opacity-50 rounded-full px-3 mb-1 flex items-center text-white justify-between text-sm ${item.color}`}
                    >
                        {item.name}
                        {item.isSelected && <VscCheck />}
                    </p>
                ))}
            </div>
        </>
    );
};
