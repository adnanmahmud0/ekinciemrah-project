import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/datatable/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddProductDialog } from "@/components/dialog/add-product-dialog";
import { columns } from "./columns";
import data from "./data.json";

export default function ProductPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pr-6">
        <PageHeader
          title="Product Management"
          description="Manage products, pricing, and stock"
        />
        <div className="flex gap-2 ml-6 md:ml-0">
          <AddProductDialog />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable
              columns={columns}
              data={data}
              searchKey="product"
              toolbarAction={
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                  </SelectContent>
                </Select>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
