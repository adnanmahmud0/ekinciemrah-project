import { DataTable } from "@/components/datatable/DataTable";
import { AddCustomerTypeDialog } from "@/components/dialog/add-customer-type-dialog";
import { PageHeader } from "@/components/page-header";
import data from "./data.json";
import { columns, type CustomerTypeRow } from "./columns";

export default function CustomerTypesPage() {
  const customerTypes: CustomerTypeRow[] = data as CustomerTypeRow[];

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
            <DataTable
              columns={columns}
              data={customerTypes}
              searchKey="name"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

