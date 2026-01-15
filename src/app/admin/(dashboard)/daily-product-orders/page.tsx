"use client";

import { useState } from "react";

import { DataTable } from "@/components/datatable/DataTable";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import data from "./data.json";
import { columns, type DailyProductRow } from "./columns";

export default function DailyProductOrdersPage() {
  const [selectedDate, setSelectedDate] = useState("");

  const dailyProductData: DailyProductRow[] = (
    data as DailyProductRow[]
  ).filter((row) => (selectedDate ? row.date === selectedDate : true));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Daily Product Orders"
        description="See total orders and quantity per product for a selected date."
      />

      <div className="flex flex-col gap-4">
        <DataTable
          columns={columns}
          data={dailyProductData}
          searchKey="product"
          toolbarAction={
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Filter by date
              </span>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-9 w-[180px]"
              />
            </div>
          }
        />
      </div>
    </div>
  );
}
