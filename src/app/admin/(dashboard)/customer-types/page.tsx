"use client";

import { DataTable } from "@/components/datatable/DataTable";
import { AddCustomerTypeDialog } from "@/components/dialog/add-customer-type-dialog";
import { PageHeader } from "@/components/page-header";
import { columns } from "./columns";
import { useApi } from "@/hooks/use-api-data";
import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerTypesPage() {
  const { data, isLoading } = useApi("/customer-type", ["customer-types"]);

  const customerTypes = data?.data || [];

  // Sort customer types alphabetically
  const sortedCustomerTypes = [...customerTypes].sort((a, b) =>
    a.customerType.localeCompare(b.customerType),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pr-6">
        <PageHeader
          title="Customer Types"
          description="Manage different customer business types"
        />
        <div className="flex gap-2 ml-6 md:ml-0">
          <AddCustomerTypeDialog />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              <DataTable columns={columns} data={sortedCustomerTypes} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
