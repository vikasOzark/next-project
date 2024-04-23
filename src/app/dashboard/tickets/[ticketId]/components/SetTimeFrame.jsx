import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import React, { useEffect } from "react";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { setTimeFrame } from "@/app/apiFunctions/tickets";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/queryKeys";
import { ButtonComponent } from "@/components/Buttons";
import { VscSymbolConstant } from "react-icons/vsc";

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
    const [date, setDate] = React.useState(undefined);

    useEffect(() => {
        if (Object.keys(dateTime).length > 0) {
            setDate({ ...dateTime });
        }
    }, [ticketData]);

    const { mutate, isLoading } = useMutation({
        mutationFn: setTimeFrame,
        onSuccess: (response) => {
            if (response.success) {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.TICKET_DETAIL, ticketData.id],
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

    const handleSave = (event) => {
        let payload = {};

        if (date?.from) {
            payload.startDate = new Date(date.from).toISOString();
        }

        if (date?.to) {
            payload.endDate = new Date(date.to).toISOString();
        }
        if (Object.keys(payload).length === 0) {
            return;
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
                <ButtonComponent
                    isLoading={isLoading}
                    onClick={handleSave}
                    icon={<VscSymbolConstant size={20} />}
                    title={"Set time"}
                />
            </div>
        </div>
    );
};
