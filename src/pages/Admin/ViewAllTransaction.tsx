
// import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { useGetAllTransactionQuery } from "@/redux/features/admin/admin.api";
// import { useWaletInfoQuery } from "@/redux/features/user/user.api";
// import LoadingSpinner from "@/utils/LoadingSpinner";
// import { useState } from "react";


// export default function ViewAllTransaction() {
    
//     const [currentPage, setCurrentPage] = useState(1);
//     // const [limit, setLimit]=useState(10)
//     console.log(currentPage);
//     const { data, isLoading } = useGetAllTransactionQuery({ page: currentPage })

//     if (isLoading) {
//         return <LoadingSpinner />
//     }
//     const totalPage = data?.data?.meta?.totalPages || 1



//     return (
//         <div className="w-full max-w-7xl mx-auto px-5">
//             <div className="flex justify-between my-8">
//                 <h1 className="text-xl font-semibold">Transcation History</h1>
//                 <div className="font-bold text-lg">
//                     {/* Avilable Balance: Tk.  {balance?.balance ?? 0}.00 */}
//                 </div>
//             </div>
//             <div className="border border-muted-foreground rounded-md">
//                 <Table>
//                     <TableCaption></TableCaption>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead className="w-[100px]">Catagory</TableHead>
//                             <TableHead className="text-right">Status</TableHead>
//                             <TableHead className="text-right">Amount</TableHead>
//                             <TableHead className="text-right">Sender</TableHead>
//                             <TableHead className="text-right">Reciver</TableHead>
//                             <TableHead className="text-right">Time</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         { !isLoading &&(
//                                    data?.data?.data.map((item: { type: string,sender:{name:string},receiver:{name:string} , amount: string, status: string, updatedAt: string }) => (
//                                 <TableRow>
//                                     <TableCell className="text-right">{item.type}</TableCell>
//                                     <TableCell className="text-right">{item.status}</TableCell>
//                                     <TableCell className="text-right">{item.amount}</TableCell>
//                                     <TableCell className="text-right">{item?.sender?.name}</TableCell>
//                                     <TableCell className="text-right">{item?.receiver?.name}</TableCell>
//                                     <TableCell className="text-right">{new Date(item.updatedAt).toLocaleString()}</TableCell>
//                                 </TableRow>
//                             ))
//                         )
                     
//                         }
//                     </TableBody>
//                 </Table>
//                 {totalPage > 1 && (
//                     <div className="flex justify-end">
//                         <Pagination>
//                             <PaginationContent>
//                                 <PaginationItem>
//                                     <PaginationPrevious onClick={() => setCurrentPage(prev => prev - 1)}
//                                         className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
//                                     />
//                                 </PaginationItem>

//                                 {Array.from({ length: totalPage }, (_, index) => index + 1).map(page => (
//                                     <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
//                                         <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
//                                     </PaginationItem>
//                                 ))
//                                 }
//                                 <PaginationItem>
//                                     <PaginationNext onClick={() => setCurrentPage(prev => prev + 1)}
//                                         className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
//                                     />
//                                 </PaginationItem>
//                             </PaginationContent>
//                         </Pagination>
//                     </div>
//                 )
//                 }
//             </div>
//         </div>
//     );
// };

import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGetAllTransactionQuery } from "@/redux/features/admin/admin.api";
import LoadingSpinner from "@/utils/LoadingSpinner";

export default function ViewAllTransaction() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const { data, isLoading } = useGetAllTransactionQuery({
    page: currentPage,
    search,
    category,
    status,
    minAmount,
    maxAmount,
  });


  if (isLoading) return <LoadingSpinner />;

  const totalPage = data?.data?.meta?.totalPages || 1;

  const handleFilterReset = () => {
    setSearch("");
    setCategory("");
    setStatus("");
    setMinAmount("");
    setMaxAmount("");
    setCurrentPage(1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Transaction History</h1>
      </div>

      {/* 🔍 Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 border p-4 rounded-lg shadow-sm">
        <Input
          placeholder="Search by sender/receiver"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash_in">Cash In</SelectItem>
            <SelectItem value="withdraw">Cash Out</SelectItem>
            <SelectItem value="send">Send Money</SelectItem>
            <SelectItem value="add_money">Add Money</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setStatus} value={status}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Success</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
        />

        <div className="col-span-1 flex gap-2 mt-2 md:mt-0">
          <Button  onClick={handleFilterReset}>
            Reset
          </Button>
        </div>
      </div>

      {/* 📊 Transaction Table */}
      <div className="border border-muted-foreground rounded-md">
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Sender</TableHead>
              <TableHead className="text-right">Receiver</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              data?.data?.data?.map(
                (item: {
                  type: string;
                  sender: { name: string };
                  receiver: { name: string };
                  amount: string;
                  status: string;
                  updatedAt: string;
                }) => (
                  <TableRow key={item.updatedAt}>
                    <TableCell>{item.type}</TableCell>
                    <TableCell className="text-right">{item.status}</TableCell>
                    <TableCell className="text-right">{item.amount}</TableCell>
                    <TableCell className="text-right">{item?.sender?.name}</TableCell>
                    <TableCell className="text-right">{item?.receiver?.name}</TableCell>
                    <TableCell className="text-right">
                      {new Date(item.updatedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>

        {/* 📄 Pagination */}
        {totalPage > 1 && (
          <div className="flex justify-end mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
                  <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                    <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
