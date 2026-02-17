"use client";

import { IconUser } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export interface OrderItem {
  product: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface AddressInfo {
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  userPhone?: string;
  orderDate: string;
  itemsCount: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  invoiceNumber?: string;
  paymentLink?: string;
  items: OrderItem[];
  shippingAddress: AddressInfo;
  billingAddress: AddressInfo;
  notes?: string;
}

interface OrderDetailsDialogProps {
  order: Order;
  trigger?: React.ReactNode;
}

export function OrderDetailsDialog({
  order,
  trigger,
}: OrderDetailsDialogProps) {
  const orderItems = order.items || [];

  const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const shippingAddress = order.shippingAddress;
  const userName = order.customerName;
  const userEmail = order.customerEmail;
  const userPhone = order.userPhone || "Not available";
  const userAddress = shippingAddress
    ? `${shippingAddress.line1}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}, ${shippingAddress.country}`
    : "Not available";

  const displayStatus = order.status;
  const paymentStatus = order.paymentStatus;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Order Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Top Info Grid */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Order Number
              </p>
              <p className="font-bold text-lg">{order.orderId}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Order Date
              </p>
              <p className="font-bold text-lg">{order.orderDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Customer Name
              </p>
              <p className="font-bold text-lg">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Status
              </p>
              <Badge
                variant="outline"
                className={
                  displayStatus === "Pending"
                    ? "border-yellow-500 text-yellow-600 bg-yellow-50 px-3 py-1"
                    : displayStatus === "Approved"
                      ? "border-green-500 text-green-600 bg-green-50 px-3 py-1"
                      : displayStatus === "Rejected"
                        ? "border-red-500 text-red-600 bg-red-50 px-3 py-1"
                        : "border-gray-300 text-gray-700 bg-gray-50 px-3 py-1"
                }
              >
                {displayStatus}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Invoice Number
              </p>
              <p className="font-bold text-lg">
                {order.invoiceNumber || "Not available"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Payment Status
              </p>
              <Badge
                variant="outline"
                className={
                  paymentStatus === "Pending"
                    ? "border-yellow-500 text-yellow-600 bg-yellow-50 px-3 py-1"
                    : paymentStatus === "Paid"
                      ? "border-green-500 text-green-600 bg-green-50 px-3 py-1"
                      : paymentStatus === "Failed"
                        ? "border-red-500 text-red-600 bg-red-50 px-3 py-1"
                        : "border-gray-300 text-gray-700 bg-gray-50 px-3 py-1"
                }
              >
                {paymentStatus || "Unknown"}
              </Badge>
            </div>
          </div>

          {/* Order Items */}
          <div className="">
            <h3 className="text-teal-700 font-medium mb-4 text-base">
              Order items
            </h3>
            <div className="border rounded-lg p-4 bg-card shadow-sm">
              <div className="grid grid-cols-5 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
                <div>PRODUCT</div>
                <div>ITEM SKU</div>
                <div className="text-right">QUANTITY</div>
                <div className="text-right">PRICE</div>
                <div className="text-right">TOTAL</div>
              </div>
              <div className="border-t border-dashed my-3"></div>
              {orderItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 text-sm items-center py-1"
                >
                  <div className="font-medium text-gray-700">
                    {item.product}
                  </div>
                  <div className="text-gray-500">{item.sku}</div>
                  <div className="text-right text-gray-700">
                    {item.quantity}
                  </div>
                  <div className="text-right text-gray-700">
                    {formatMoney(item.unitPrice)}
                  </div>
                  <div className="text-right font-medium text-gray-900">
                    {formatMoney(item.totalPrice)}
                  </div>
                </div>
              ))}
              <div className="border-t my-3"></div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-end items-center gap-2">
                  <span className="text-teal-700 font-medium">Subtotal:</span>
                  <span className="font-semibold text-gray-900">
                    {formatMoney(order.subtotal)}
                  </span>
                </div>
                <div className="flex justify-end items-center gap-2">
                  <span className="text-gray-700">Tax:</span>
                  <span className="text-gray-900">
                    {formatMoney(order.tax)}
                  </span>
                </div>
                <div className="flex justify-end items-center gap-2">
                  <span className="text-gray-700">Shipping:</span>
                  <span className="text-gray-900">
                    {formatMoney(order.shippingCost)}
                  </span>
                </div>
                <div className="flex justify-end items-center gap-2">
                  <span className="font-bold text-teal-700">Total:</span>
                  <span className="font-bold text-gray-900">
                    {formatMoney(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="border rounded-lg p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b">
              <IconUser className="h-5 w-5 text-teal-700" />
              <h3 className="text-teal-700 font-medium text-lg">
                User Information
              </h3>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="grid grid-cols-[120px_1fr] gap-2 items-center">
                <span className="font-medium text-gray-700">User Name :</span>
                <span className="text-teal-600 font-medium">{userName}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2 items-center">
                <span className="font-medium text-gray-700">Email :</span>
                <span className="text-teal-600 font-medium">{userEmail}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2 items-center">
                <span className="font-medium text-gray-700">
                  Phone Number :
                </span>
                <span className="text-teal-600 font-medium">{userPhone}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                <span className="font-medium text-gray-700">Address:</span>
                <span className="text-teal-600 font-medium">{userAddress}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
