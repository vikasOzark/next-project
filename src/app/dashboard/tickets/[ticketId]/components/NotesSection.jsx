import React, { useContext, useEffect, useRef, useState } from "react";
import {
    VscAdd,
    VscCheck,
    VscCheckAll,
    VscEdit,
    VscExtensions,
    VscLoading,
    VscSymbolInterface,
    VscTrash,
} from "react-icons/vsc";
import { TicketDataContext } from "../page";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    ActionButton,
    LoadingButton,
    LoadingState,
    SubmitButton,
} from "@/components/Buttons";
import handleTimeFormat from "@/utils/dateTimeFormat";
import { SimpleErrorMessage } from "@/components/SimpleErrorMessage/SimpleNotifyMessages";

export const NotesSection = () => {
    const { params } = useContext(TicketDataContext);

    const notesResponse = useQuery({
        queryFn: () => {
            return axios.get(`/api/tickets/${params?.ticketId}/notes`);
        },
        queryKey: "notes",
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const notes = notesResponse.data?.data.data || [];
    const displayNotes = (notes) => {
        const notesArray = [...notes];

        notesArray.push(<CreateNote />);
        let newNotesArray = [];

        const noteLength = notesArray.length;
        for (let noteIndex = 0; noteIndex < notesArray.length; noteIndex++) {
            const noteObject = notesArray[noteIndex];

            if (noteLength === noteIndex + 1) {
                newNotesArray.push(<CreateNote key={"123456"} />);
            } else {
                newNotesArray.push(
                    <Note key={noteObject.id} note={noteObject} />
                );
            }
        }
        return newNotesArray;
    };

    return (
        <>
            {notesResponse.isError && (
                <SimpleErrorMessage
                    message={notesResponse.data?.data?.message}
                />
            )}
            {notesResponse.isLoading ? (
                <div className="flex justify-center">
                    <LoadingState
                        title={"Loading notes..."}
                        cssClass={"text-white text-lg font-bold"}
                    />
                </div>
            ) : (
                <div className="mt-2 px-2 overflow-scroll p-2 h-[30rem] border rounded-2xl border-gray-600">
                    {notes.length > 0 ? (
                        displayNotes(notes)
                    ) : (
                        <>
                            <div className="text-center">
                                <p className="text-2xl flex justify-center items-center gap-2 text-gray-400 mb-4 font-bold">
                                    <VscExtensions /> No note available
                                </p>
                                <CreateFirstNote />
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export const Note = ({ note }) => {
    const { ticketData } = useContext(TicketDataContext);
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => {
            return axios.delete(
                `/api/tickets/${ticketData.id}/notes/${note.id}`
            );
        },
        onSuccess: () => {
            setTimeout(() => queryClient.invalidateQueries("notes"), 2000);
        },
    });

    return (
        <div className="relative mb-4 flex gap-2 ">
            <div className="flex gap-2">
                <div
                    onClick={deleteMutation.mutate}
                    className={`h-10 w-10 cursor-pointer rounded-full relative flex items-center justify-center peer z-10 ${
                        deleteMutation.isSuccess
                            ? "bg-green-500"
                            : "bg-gray-500 hover:bg-red-500"
                    } `}
                >
                    {deleteMutation.isLoading ? (
                        <div className="absolute">
                            <VscLoading
                                size={45}
                                color="white"
                                className="animate-spin"
                            />
                        </div>
                    ) : (
                        <div className=" peer-hover:block">
                            {deleteMutation.isSuccess ? (
                                <VscCheck size={25} />
                            ) : (
                                <VscTrash size={25} />
                            )}
                        </div>
                    )}
                </div>

                <div className="absolute w-1 mt-5 left-[1.15rem] bg-gray-700 rounded h-full text-white "></div>
                <div className="mb-2 text-lg font-bold text-white w-fit  ">
                    <div className="text-2xl flex items-center gap-2 text-white mb-2 font-bold">
                        <VscSymbolInterface className=" rotate-180" />
                        <div className="flex items-center gap-4">
                            {note?.createdBy.first_name}{" "}
                            {note?.createdBy.last_name}
                            <div className="text-sm text-gray-400">
                                {handleTimeFormat(note?.createdAt, {
                                    isFormated: true,
                                    datePrifix: "/",
                                    dateTime: true,
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-2 border border-blue-600 rounded-lg ">
                        <pre>{note?.note}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CreateNote = () => {
    const ticketData = useContext(TicketDataContext);
    const createFormRef = useRef();

    const id = ticketData.params?.ticketId;
    const [modalOpen, setModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const addNoteMutation = useMutation({
        mutationFn: (event) => {
            setModalOpen(false);
            event.preventDefault();

            const data = event.target.note.value;
            if (data === "") {
                throw new Error("Please enter a note.");
            }

            return axios.post(`/api/tickets/${id}/notes`, {
                note: data,
                id: id,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries("notes");
        },
    });

    useEffect(() => {
        const handleClose = (event) => {
            if (!createFormRef.current?.contains(event.target)) {
                setModalOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClose);

        return () => document.removeEventListener("mousedown", handleClose);
    });

    const focusRef = useRef(null);
    useEffect(() => {
        focusRef.current.scrollIntoView(true);
    }, []);

    return (
        <>
            <div className="relative mb-4 flex gap-2">
                <div className="flex w-full  gap-2">
                    <div
                        ref={focusRef}
                        onClick={() => setModalOpen((pre) => !pre)}
                        className=" border h-10 w-10 hover:bg-slate-400 cursor-pointer rounded-full z-10 flex  items-center justify-center bg-gray-700"
                    >
                        <VscAdd color="white" size={23} />
                    </div>

                    {modalOpen && (
                        <div
                            ref={createFormRef}
                            className={`mb-2 text-lg flex-1 font-bold text-white `}
                        >
                            <div className="text-2xl flex items-center gap-2 text-white mb-2 font-bold">
                                <VscSymbolInterface />
                                <div className="flex items-center gap-4 text-blue-500">
                                    Add new note
                                </div>
                            </div>
                            <div className={`soft-bg shadow-md p-2 rounded-lg`}>
                                <NoteCreateForm
                                    mutate={addNoteMutation.mutate}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className=" flex items-center justify-center">
                {addNoteMutation.isLoading && (
                    <LoadingButton title={"Adding note..."} />
                )}
            </div>
        </>
    );
};

export const CreateFirstNote = () => {
    const ticketData = useContext(TicketDataContext);
    const createFormRef = useRef();

    const id = ticketData.params?.ticketId;
    const [modalOpen, setModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const addNoteMutation = useMutation({
        mutationFn: (event) => {
            setModalOpen(false);
            event.preventDefault();

            const data = event.target.note.value;
            if (data === "") {
                throw new Error("Please enter a note.");
            }

            return axios.post(`/api/tickets/${id}/notes`, {
                note: data,
                id: id,
            });
        },
        onSuccess: () => {
            setTimeout(() => queryClient.invalidateQueries("notes"), 2000);
        },
    });

    useEffect(() => {
        const handleClose = (event) => {
            if (!createFormRef.current?.contains(event.target)) {
                setModalOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClose);

        return () => document.removeEventListener("mousedown", handleClose);
    });

    return (
        <>
            <ActionButton
                onClick={() => setModalOpen((pre) => !pre)}
                cssClass={"bg-gray-700 rounded-full hover:bg-gray-600"}
            >
                {modalOpen ? (
                    <>
                        <VscEdit size={23} /> Add now
                    </>
                ) : (
                    <>
                        <VscAdd size={23} /> Add first note
                    </>
                )}
            </ActionButton>

            <div className="relative mb-4 mt-4 flex gap-2">
                <div className="flex w-full  gap-2">
                    {modalOpen && (
                        <div
                            ref={createFormRef}
                            id="note-form"
                            className={`mb-2 text-lg flex-1 font-bold text-white ${
                                modalOpen ? "block" : "hidden"
                            } `}
                        >
                            <div
                                className={`softer-bg shadow-md p-2 rounded-lg`}
                            >
                                <NoteCreateForm
                                    mutate={addNoteMutation.mutate}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {addNoteMutation.isLoading && (
                <LoadingButton
                    cssClass={"bg-gray-600 text-white"}
                    title={"Adding note..."}
                />
            )}
            {addNoteMutation.isSuccess && (
                <div className="flex justify-center">
                    <div className="w-fit px-2 text-lg font-bold text-green-800 rounded-full z-10 flex  items-center justify-center bg-green-400">
                        <VscCheck color="white" size={23} /> Added note
                    </div>
                </div>
            )}
            {addNoteMutation.isError && (
                <SimpleErrorMessage message={"Adding note was failed !"} />
            )}
        </>
    );
};

export const NoteCreateForm = ({ mutate }) => {
    const ref = useRef(null);
    useEffect(() => {
        ref.current.scrollIntoView(true);
    }, []);
    return (
        <>
            <form onSubmit={mutate}>
                <div className="p-5">
                    <div>
                        <label
                            htmlFor="note"
                            className=" text-lg mb-4 text-white dark:text-white font-bold leading-6 "
                        >
                            Write note here
                        </label>
                        <div className="mt-2">
                            <textarea
                                ref={ref}
                                id="note"
                                name="note"
                                type="text"
                                className="w-full rounded-md border-0 p-2 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="my-2 flex justify-end">
                        <SubmitButton
                            title={"Add note"}
                            cssClass={"bg-gray-300"}
                            icon={<VscCheckAll size={23} />}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};
