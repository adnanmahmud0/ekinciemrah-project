"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useApi } from "@/hooks/use-api-data";

export interface UserRecord {
  _id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  role: string;
  contact: string;
  businessAddress: string;
  image: string;
  status: string;
  customerType: string;
  isActive: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  credit_limit?: string;
}

interface OrderRecord {
  id: string;
  orderId: string;
  productName: string;
  quantity: number;
  date: string;
  total: number;
  status: string;
}

interface BackendOrderUser {
  _id: string;
  name?: string;
  businessName?: string;
  email?: string;
  contact?: string;
}

interface BackendOrderAddress {
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface BackendOrderItem {
  productId: {
    _id: string;
    sku?: string;
    image?: string;
  };
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
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
  shippingAddress: BackendOrderAddress;
  billingAddress: BackendOrderAddress;
  notes?: string;
  createdAt: string;
  invoiceNumber?: string;
  paymentLink?: string;
}

interface OrdersResponse {
  success: boolean;
  message: string;
  data: BackendOrder[];
}

interface UserDetailsDialogProps {
  user: UserRecord;
  trigger?: React.ReactNode;
}

export function UserDetailsDialog({ user, trigger }: UserDetailsDialogProps) {
  const { data, isLoading } = useApi<OrdersResponse>(
    user._id ? `/orders/admin/my-orders/${user._id}` : undefined,
    user._id ? ["user-orders", user._id] : undefined,
  );

  const backendOrders = data?.data || [];

  const orders: OrderRecord[] = backendOrders.map((order) => ({
    id: order._id,
    orderId: order.orderNumber,
    productName:
      order.items && order.items.length > 0
        ? order.items.length > 1
          ? `${order.items[0].name} (+${order.items.length - 1} more)`
          : order.items[0].name
        : "No items",
    quantity:
      order.items && order.items.length > 0
        ? order.items.reduce((sum, item) => sum + item.quantity, 0)
        : 0,
    date: new Date(order.createdAt).toLocaleDateString(),
    total: order.totalAmount,
    status: order.status,
  }));

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            View
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-137.5">
        <DialogHeader>
          <DialogTitle>User details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">
              Business registration
            </p>
            <p className="text-sm text-muted-foreground">
              Business name, type, address, phone, and email.
            </p>
          </div>

          <div className="grid gap-4 text-sm">
            <div className="grid grid-cols-[150px_1fr] gap-2">
              <span className="font-medium text-muted-foreground">
                Business name
              </span>
              <span className="font-semibold text-foreground">
                {user.businessName}
              </span>
            </div>
            <div className="grid grid-cols-[150px_1fr] gap-2">
              <span className="font-medium text-muted-foreground">
                Business type
              </span>
              <span className="text-foreground">
                {user.businessType ?? "Not set"}
              </span>
            </div>
            <div className="grid grid-cols-[150px_1fr] gap-2">
              <span className="font-medium text-muted-foreground">
                Customer Type
              </span>
              <span className="text-foreground capitalize">
                {user.customerType ?? "Not set"}
              </span>
            </div>
            <div className="grid grid-cols-[150px_1fr] gap-2">
              <span className="font-medium text-muted-foreground">
                Business address
              </span>
              <span className="text-foreground">
                {user.businessAddress || "Not available"}
              </span>
            </div>
            <div className="grid grid-cols-[150px_1fr] gap-2">
              <span className="font-medium text-muted-foreground">
                Business phone
              </span>
              <span className="text-foreground">
                {user.contact || "Not available"}
              </span>
            </div>
            <div className="grid grid-cols-[150px_1fr] gap-2">
              <span className="font-medium text-muted-foreground">
                Business email
              </span>
              <span className="text-foreground">{user.email}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">
                Order history
              </p>
              <span className="text-xs text-muted-foreground">
                {orders.length} orders found
              </span>
            </div>

            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No orders found for this user yet.
              </p>
            ) : (
              <div className="max-h-48 space-y-2 overflow-y-auto rounded-md border p-3">
                <div className="grid grid-cols-[1.2fr_1.2fr_0.6fr_0.8fr_0.6fr_0.6fr] items-center gap-2 text-[11px] font-semibold text-muted-foreground border-b pb-1 mb-1">
                  <div>Order ID</div>
                  <div>Product</div>
                  <div>Qty</div>
                  <div>Date</div>
                  <div>Total</div>
                  <div>Status</div>
                </div>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-[1.2fr_1.2fr_0.6fr_0.8fr_0.6fr_0.6fr] items-center gap-2 text-xs"
                  >
                    <div className="font-medium text-foreground">
                      {order.orderId}
                    </div>
                    <div className="text-foreground truncate">
                      {order.productName}
                    </div>
                    <div className="text-muted-foreground">
                      {order.quantity}
                    </div>
                    <div className="text-muted-foreground">{order.date}</div>
                    <div className="text-foreground">
                      ${order.total.toFixed(2)}
                    </div>
                    <div className="text-muted-foreground">{order.status}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
