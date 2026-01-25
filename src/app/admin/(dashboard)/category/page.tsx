"use client";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/datatable/DataTable";
import { AddCategoryDialog } from "@/components/dialog/add-category-dialog";
import { columns, Category } from "./columns";
import { useEffect, useState } from "react";
import { privateApi } from "@/lib/api-client";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await privateApi.get("/category");
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pr-6">
        <PageHeader
          title="Category Management"
          description="Manage product categories"
        />
        <div className="flex gap-2 ml-6 md:ml-0">
          <AddCategoryDialog />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <DataTable
                columns={columns}
                data={categories}
                searchKey="categoryName"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

