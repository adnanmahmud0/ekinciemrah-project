"use client";

import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { SectionCards } from "@/components/dashboard/section-cards";
import { columns } from "@/components/datatable/columns";
import { DataTable } from "@/components/datatable/DataTable";
import { PageHeader } from "@/components/page-header";
import data from "./data.json";

export default function Page() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Reporting & Analytics"
        description="Overview of user approvals, orders, and credit usage."
      />

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable columns={columns} data={data} searchKey="name" />
          </div>
        </div>
      </div>
    </div>
  );
}
