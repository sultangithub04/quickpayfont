import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
    useAdminVerifyMutation,
    useChangeStatusMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
  // useUpdateUserStatusMutation,
  // useUpdateUserVerificationMutation,
} from "@/redux/features/admin/admin.api";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { Eye, Trash2, ShieldCheck, ShieldX } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


export default function GetAllUser() {
  const { data, isLoading } = useGetAllUserQuery(undefined);

  const [deleteUser] = useDeleteUserMutation();
  const [adminVerify] = useAdminVerifyMutation();
  const [changeStatus] = useChangeStatusMutation();

  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleDeleteUser = async (userId: string) => {
    const toastId = toast.loading("Deleting...");
    try {
      await deleteUser(userId).unwrap();
      toast.success("Removed", { id: toastId });
    } catch (error) {
      toast.error("Failed to delete", { id: toastId });
      console.log(error);
    }
  };

const handleChangeStatus = async (userId: string, newStatus: string) => {
  const toastId = toast.loading("Updating status...");
  try {
    await changeStatus({userId, newStatus }).unwrap();
    toast.success(`Status changed to ${newStatus}`, { id: toastId });
  } catch (error) {
    toast.error("Failed to update", { id: toastId });
    console.error(error);
  }
};
  const handleVerificationChange = async (userId: string) => {
    const toastId = toast.loading("Updating verification...");
    console.log(userId);

    try {
      await adminVerify(userId).unwrap();
      toast.success("User verified successfully", { id: toastId }
      );
    } catch (error) {
      toast.error("Failed to update verification", { id: toastId });
      console.log(error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Manage Users</h1>
      </div>

      <div className="border border-muted-foreground rounded-md overflow-x-auto">
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
                      onValueChange={(value) =>
                        handleChangeStatus(item.phone, value)
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                        <SelectItem value="BLOCKED">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* ✅ Verification Action */}
                  <TableCell>
                    {item.isVerify ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVerificationChange(item.phone)}
                      >
                        <ShieldCheck className="h-4 w-4 mr-1" /> Verified
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleVerificationChange(item.phone)}
                      >
                        <ShieldX className="h-4 w-4 mr-1" /> Pending
                      </Button>
                    )}
                  </TableCell>

                  {/* ✅ Actions */}
                  <TableCell className="flex gap-2">
                    {/* 👁️ View Button */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedUser(item)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    {/* 🗑️ Delete Button */}
                    <DeleteConfirmation
                      onConfirm={() => handleDeleteUser(item._id)}
                    >
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>

      {/* 👁️ View User Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.phone}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
              <p>
                <strong>Status:</strong> {selectedUser.isActive}
              </p>
              <p>
                <strong>Verification:</strong>{" "}
                {selectedUser.isVerify ? "Verified" : "Pending"}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
