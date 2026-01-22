"use client";

import { Table } from "@tanstack/react-table";
import { IconX } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey?: string;
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
  action?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchValue,
  onSearchValueChange,
  action,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {searchKey && (
            <Input
              placeholder="Filter..."
              value={
                onSearchValueChange !== undefined
                  ? searchValue
                  : ((table.getColumn(searchKey)?.getFilterValue() as string) ??
                    "")
              }
              onChange={(event) =>
                onSearchValueChange !== undefined
                  ? onSearchValueChange(event.target.value)
                  : table
                      .getColumn(searchKey)
                      ?.setFilterValue(event.target.value)
              }
              className="h-10 w-37.5 lg:w-96"
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <IconX className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        {action}
      </div>
    </div>
  );
}
