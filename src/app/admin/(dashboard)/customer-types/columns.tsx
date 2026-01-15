"use client";

import { IconDotsVertical } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";

import { AddCustomerTypeDialog } from "@/components/dialog/add-customer-type-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type CustomerTypeRow = {
  id: number;
  name: string;
};

export const columns: ColumnDef<CustomerTypeRow>[] = [
  {
    accessorKey: "name",
    header: "Customer Type",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const customerType = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AddCustomerTypeDialog
              customerType={customerType}
              trigger={
                <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                  Edit
                </DropdownMenuItem>
              }
            />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

