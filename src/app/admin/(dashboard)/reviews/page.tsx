"use client";

import { DataTable } from "@/components/datatable/DataTable";
import { PageHeader } from "@/components/page-header";
import { columns, Review } from "./columns";
import { useEffect, useState } from "react";
import { privateApi } from "@/lib/api-client";

export default function page() {
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await privateApi.get("/review");
        if (res.data.success) {
          setReviewsData(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reviews"
        description="Manage customer reviews and ratings"
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={columns} data={reviewsData} searchKey="customer" />
      )}
    </div>
  );
}
