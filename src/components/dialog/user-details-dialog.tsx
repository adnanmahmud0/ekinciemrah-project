"use client";

import { Button } from "@/components/ui/button";
import ordersData from "@/app/admin/(dashboard)/orders-and-invoicing/data.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  business: string;
  credit_limit: string;
  status: string;
  customerType?: string;
}

interface OrderRecord {
  id: number;
  orderId: string;
  customer: string;
  date: string;
  items: number;
  total: string;
  invoice: string;
  status: string;
  userInfo?: {
    name: string;
    email: string;
    phone: string;
    address: string;
    deliveryDate: string;
  };
}

interface UserDetailsDialogProps {
  user: UserRecord;
  trigger?: React.ReactNode;
}

export function UserDetailsDialog({ user, trigger }: UserDetailsDialogProps) {
  const orders = (ordersData as OrderRecord[]).filter((order) => {
    if (order.userInfo?.email) {
      return order.userInfo.email === user.email;
    }
    return order.customer === user.business;
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            View
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
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
                {user.business}
              </span>
            </div>
            <div className="grid grid-cols-[150px_1fr] gap-2">
              <span className="font-medium text-muted-foreground">
                Business type
              </span>
              <span className="text-foreground">
                {user.customerType ?? "Not set"}
              </span>
            </div>
            <div className="grid grid-cols-[150px_1fr] gap-2">
              <span className="font-medium text-muted-foreground">
                Business address
              </span>
              <span className="text-foreground">
                {orders[0]?.userInfo?.address ?? "Not available"}
              </span>
            </div>
            <div className="grid grid-cols-[150px_1fr] gap-2">
              <span className="font-medium text-muted-foreground">
                Business phone
              </span>
              <span className="text-foreground">
                {orders[0]?.userInfo?.phone ?? "Not available"}
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

            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No orders found for this user yet.
              </p>
            ) : (
              <div className="max-h-48 space-y-2 overflow-y-auto rounded-md border p-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-[1.2fr_0.8fr_0.6fr_0.6fr] items-center gap-2 text-xs"
                  >
                    <div className="font-medium text-foreground">
                      {order.orderId}
                    </div>
                    <div className="text-muted-foreground">{order.date}</div>
                    <div className="text-foreground">{order.total}</div>
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
