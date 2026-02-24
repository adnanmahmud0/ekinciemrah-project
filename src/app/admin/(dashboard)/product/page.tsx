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
import { ProductResponse } from "@/types/product";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { keepPreviousData } from "@tanstack/react-query";

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Construct the API URL based on search
  const apiUrl = debouncedSearch
    ? `/product&catelog?search=${debouncedSearch}&page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`
    : `/product&catelog?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`;

  const { data: response } = useApi<ProductResponse>(
    apiUrl,
    ["products", debouncedSearch, pagination.pageIndex, pagination.pageSize],
    { placeholderData: keepPreviousData },
  );

  const products = response?.data?.data || [];
  const meta = response?.data?.meta;
  const pageCount =
    meta && meta.total > 0 && meta.limit > 0
      ? Math.ceil(meta.total / meta.limit)
      : -1;
  const totalRows = meta?.total ?? 0;

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
              pageCount={pageCount}
              rowCount={totalRows}
              pagination={pagination}
              onPaginationChange={setPagination}
              searchKey="productName"
              searchValue={search}
              onSearchValueChange={setSearch}
              searchPlaceholder="Search by product name"
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
                  <SelectTrigger className="w-45">
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
