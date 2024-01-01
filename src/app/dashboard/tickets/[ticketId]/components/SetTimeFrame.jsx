import { LoadingState, SubmitButton } from "@/components/Buttons";
import toast from "react-hot-toast";
import { RxCounterClockwiseClock, RxTimer } from "react-icons/rx";
import { useMutation, useQueryClient } from "react-query";
import { TicketDataContext } from "../page";
import { useContext } from "react";
9711568623;

export const SetTimeFrame = () => {
  const { params, ticketData } = useContext(TicketDataContext);
  const queryClient = useQueryClient();

  const setTimeFrameMutation = useMutation({
    mutationKey: "set-time-frame",
    mutationFn: async (event) => {
      event.preventDefault();

      let payload = {};

      if (event.target.startDate.value) {
        payload.startDate = new Date(
          event.target.startDate.value
        ).toISOString();
      }

      if (event.target.endDate.value) {
        payload.endDate = new Date(event.target.endDate.value).toISOString();
      }

      const response = await fetch(
        `/api/tickets/${params.ticketId}/set-time-frame`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
        }
      );

      const json_response = await response.json();
      return json_response;
    },
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries(params.ticketId);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  const getFormatedDateTime = (dateTimeObject) => {
    const formattedDate = dateTimeObject.toLocaleString("en-US", options);
    const dateTime = new Date(formattedDate);

    const dateYear = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();

    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    return `${day}-${month}-${dateYear} | ${hours}:${minutes}`;
  };

  return (
    <>
      <div
        className={`border rounded-2xl  ${
          ticketData.startDate || ticketData.endDate
            ? "border-green-500"
            : "border-gray-600"
        } mt-4 p-2 soft-bg`}
      >
        <div>
          <h3 className="text-lg font-medium flex gap-2 items-center text-white">
            <RxCounterClockwiseClock size={20} /> Time frame
          </h3>
          <small className="text-white font-medium  leading-none">
            Provide date time range to close or take action on this ticket,
            which help you to close this on time.
          </small>
        </div>
        <div className=" mt-1">
          <form onSubmit={setTimeFrameMutation.mutate}>
            <div className="flex gap-2 p-2">
              <div className="h-full">
                <label className="text-md text-white font-medium " htmlFor="">
                  Start date
                </label>
                <div className="bg-gray-500 rounded-lg w-full h-8 px-2">
                  <input
                    className="bg-transparent w-100 focus:outline-none h-8"
                    type="datetime-local"
                    name="startDate"
                  />
                </div>
              </div>
              <div className="">
                <label className="text-md text-white font-medium " htmlFor="">
                  End date
                </label>
                <div className="bg-gray-500 rounded-lg w-full h-8 px-2">
                  <input
                    className="bg-transparent w-100 focus:outline-none h-8"
                    type="datetime-local"
                    name="endDate"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              {setTimeFrameMutation.isLoading ? (
                <LoadingState
                  title={"Setting frame..."}
                  cssClass={"border rounded-full text-white"}
                />
              ) : (
                <SubmitButton
                  title={
                    ticketData.startDate !== "" || ticketData.endDate !== ""
                      ? "Change date frame"
                      : "Set frame"
                  }
                  cssClass={"py-1 px-3 hover:bg-green-600 hover:text-white  "}
                  icon={<RxTimer size={18} />}
                />
              )}
            </div>
          </form>
          {ticketData?.startDate && (
            <div className="flex-row gap-3 p-2 softer-bg rounded-md mt-4 text-white font-medium">
              <div className=" font-medium  text-gray-400">Time frame</div>
              <div className="flex gap-4 items-center mt-2">
                {ticketData.startDate && (
                  <div className="">
                    <h3>Start date</h3>
                    <p> {getFormatedDateTime(ticketData.startDate)}</p>
                  </div>
                )}
                {ticketData.endDate && (
                  <div className="">
                    <h3>End date</h3>
                    <p> {getFormatedDateTime(ticketData.endDate)}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
