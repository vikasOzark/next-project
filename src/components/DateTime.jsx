import handleTimeFormat from "@/utils/dateTimeFormat";

export default function DateTime({ data }) {
    const dateTime = (date) => {
        return handleTimeFormat(date, {
            isFormated: true,
            dateTime: true,
        });
    };
    return;
}
