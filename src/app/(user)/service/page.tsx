import { Suspense } from "react";
import ServicePage from "@/components/user/service/ServicePage";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading services...</div>}>
      <ServicePage />
    </Suspense>
  );
}
