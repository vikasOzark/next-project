import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

export default function TableComponent({ tableCaption, headers, tableData }) {
    const id = () => uuidv4();
    return (
        <Table className="text-lg text-gray-300">
            <TableCaption>{tableCaption}</TableCaption>
            <TableHeader>
                <TableRow className="border-gray-700">
                    {headers.map((header) => (
                        <TableHead key={header} className=" text-white">
                            {header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {tableData.map((row) => (
                    <TableRow
                        className="text-white border-none mb-1 !rounded-lg hover:bg-[#34363a] font-bold"
                        key={row.id}
                    >
                        {row.columns.map((data) => (
                            <TableCell
                                key={id()}
                                className={cn("font-medium", data.className)}
                            >
                                {data.content}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
