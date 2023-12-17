import { ActionButton, LoadingState } from "@/components/Buttons";
import axios from "axios";
import React, { use } from "react";
import toast from "react-hot-toast";
import { VscTrash } from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";

export const ToggleDisableUser = ({ user }) => {
  const { id } = user;
  const queryClient = useQueryClient();

  const mutationUser = useMutation({
    mutationFn: async (OPERATION_TYPE) => {
      return axios.patch(`/api/users/${id}`, {
        OPERATION_TYPE: OPERATION_TYPE,
      });
    },
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries("users-list");
    },
    onError: (error) => {
      const response = JSON.parse(error?.request?.response);
      toast.error(response.message);
    },
  });

  return (
    <>
      {mutationUser.isLoading ? (
        <LoadingState
          title={user.isDisabled ? "Enabling..." : "Disabling..."}
          cssClass={"text-white"}
        />
      ) : (
        <>
          {user.isDisabled ? (
            <ActionButton
              onClick={() => mutationUser.mutate("enable_user")}
              cssClass={" rounded-full hover:bg-gray-500 transition-all gap-2"}
            >
              <VscTrash size={18} className="font-bold" fontWeight={800} />
              Enable
            </ActionButton>
          ) : (
            <ActionButton
              onClick={() => mutationUser.mutate("disable_user")}
              cssClass={" rounded-full hover:bg-gray-500 transition-all gap-2"}
            >
              <VscTrash size={18} className="font-bold" fontWeight={800} />
              Disable
            </ActionButton>
          )}
        </>
      )}
    </>
  );
};
