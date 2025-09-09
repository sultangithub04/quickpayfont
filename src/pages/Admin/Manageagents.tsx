
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useGetAllAgentsQuery, useUpdateAgentStatusMutation } from "@/redux/features/admin/admin.api";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { toast } from "sonner";
import { useChangeStatusMutation, useGetAllAgentQuery } from "@/redux/features/admin/admin.api";

export default function ManageAgents() {
    const { data, isLoading } = useGetAllAgentQuery(undefined);
  const [changeStatus] = useChangeStatusMutation();
    console.log(data?.data?.users);

    const handleStatusChange = async (userId: string, newStatus: string) => {
        console.log(userId, newStatus);
        const toastId = toast.loading("Updating...");
        try {
              const res = await changeStatus({ userId, newStatus }).unwrap();
            if (res.success) {
                toast.success("Status updated successfully!", { id: toastId });
            } else {
                toast.error("Failed to update status", { id: toastId });
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating agent status", { id: toastId });
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full max-w-7xl mx-auto px-5">
            <h1 className="text-xl font-semibold my-8">Manage Agents</h1>

            <div className="border border-muted-foreground rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>SL</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead >Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.users?.map(
                            (
                                agent: {
                                    _id: string;
                                    name: string;
                                    phone: string;
                                    email: string;
                                    status: string;
                                    isActive: string;
                                },
                                index: number
                            ) => (
                                <TableRow key={agent._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{agent.name}</TableCell>
                                    <TableCell>{agent.phone}</TableCell>
                                    <TableCell>{agent.email}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded text-sm ${agent.status === "APPROVED"
                                                ? "bg-green-100 text-green-700"
                                                : agent.status === "SUSPENDED"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {agent?.isActive}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Select
                                            defaultValue={agent?.isActive}
                                            onValueChange={(val) => handleStatusChange(agent.phone, val)}
                                        >
                                            <SelectTrigger className="w-[140px]">
                                                <SelectValue placeholder="Change Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                                                <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                                                <SelectItem value="BLOCK">BLOCK</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
