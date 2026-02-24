"use client";

import { DataTable } from "@/components/datatable/DataTable";
import { PageHeader } from "@/components/page-header";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/use-api-data";
import type { ApiResponse } from "@/services/auth.service";
import type { Order } from "@/components/dialog/order-details-dialog";
import { useMemo, useState } from "react";

interface BackendOrderUser {
  _id: string;
  name?: string;
  businessName?: string;
  email?: string;
  contact?: string;
}

interface BackendOrderItem {
  productId: {
    _id: string;
    sku?: string;
  };
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface BackendOrderAddress {
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface BackendOrder {
  _id: string;
  orderNumber: string;
  userId: BackendOrderUser;
  items: BackendOrderItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  dueDate?: string;
  deliveryDate?: string;
  shippingAddress: BackendOrderAddress;
  billingAddress: BackendOrderAddress;
  notes?: string;
  createdAt: string;
  invoiceNumber?: string;
  paymentLink?: string;
}

type OrdersResponse = ApiResponse<BackendOrder[]>;

function mapBackendOrderToOrder(order: BackendOrder): Order {
  const items = order.items || [];
  const userSource =
    (order as unknown as { userId?: BackendOrderUser; user?: BackendOrderUser })
      .userId ||
    (order as unknown as { userId?: BackendOrderUser; user?: BackendOrderUser })
      .user ||
    ({} as BackendOrderUser);

  return {
    id: order._id,
    orderId: order.orderNumber,
    customerName:
      userSource.businessName ||
      userSource.name ||
      userSource._id ||
      "Unknown customer",
    userName:
      userSource.name ||
      userSource.businessName ||
      userSource._id ||
      "Unknown user",
    customerEmail: userSource.email || "Unknown email",
    userPhone: userSource.contact,
    orderDate: new Date(order.createdAt).toLocaleDateString(),
    deliveryDate: order.deliveryDate
      ? new Date(order.deliveryDate).toLocaleDateString()
      : "",
    itemsCount: items.length,
    subtotal: order.subtotal,
    tax: order.tax,
    shippingCost: order.shippingCost,
    totalAmount: order.totalAmount,
    status: order.status,
    paymentStatus: order.paymentStatus,
    invoiceNumber: order.invoiceNumber,
    paymentLink: order.paymentLink,
    items: items.map((item) => ({
      product: item.name,
      sku: item.sku,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
    })),
    shippingAddress: order.shippingAddress,
    billingAddress: order.billingAddress,
    notes: order.notes,
  };
}

export default function OrdersAndInvoicingPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useApi<OrdersResponse>("/orders/admin/all", [
    "orders",
  ]);

  const backendOrders = data?.data || [];
  const orders: Order[] = backendOrders.map(mapBackendOrderToOrder);

  const filteredOrders = useMemo(() => {
    if (!search.trim()) return orders;
    const term = search.toLowerCase();
    return orders.filter((order) =>
      (order.orderId || "").toLowerCase().includes(term),
    );
  }, [orders, search]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Orders & Invoicing Management"
        description="View and manage your orders and invoices"
      />

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredOrders}
          searchKey="orderId"
          searchValue={search}
          onSearchValueChange={setSearch}
          searchPlaceholder="Search by order ID"
        />
      )}
    </div>
  );
}
