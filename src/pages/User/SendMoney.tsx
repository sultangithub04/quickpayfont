import { SendMoneyModal } from "@/components/modules/User/AddMone/SendMoneyModal";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTransactionInfoQuery, useWaletInfoQuery } from "@/redux/features/user/user.api";
import LoadingSpinner from "@/utils/LoadingSpinner";

export default function SendMoney() {
    const { data } = useTransactionInfoQuery(undefined)
    const { data: balance, isLoading } = useWaletInfoQuery(undefined)
    if (isLoading) {
        return <LoadingSpinner />
    }

    console.log(data);
    return (
        <div className="w-full max-w-7xl mx-auto px-5">
            <div className="flex justify-between my-8">
                <h1 className="text-xl font-semibold">Top Up</h1>
                <div className="font-bold text-lg">
                    Avilable Balance: Tk.  {balance?.balance ?? 0}.00
                </div>
                <SendMoneyModal />

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
                            data?.data?.map((item: { type: string, debit: string, credit: string, amount: string, status: string, date: string, receiverWallet: string, balance: number }) => (
                                <TableRow>
                                    <TableCell className="">{new Date(item.date).toLocaleString()}</TableCell>
                                    <TableCell className="text-right">{item.type}</TableCell>
                                    <TableCell className="text-right">
                                        {(item.type === "withdraw" || item.type === "send" || item.type === "cash_out") ? "D" : "C"}
                                    </TableCell>
                                    {/* <TableCell className="text-right">{item.amount}</TableCell> */}
                                    <TableCell className="text-right">
                                        {(item.type === "withdraw" || item.type === "send" || item.type === "cash_out") ? item.debit : 0}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        {(item.type === "withdraw" || item.type === "send") ? 0 : item.credit}
                                    </TableCell>
                                    <TableCell className="text-right">{item?.balance}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

            </div>
        </div>
    );
};