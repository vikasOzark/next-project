import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import React from "react";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { setTimeFrame } from "@/app/apiFunctions/tickets";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SetTimeFrame = ({ ticketData }) => {
    const startDateObject = new Date(ticketData.startDate);
    const start_dateYear = startDateObject.getFullYear();
    const start_month = startDateObject.getMonth() + 1;
    const start_day = startDateObject.getDate();

    const endDateObject = new Date(ticketData.endDate);
    const end_dateYear = endDateObject.getFullYear();
    const end_month = endDateObject.getMonth() + 1;
    const end_day = endDateObject.getDate();

    const dateTime = {};
    if (ticketData.startDate) {
        dateTime.from = new Date(start_dateYear, start_month, start_day);
    }

    if (ticketData.endDate) {
        dateTime.to = new Date(end_dateYear, end_month, end_day);
    }

    const queryClient = useQueryClient();
    const [date, setDate] = React.useState(() =>
        Object.keys(dateTime).length > 0 ? dateTime : undefined
    );

    const { mutate } = useMutation({
        mutationFn: setTimeFrame,
        onSuccess: (response) => {
            if (response.success) {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.TICKET_LIST, ticketData.id],
                });
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleSave = () => {
        let payload = {};

        if (date.from) {
            payload.startDate = new Date(
                event.target.startDate.value
            ).toISOString();
        }

        if (date.to) {
            payload.endDate = new Date(
                event.target.endDate.value
            ).toISOString();
        }

        mutate({ formData: payload, ticketId: ticketData.id });
    };

    return (
        <div className="">
            <DatePickerWithRange
                className={"hover:temp-bg rounded-lg"}
                date={date}
                setDate={setDate}
            />
            <div className="mt-2 flex items-center justify-end">
                <Button className={"hover:bg-gray-700 rounded-full"}>
                    Save
                </Button>
            </div>
        </div>
    );
};
