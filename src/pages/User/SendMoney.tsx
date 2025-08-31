import { SendMoneyModal } from "@/components/modules/User/AddMone/SendMoneyModal";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTransactionInfoQuery, useWaletInfoQuery } from "@/redux/features/user/user.api";
import LoadingSpinner from "@/utils/LoadingSpinner";

export default function SendMoney() {
    const { data } = useTransactionInfoQuery(undefined)
    const { data: balance, isLoading } = useWaletInfoQuery(undefined)
    if (isLoading) {
        return <LoadingSpinner/>
    }

    console.log(data);
    return (
        <div className="w-full max-w-7xl mx-auto px-5">
            <div className="flex justify-between my-8">
                <h1 className="text-xl font-semibold">Top Up</h1>
                <div className="font-bold text-lg">
                    Avilable Balance: Tk.  {balance?.balance ?? 0}.00 
                </div>
                <SendMoneyModal/>

            </div>
            <div className="border border-muted-foreground rounded-md">
                <Table>
                    <TableCaption>your recent transactions.</TableCaption>
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
            </div>
        </div>
    );
};