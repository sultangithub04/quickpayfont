
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTransactionInfoQuery, useWaletInfoQuery } from "@/redux/features/user/user.api";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { useState } from "react";


export default function UserTransactionhistory() {
    const [currentPage, setCurrentPage] = useState(1);
    // const [limit, setLimit]=useState(10)
    console.log(currentPage);
    const { data } = useTransactionInfoQuery({ page: currentPage })
    // console.log("take data", data);
    const { data: balance, isLoading } = useWaletInfoQuery(undefined)
    if (isLoading) {
        return <LoadingSpinner/>
    }
    const totalPage = data?.meta?.totalPages || 1



    return (
        <div className="w-full max-w-7xl mx-auto px-5">
            <div className="flex justify-between my-8">
                <h1 className="text-xl font-semibold">Transcation History</h1>
                <div className="font-bold text-lg">
                    Avilable Balance: Tk.  {balance?.balance ?? 0}.00
                </div>
            </div>
            <div className="border border-muted-foreground rounded-md">
                <Table>
                    <TableCaption></TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Type</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                            <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.data?.map((item: { type: string, amount: string, status: string, updatedAt: string }) => (
                                <TableRow>
                                    <TableCell className="text-right">{item.type}</TableCell>
                                    <TableCell className="text-right">{item.amount}</TableCell>
                                    <TableCell className="text-right">{item.status}</TableCell>
                                    <TableCell className="text-right">{new Date(item.updatedAt).toLocaleString()}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                {totalPage > 1 && (
                    <div className="flex justify-end">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious onClick={() => setCurrentPage(prev => prev - 1)}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPage }, (_, index) => index + 1).map(page => (
                                    <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                                        <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                                    </PaginationItem>
                                ))
                                }
                                <PaginationItem>
                                    <PaginationNext onClick={() => setCurrentPage(prev => prev + 1)}
                                        className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )
                }
            </div>
        </div>
    );
};