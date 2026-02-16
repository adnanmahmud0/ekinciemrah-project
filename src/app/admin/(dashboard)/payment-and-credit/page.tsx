"use client";

import { DataTable } from "@/components/datatable/DataTable";
import { PageHeader } from "@/components/page-header";
import { columns, PaymentCredit } from "./columns";
import { useApi } from "@/hooks/use-api-data";
import { ApiResponse } from "@/services/auth.service";
import { User } from "../users/columns";

export default function PaymentAndCreditPage() {
  const { data, isLoading, isError } = useApi<ApiResponse<User[]>>("/user", [
    "users",
  ]);

  const paymentData: PaymentCredit[] =
    data?.data
      ?.filter((u) => u.creditInfo && u.creditInfo.creditLimit > 0)
      .map((u) => ({
        id: u._id,
        business: u.businessName,
        owner: u.name,
        email: u.email,
        creditLimit: u.creditInfo!.creditLimit,
        creditUsed: u.creditInfo!.currentOutstanding,
        available: u.creditInfo!.availableCredit,
        outstanding: u.creditInfo!.currentOutstanding,
        status:
          u.creditInfo!.creditStatus === "good"
            ? "Good Standing"
            : "Near Limit",
      })) || [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Payment & Credit Management"
        description="Manage payment terms and credit limits"
      />
      {isLoading ? (
        <div className="py-10 text-center">
          Loading payment & credit data...
        </div>
      ) : isError ? (
        <div className="py-10 text-center text-red-500">
          Failed to load payment & credit data.
        </div>
      ) : (
        <DataTable columns={columns} data={paymentData} searchKey="business" />
      )}
    </div>
  );
}
