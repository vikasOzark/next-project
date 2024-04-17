import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

// export default function useSetQueryParam() {
//     const searchParams = useSearchParams();
//     return (name, value) => {
//         const params = new URLSearchParams(searchParams?.toString() || "");
//         params.set(name, value);

//         return params.toString();
//     };
// }

export const useSearchQuery = () => {
    const search = useSearchParams();
    const queryParams = new URLSearchParams(search);
    const router = useRouter();

    return (name, query) => {
        queryParams.set(name, query);
        router.push("?" + queryParams.toString());
    };
};

export const useRemoveSearchQuery = () => {
    const search = useSearchParams();
    const queryParams = new URLSearchParams(search);
    const router = useRouter();

    return (name, query) => {
        queryParams.delete(name, query);
        router.push("?" + queryParams.toString());
    };
};
