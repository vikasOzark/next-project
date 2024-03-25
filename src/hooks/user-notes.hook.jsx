import { useQueryClient, useMutation, useQuery } from "react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { QUERY_KEYS } from "@/queryKeys";

export const useCreateUserNote = () => {
    const clientQuery = useQueryClient();

    return useMutation({
        mutationFn: (event) => {
            event.preventDefault();
            const noteTitle = event.target.noteTitle.value;
            return axios
                .post(`/api/user-notes`, { title: noteTitle })
                .then((response) => response.data);
        },
        onSuccess: ({ data }) => {
            if (data?.success || "id" in data) {
                toast.success("Note created successfully.");
                clientQuery.invalidateQueries({
                    queryKey: [QUERY_KEYS.USER_NOTE_LIST],
                });
            } else {
                toast.error("Something bad happened.");
            }
        },
    });
};

export const useUpdateUserNote = (noteId) => {
    return useMutation({
        mutationFn: (payload) => {
            return axios
                .patch(`/api/user-notes/${noteId}`, payload)
                .then((response) => response.data);
        },
    });
};

export const useGetUserNote = () => {
    return useQuery({
        queryKey: QUERY_KEYS.USER_NOTE_LIST,
        queryFn: () => {
            return axios
                .get(`/api/user-notes`)
                .then((response) => response.data);
        },
        retry: 0,
        select: (data) => {
            return data.data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
};

export const useGetUserNoteWithId = (noteId) => {
    return useQuery({
        queryKey: [QUERY_KEYS.USER_NOTE_LIST, noteId],
        queryFn: ({ queryKey }) => {
            const [_, id] = queryKey;
            return axios
                .get(`/api/user-notes/` + id)
                .then((response) => response.data);
        },
        retry: 0,
        select: (data) => {
            return data.data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
};

export const useDeleteNoteWithId = () => {
    const clientQuery = useQueryClient();
    return useMutation({
        mutationKey: [QUERY_KEYS.USER_NOTE_LIST],
        mutationFn: (noteId) => {
            return axios
                .delete(`/api/user-notes/` + noteId)
                .then((response) => response.data);
        },
        onSuccess: () => {
            toast.success("Note deleted successfully.");
            clientQuery.invalidateQueries({
                queryKey: [QUERY_KEYS.USER_NOTE_LIST],
            });
        },
        onError: () => toast.error("Something bad happened."),
    });
};
