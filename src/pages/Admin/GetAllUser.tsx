import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDeleteUserMutation, useGetAllUserQuery,  } from "@/redux/features/admin/admin.api";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function GetAllUser() {
    const { data, isLoading } = useGetAllUserQuery(undefined);

    const [deleteUser] = useDeleteUserMutation();
    // const [updateUserStatus] = useUpdateUserStatusMutation();

    const handleDeleteUser = async (userId: string) => {
        const toastId = toast.loading("Deleting...");
        try {
            const res = await deleteUser(userId).unwrap();
            toast.success("Removed", { id: toastId });
        } catch (error) {
            toast.error("Failed to delete", { id: toastId });
        }
    };
    const handleStatusChange = async (userId: string, newStatus: string) => {
        console.log(userId, newStatus);
        const toastId = toast.loading("Updating status...");
        try {
            // const res = await updateUserStatus({ userId, isActive: newStatus }).unwrap();
            toast.success("Status updated", { id: toastId });
        } catch (error) {
            toast.error("Failed to update", { id: toastId });
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-5">
            <div className="flex justify-between my-8">
                <h1 className="text-xl font-semibold">All Users</h1>
                <div className="font-bold text-lg">
                    {/* Available Balance: Tk. {balance?.balance ?? 0}.00 */}
                </div>
            </div>
            <div className="border border-muted-foreground rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>SL</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Verification</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.users?.map(
                            (
                                item: {
                                    _id: string;
                                    name: string;
                                    phone: string;
                                    email: string;
                                    role: string;
                                    isActive: string;
                                    isVerify: boolean;
                                },
                                index: number
                            ) => (
                                <TableRow key={item._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.phone}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.role}</TableCell>

                                    {/* ✅ Dropdown for status */}
                                    <TableCell>
                                        <Select
                                            defaultValue={item?.isActive}
                                            onValueChange={(value) => handleStatusChange(item._id, value)}
                                        >
                                            <SelectTrigger className="w-[120px]">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ACTIVE">Active</SelectItem>
                                                <SelectItem value="INACTIVE">Inactive</SelectItem>
                                                <SelectItem value="BLOCK">Blocked</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>

                                    <TableCell>{item.isVerify ? "Verified" : "Pending"}</TableCell>
                                    <TableCell>
                                        <DeleteConfirmation onConfirm={() => handleDeleteUser(item._id)}>
                                            <Button size="sm" variant="destructive">
                                                <Trash2 />
                                            </Button>
                                        </DeleteConfirmation>
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
