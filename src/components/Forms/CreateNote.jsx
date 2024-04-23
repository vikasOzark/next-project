import { useCreateUserNote } from "@/hooks/user-notes.hook";
import { QUERY_KEYS } from "@/queryKeys";
import { useRouter } from "next/navigation";
import { useEffect, useRef, forwardRef } from "react";
import { VscCheck, VscLoading } from "react-icons/vsc";
import { toast } from "react-hot-toast";
import { urlRoutes } from "@/utils/urlRoutes";

const CreateNote = forwardRef(({ setCreating }, ref) => {
    const router = useRouter();
    const formRef = useRef(null);
    const inputRef = useRef(null);

    const { mutate, isLoading, isError, isSuccess, data } = useCreateUserNote(
        QUERY_KEYS.USER_NOTE_LIST
    );

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        if (isSuccess && "id" in data.data) {
            formRef.current.reset();
            setCreating(false);
            toast.success("Note created successfully.");
            router.push(urlRoutes.NOTES + "/" + data?.data?.id);
        }

        if (isError) {
            toast.error("Something bad happened, Please try again");
        }
    }, [isSuccess, isError, setCreating, data?.data, router]);

    return (
        <>
            <div>
                <form
                    ref={formRef}
                    onSubmit={mutate}
                    className="p-1 border flex items-center ms-2 rounded border-gray-700"
                >
                    <input
                        ref={inputRef}
                        autoFocus
                        className="bg-transparent w-full text-gray-300 focus:outline-none"
                        type="text"
                        name="noteTitle"
                        defaultValue={"Untitled"}
                    />
                    {isLoading ? (
                        <button
                            type="submit"
                            className=" cursor-pointer bg-gray-500 rounded p-1  transition-all"
                        >
                            <VscLoading className=" animate-spin" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className=" cursor-pointer bg-gray-500 rounded p-1 hover:bg-green-500 transition-all"
                        >
                            <VscCheck color="white" className="" />
                        </button>
                    )}
                </form>
            </div>
        </>
    );
});
CreateNote.displayName = "create_user_note";
export default CreateNote;
