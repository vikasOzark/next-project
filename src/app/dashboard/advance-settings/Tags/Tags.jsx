"use client";
import { VscAdd, VscTrash } from "react-icons/vsc";
import { getTagsList } from "../../tickets/component/forms/utils";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import Modal from "@/components/Modal";
import { CreateTagForm } from "@/components/Forms/CreateTagForm";
import axios from "axios";
import { LoadingState } from "@/components/Buttons";
import toast from "react-hot-toast";

export default function ManageTags() {
    const tags = useQuery(
        "tags-list",
        () => getTagsList({ isFormatted: true }),
        {
            cacheTime: 0,
            staleTime: 0,
            refetchOnMount: 0,
            refetchOnWindowFocus: 0,
        }
    );

    return (
        <div className="overflow-y-auto overflow-hidden h-[16em] ">
            {tags.isLoading && (
                <>
                    <div className="flex justify-center ">
                        <LoadingState
                            title={"Loading..."}
                            cssClass={"text-white"}
                        />
                    </div>
                </>
            )}
            <div className="grid gap-2 grid-cols-2">
                {tags.data?.data?.sort().map((item) => (
                    <div
                        key={item.id}
                        className={`text-center text-ellipsis text-accent text-sm group cursor-pointer mb-2 peer rounded-full px-3 p-1 flex items-center text-white justify-between ${item.color}`}
                    >
                        <p>{item.title}</p>
                        <DeleteTagButton tagId={item.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}

const DeleteTagButton = ({ tagId }) => {
    const queryClient = useQueryClient();

    const tagDeleteMutation = useMutation({
        mutationFn: () => axios.delete(`/api/tags/${tagId}`),
        onSuccess: (data) => {
            queryClient.invalidateQueries("tags-list");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <>
            {tagDeleteMutation.isLoading ? (
                <LoadingState title={"Deleting..."} />
            ) : (
                <div
                    onClick={tagDeleteMutation.mutate}
                    className="hover:bg-white invisible  group-hover:visible cursor-pointer rounded-full p-1 hover:text-red-500"
                >
                    <VscTrash size={18} />
                </div>
            )}
        </>
    );
};

export const CreateTag = () => {
    const [tagsModalOpen, setTagsModalOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setTagsModalOpen((pre) => !pre)}
                className="hover:bg-gray-400 p-2 rounded-full transition-all hover:text-black flex items-center"
            >
                <VscAdd />
            </button>
            <Modal
                open={tagsModalOpen}
                setOpen={setTagsModalOpen}
                modalTitle={"Create Tags"}
            >
                <CreateTagForm setTagsModalOpen={setTagsModalOpen} />
            </Modal>
        </>
    );
};
