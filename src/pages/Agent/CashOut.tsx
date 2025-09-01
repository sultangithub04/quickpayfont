import { CashoutModal } from "@/components/modules/Agent/CashOutModal";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTransactionInfoQuery, useWaletInfoQuery } from "@/redux/features/user/user.api";
import LoadingSpinner from "@/utils/LoadingSpinner";

export default function CashOut() {
    const { data } = useTransactionInfoQuery(undefined)
    const { data: balance, isLoading } = useWaletInfoQuery(undefined)
    if (isLoading) {
        return <LoadingSpinner />
    }
    return (
        <div className="w-full max-w-7xl mx-auto px-5">
            <div className="flex justify-between my-8">
                <h1 className="text-xl font-semibold">Cash Out</h1>
                <div className="font-bold text-lg">
                    Avilable Balance: Tk.  {balance?.balance ?? 0}.00
                </div>

                <CashoutModal />
            </div>
            <div className="border border-muted-foreground rounded-md">
                <Table>
                    <TableCaption>A list of your recent Cash Out.</TableCaption>
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