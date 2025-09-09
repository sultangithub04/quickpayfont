
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAgentTransactioHistoryQuery } from "@/redux/features/agent/agent.api";
import { useWaletInfoQuery } from "@/redux/features/user/user.api";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { useState } from "react";


export default function AgentTransactionhistory() {
    const [currentPage, setCurrentPage] = useState(1);
    // const [limit, setLimit]=useState(10)
    console.log(currentPage);
    const { data } = useAgentTransactioHistoryQuery({ page: currentPage })
    console.log("take data", data);
    const { data: balance, isLoading } = useWaletInfoQuery(undefined)
    if (isLoading) {
        return <LoadingSpinner />
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
                            <TableHead className="w-[100px]">Date</TableHead>
                            {/* <TableHead className="text-right">Naration</TableHead> */}
                            <TableHead className="text-right">Narration</TableHead>
                            <TableHead className="text-right">Transaction Type</TableHead>
                            <TableHead className="text-right">Debit</TableHead>
                            <TableHead className="text-right">Credit</TableHead>
                            <TableHead className="text-right">Balance</TableHead>
                            {/* <TableHead className="w-[100px]">Type</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                            <TableHead className="text-right">Time</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.data?.data?.map((item: {credit: string, debit:string, type: string, amount: string, status: string, date: string, receiverWallet:string, balance:number }) => (
                                <TableRow>
                                    <TableCell className="">{new Date(item.date).toLocaleString()}</TableCell>
                                    <TableCell className="text-right">{item.type}</TableCell>
                                    <TableCell className="text-right">
                                        {(item.type === "withdraw" || item.type === "send"|| item.type==="cash_out") ? "C" : "D"}
                                    </TableCell>
                                    {/* <TableCell className="text-right">{item.amount}</TableCell> */}
                                    <TableCell className="text-right">
                                        {(item.type === "withdraw" || item.type === "send"|| item.type==="cash_out" || item.type==="cash_in") ? item.debit : 0}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        {(item.type === "withdraw" || item.type === "send"|| item.type==="cash_in") ? 0 : item.credit}
                                    </TableCell>
                                    <TableCell className="text-right">{item?.balance}</TableCell>
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