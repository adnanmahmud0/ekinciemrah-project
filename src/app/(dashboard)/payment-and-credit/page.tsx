import { DataTable } from "@/components/datatable/DataTable";
import { PageHeader } from "@/components/page-header";
import { columns, PaymentCredit } from "./columns";
import data from "./data.json";

export default function page() {
  const paymentData: PaymentCredit[] = data as PaymentCredit[];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Payment & Credit Management"
        description="Manage payment terms and credit limits"
      />
      <DataTable columns={columns} data={paymentData} searchKey="business" />
    </div>
  );
}
