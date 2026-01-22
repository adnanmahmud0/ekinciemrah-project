"use client";

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
import { useApi } from "@/hooks/use-api-data";
import { ProductResponse, Product } from "@/types/product";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // Construct the API URL based on search
  const apiUrl = debouncedSearch
    ? `/product&catelog?search=${debouncedSearch}`
    : "/product&catelog";

  const { data: response, isLoading } = useApi<ProductResponse>(apiUrl, [
    "products",
    debouncedSearch,
  ]);

  const products = response?.data?.data || [];

  // The search API returns data in a slightly different structure based on the user's example
  // List: { data: { meta: {...}, data: [...] } }
  // Search: { data: { meta: {...}, data: [...] } }
  // It seems consistent actually.

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
              data={products}
              searchKey="productName"
              searchValue={search}
              onSearchValueChange={setSearch}
              initialColumnVisibility={{
                basePrice: true,
                categoryPrice: true,
                priceTier: false,
              }}
              toolbarAction={(table) => (
                <Select
                  defaultValue="Category A"
                  onValueChange={(value) => {
                    table.getColumn("priceTier")?.setFilterValue(value);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category A" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Category A">Category A</SelectItem>
                    <SelectItem value="Category B">Category B</SelectItem>
                    <SelectItem value="Category C">Category C</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
