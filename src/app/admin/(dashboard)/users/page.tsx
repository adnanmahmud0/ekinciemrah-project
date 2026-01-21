"use client";

import { DataTable } from "@/components/datatable/DataTable";
import { PageHeader } from "@/components/page-header";
import { columns, User } from "./columns";
import React from "react";
import { useApi } from "@/hooks/use-api-data";
import { ApiResponse } from "@/services/auth.service";
import { Input } from "@/components/ui/input";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useApi<ApiResponse<User[]>>(
    debouncedSearch ? `/user?search=${debouncedSearch}` : "/user",
    ["users", debouncedSearch],
  );

  // Map _id to id for DataTable compatibility
  const users = React.useMemo(() => {
    return apiResponse?.data?.map((u) => ({ ...u, id: u._id })) || [];
  }, [apiResponse]);

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
            Quickly see each user&apos;s assigned credit limit. status.
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex items-center px-4 lg:px-6">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full md:w-[300px]"
              />
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                Loading users...
              </div>
            ) : isError ? (
              <div className="text-red-500 py-10">
                Failed to load users. Please try again.
              </div>
            ) : (
              <DataTable columns={columns} data={users || []} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
