import { ActionButton, LoadingState } from "@/components/Buttons";
import axios from "axios";
import React, { use } from "react";
import toast from "react-hot-toast";
import { VscTrash } from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";

export const DeleteUser = ({ userId }) => {
  const queryClient = useQueryClient();

  const mutationUserRemove = useMutation({
    mutationFn: async () => {
      return axios.patch(`/api/users/${userId}`, {
        OPERATION_TYPE: "remove_user",
      });
    },
    onSuccess: () => queryClient.invalidateQueries("users-list"),
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return (
    <>
      {mutationUserRemove.isLoading ? (
        <LoadingState title={"Deleting..."} />
      ) : (
        <ActionButton
          onClick={mutationUserRemove.mutate}
          cssClass={"bg-red-500 rounded-full hover:bg-red-700 transition-all"}
        >
          <VscTrash size={18} className="font-bold" fontWeight={800} />
          Delete
        </ActionButton>
      )}
    </>
  );
};
