import { DataTable } from "@/components/datatable/DataTable";
import { PageHeader } from "@/components/page-header";
import { columns, Review } from "./columns";
import data from "./data.json";

export default function page() {
  const reviewsData: Review[] = data as Review[];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reviews"
        description="Manage customer reviews and ratings"
      />
      <DataTable columns={columns} data={reviewsData} searchKey="customer" />
    </div>
  );
}
