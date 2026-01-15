import { DataTable } from "@/components/datatable/DataTable";
import { PageHeader } from "@/components/page-header";
import { columns } from "./columns";
import data from "./data.json";
import React from "react";

export default function page() {
  return (
    <div>
      <PageHeader
        title="User Management"
        description="Review & manage business user account"
      />
      <div className="mt-4 grid gap-4 rounded-lg bg-muted/40 p-4 md:grid-cols-3 md:p-6">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Review and approve new business user registrations
          </h3>
          <p className="text-sm text-muted-foreground">
            Check pending requests and verify business details before giving
            access.
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Manage user profiles
          </h3>
          <p className="text-sm text-muted-foreground">
            Edit user information, disable risky accounts.
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Monitor credit limits
          </h3>
          <p className="text-sm text-muted-foreground">
            Quickly see each user&apos;s assigned credit limit.
            status.
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable columns={columns} data={data} searchKey="name" />
          </div>
        </div>
      </div>
    </div>
  );
}
