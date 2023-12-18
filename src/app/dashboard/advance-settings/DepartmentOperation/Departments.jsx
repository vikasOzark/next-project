import { LoadingState } from "../../../../components/Buttons";
import { useQuery } from "react-query";
import { InfoMessage } from "../../../../components/Messages/NotificationMessage";
import { SimpleErrorMessage } from "@/components/SimpleErrorMessage/SimpleNotifyMessages";
import { VscAdd, VscTrash } from "react-icons/vsc";
import Modal from "@/components/Modal";
import { CreateDepartmentForm } from "@/components/Forms/CreateDepartment";
import { useState } from "react";

export const Departments = () => {
  const responseData = useQuery("departments", async () => {
    const response = await fetch("/api/departments");
    const json_response = await response.json();
    return json_response;
  });
  return (
    <>
      <div className="overflow-y-auto overflow-hidden h-[16em]">
        {responseData.isLoading && (
          <>
            <div className="flex justify-center ">
              <LoadingState title={"Loading..."} cssClass={"text-white"} />
            </div>
          </>
        )}
        {responseData.isSuccess &&
          responseData.data?.success &&
          responseData.data.data?.map((item) => (
            <button
              key={item.id}
              className="flex group mb-2 soft-bg hover:bg-gray-900 text-white items-center justify-between w-full px-3 py-2 text-xs font-medium transition-colors duration-300 transform rounded-lg   dark:text-gray-200"
            >
              <div className="flex items-center gap-x-2 ">
                <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                <span>{item.name}</span>
              </div>

              <div className="hover:bg-gray-500 invisible group-hover:visible rounded-full p-1  hover:text-red-500">
                <VscTrash size={18} />
              </div>
            </button>
          ))}
      </div>
      {responseData.isSuccess &&
      responseData.data?.success &&
      responseData.data?.data?.length === 0 ? (
        <InfoMessage message={"No department found."} />
      ) : null}

      {responseData.isError ? (
        <SimpleErrorMessage message={"Something went wrong hello."} />
      ) : null}

      {responseData.isSuccess && !responseData.data?.success ? (
        <SimpleErrorMessage message={"Something went wrong."} />
      ) : null}
    </>
  );
};

export const CreateDepartment = () => {
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
        modalTitle={"Create Department"}
      >
        <CreateDepartmentForm />
      </Modal>
    </>
  );
};
