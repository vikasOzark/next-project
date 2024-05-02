import {
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Pagination } from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export default function CustomPagination() {
    const searchParam = useSearchParams();
    const page = searchParam.get("page");
    return (
        <Pagination className={"text-gray-400 text-lg"}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className={"hover:text-white"} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink>{page}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext className={"hover:text-white"} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
