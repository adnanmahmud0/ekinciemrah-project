/* eslint-disable react-hooks/immutability */
"use client";

import { useState } from "react";

import { IconDotsVertical } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";

import customerTypesData from "@/app/admin/(dashboard)/customer-types/data.json";
import { UserDetailsDialog } from "@/components/dialog/user-details-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

interface ChangeCustomerTypeDialogProps {
  user: UserRow;
  trigger: React.ReactNode;
}

function ChangeCustomerTypeDialog({
  user,
  trigger,
}: ChangeCustomerTypeDialogProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(user.customerType ?? "");

  const customerTypes =
    (customerTypesData as { id: number; name: string }[]) ?? [];

  function handleSave() {
    (user as UserRow).customerType = value;
    setOpen(false);
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
              {customerTypes.map((type) => (
                <SelectItem key={type.id} value={type.name}>
                  {type.name}
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

export type UserRow = {
  id: number;
  name: string;
  email: string;
  business: string;
  credit_limit: string;
  status: string;
  customerType?: string;
};

export const columns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "business",
    header: "Business",
  },
  {
    accessorKey: "customerType",
    header: "Customer Type",
  },
  {
    accessorKey: "credit_limit",
    header: "Credit limit",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={
              status === "Pending"
                ? "border-green-500 text-green-500 bg-green-500/10"
                : status === "Verified"
                ? "border-blue-500 text-blue-500 bg-blue-500/10"
                : status === "Rejected"
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
    cell: ({ row }) => {
      const user = row.original;
      const status = user.status;

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
              user={user}
              trigger={
                <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                  View
                </DropdownMenuItem>
              }
            />
            <DropdownMenuItem>Approve</DropdownMenuItem>
            <DropdownMenuItem>Reject</DropdownMenuItem>
            <DropdownMenuItem>Block</DropdownMenuItem>
            <DropdownMenuItem>Unblock</DropdownMenuItem>
            <ChangeCustomerTypeDialog
              user={user}
              trigger={
                <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                  Change customer type
                </DropdownMenuItem>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
