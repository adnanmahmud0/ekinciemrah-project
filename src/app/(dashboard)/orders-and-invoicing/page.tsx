import { DataTable } from "@/components/datatable/DataTable";
import { PageHeader } from "@/components/page-header";
import { columns } from "./columns";
import data from "./data.json";

export default function page() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Orders & Invoicing Management"
        description="View and manage your orders and invoices"
      />
      <DataTable columns={columns} data={data} searchKey="orderId" />
    </div>
  );
}
