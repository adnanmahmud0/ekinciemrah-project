"use client";

import { IconDotsVertical } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { AddCustomerTypeDialog } from "@/components/dialog/add-customer-type-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useApi } from "@/hooks/use-api-data";

export type CustomerTypeRow = {
  _id: string;
  customerType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const CellAction = ({ row }: { row: CustomerTypeRow }) => {
  const [open, setOpen] = useState(false);
  const { del } = useApi("/customer-type", ["customer-types"]);

  const onDelete = async () => {
    try {
      await del(`/customer-type/${row._id}`);
      toast.success("Customer type deleted successfully");
    } catch (error) {
      toast.error("Failed to delete customer type");
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              customer type.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <IconDotsVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <AddCustomerTypeDialog
            customerType={row}
            trigger={
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                Edit
              </DropdownMenuItem>
            }
          />
          <DropdownMenuItem
            onSelect={() => setOpen(true)}
            className="text-red-600 focus:text-red-600"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const columns: ColumnDef<CustomerTypeRow>[] = [
  {
    accessorKey: "customerType",
    header: "Customer Type",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("customerType")}</div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => <CellAction row={row.original} />,
  },
];
