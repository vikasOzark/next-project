import { useQuery } from "react-query";

export const useGetDepartments = () => {
    return useQuery(
        "departments",
        async () => {
            const response = await fetch("/api/departments");
            const json_response = await response.json();
            return json_response;
        },
        { refetchOnMount: false, refetchOnWindowFocus: false }
    );
};
