/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
"use client";

import { useState } from "react";
import { IconDotsVertical } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";
import { UserDetailsDialog } from "@/components/dialog/user-details-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApi } from "@/hooks/use-api-data";
import { toast } from "sonner";

// Define the User interface based on API response
export interface User {
  _id: string;
  id: string; // Mapped from _id for DataTable compatibility
  name: string;
  businessName: string;
  businessType: string;
  role: string;
  email: string;
  contact: string;
  businessAddress: string;
  image: string;
  status: string;
  customerType: string;
  isActive: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  // Optional fields that might not be in API but used in UI
  credit_limit?: string;
}

interface ChangeCustomerTypeDialogProps {
  user: User;
  trigger: React.ReactNode;
}

function ChangeCustomerTypeDialog({
  user,
  trigger,
}: ChangeCustomerTypeDialogProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(user.customerType ?? "");
  const { patch } = useApi("/user", ["users"]);

  // Fetch customer types from API
  const { data: customerTypesData } = useApi("/customer-type", [
    "customer-types",
  ]);

  // Extract the array from the response structure
  const customerTypes =
    (customerTypesData?.data as { _id: string; customerType: string }[]) ?? [];

  // Sort customer types alphabetically
  const sortedCustomerTypes = [...customerTypes].sort((a, b) =>
    a.customerType.localeCompare(b.customerType),
  );

  function handleSave() {
    const targetUrl = `/user/${user._id.trim()}/status`;
    console.log(
      "Updating customer type for user:",
      user._id,
      "Target URL:",
      targetUrl,
    );
    patch(
      targetUrl,
      { customerType: value },
      {
        onSuccess: () => {
          toast.success("Customer type updated successfully");
          setOpen(false);
        },
        onError: (err) => {
          console.error("Customer type update error:", err);
          toast.error("Failed to update customer type");
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Change customer type</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select customer type" />
            </SelectTrigger>
            <SelectContent>
              {sortedCustomerTypes.map((type) => (
                <SelectItem
                  key={type._id}
                  value={type.customerType.toLowerCase()}
                >
                  {type.customerType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} disabled={!value}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface AssignCreditLimitDialogProps {
  user: User;
  trigger: React.ReactNode;
}

function AssignCreditLimitDialog({
  user,
  trigger,
}: AssignCreditLimitDialogProps) {
  const [open, setOpen] = useState(false);
  const [creditLimit, setCreditLimit] = useState("");
  const [reason, setReason] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const { patch } = useApi("/user", ["users"]);

  function handleSave() {
    const targetUrl = `/user/${user._id.trim()}/credit-limit`;
    patch(
      targetUrl,
      {
        creditLimit: creditLimit ? Number(creditLimit) : null,
        reason,
        expiryDate,
      },
      {
        onSuccess: () => {
          toast.success("Credit limit assigned successfully");
          setOpen(false);
        },
        onError: (err) => {
          console.error("Credit limit assign error:", err);
          toast.error("Failed to assign credit limit");
        },
      },
    );
  }

  const isSaveDisabled =
    !creditLimit || Number.isNaN(Number(creditLimit)) || !reason || !expiryDate;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Assign credit limit</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor={`credit-limit-${user._id}`}>Credit limit</Label>
            <Input
              id={`credit-limit-${user._id}`}
              type="number"
              placeholder="10000"
              value={creditLimit}
              onChange={(e) => setCreditLimit(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`reason-${user._id}`}>Reason</Label>
            <Input
              id={`reason-${user._id}`}
              placeholder="Initial credit limit for wholesale customer"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`expiry-date-${user._id}`}>Expiry date</Label>
            <Input
              id={`expiry-date-${user._id}`}
              type="date"
              placeholder="2025-12-31"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} disabled={isSaveDisabled}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const UserActions = ({ user }: { user: User }) => {
  const { patch } = useApi("/user", ["users"]);

  const handleStatusUpdate = (status: string) => {
    const targetUrl = `/user/${user._id}/status`;
    console.log(
      "Updating status for user:",
      user._id,
      "Target URL:",
      targetUrl,
    );
    patch(
      targetUrl,
      { status },
      {
        onSuccess: () => {
          toast.success(`User status updated to ${status}`);
        },
        onError: (error) => {
          console.error("Status update error:", error);
          toast.error("Failed to update user status");
        },
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <IconDotsVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UserDetailsDialog
          user={user as any} // Temporary cast until UserDetailsDialog is updated
          trigger={
            <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
              View
            </DropdownMenuItem>
          }
        />
        {/* Toggle between Approve/Reject */}
        {user.status === "approve" || user.status === "active" ? (
          <DropdownMenuItem onClick={() => handleStatusUpdate("reject")}>
            Reject
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => handleStatusUpdate("approve")}>
            Approve
          </DropdownMenuItem>
        )}

        {/* Toggle between Block/Unblock */}
        {user.status === "blocked" || user.status === "block" ? (
          <DropdownMenuItem onClick={() => handleStatusUpdate("approve")}>
            Unblock
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => handleStatusUpdate("block")}>
            Block
          </DropdownMenuItem>
        )}

        <ChangeCustomerTypeDialog
          user={user}
          trigger={
            <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
              Change customer type
            </DropdownMenuItem>
          }
        />
        <AssignCreditLimitDialog
          user={user}
          trigger={
            <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
              Assign credit limit
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "businessName",
    header: "Business",
  },
  {
    accessorKey: "customerType",
    header: "Customer Type",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("customerType")}</span>
    ),
  },
  {
    accessorKey: "credit_limit",
    header: "Credit limit",
    cell: ({ row }) => row.getValue("credit_limit") || "N/A",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = (row.getValue("status") as string).toLowerCase();
      return (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={
              status === "pending"
                ? "border-yellow-500 text-yellow-500 bg-yellow-500/10"
                : status === "approve" || status === "active"
                  ? "border-green-500 text-green-500 bg-green-500/10"
                  : status === "reject" ||
                      status === "rejected" ||
                      status === "blocked" ||
                      status === "block"
                    ? "border-red-500 text-red-500 bg-red-500/10"
                    : ""
            }
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
