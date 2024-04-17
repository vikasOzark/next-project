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
        <Pagination className={"text-gray-400"}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink>{page}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
