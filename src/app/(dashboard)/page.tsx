import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { SectionCards } from "@/components/dashboard/section-cards";

// app/page.tsx
export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">User Management</h1>
      <p className="text-muted-foreground">
        Review & manage business user account
      </p>

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            {/* <DataTable data={data} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
