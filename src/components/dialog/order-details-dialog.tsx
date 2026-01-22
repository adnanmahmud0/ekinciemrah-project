"use client";

import {
  IconCheck,
  IconX,
  IconUser,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export interface OrderItem {
  product: string;
  quantity: string;
  price: string;
  total: string;
}

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryDate: string;
}

export interface Order {
  id: number;
  orderId: string;
  customer: string;
  date: string;
  items: number;
  total: string;
  invoice: string;
  status: string;
  orderItems?: OrderItem[];
  userInfo?: UserInfo;
  paymentType?: "online pay" | "credit" | "cash on delevary" | string;
}

interface OrderDetailsDialogProps {
  order: Order;
  trigger?: React.ReactNode;
}

export function OrderDetailsDialog({ order, trigger }: OrderDetailsDialogProps) {
  const orderItems = order.orderItems || [
    { product: "Tomatoes", quantity: "50/ Pound", price: "$2.50", total: "$125.00" }
  ];
  
  const userInfo = order.userInfo || {
    name: "Jhon Doe",
    email: "jhon145@gmail.com",
    phone: "01745....",
    address: "Dhaka Gulsan House #12",
    deliveryDate: "20/01/2026"
  };

  const displayStatus =
    order.status === "Generated" || order.status === "Not-Generated"
      ? "Pending"
      : order.status;

  function handleApprove() {
    // Logic to approve order
  }

  function handleReject() {
    // Logic to reject order
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Order Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
            {/* Top Info Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Order Number</p>
                    <p className="font-bold text-lg">{order.orderId}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                    <p className="font-bold text-lg">{order.date}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Business Type</p>
                    <p className="font-bold text-lg">{order.customer}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
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
                    <p className="text-sm font-medium text-muted-foreground mb-1">Payment Type</p>
                    <p className="font-bold text-lg capitalize">{order.paymentType || "N/A"}</p>
                </div>
            </div>

            {/* Order Items */}
            <div className="">
                <h3 className="text-teal-700 font-medium mb-4 text-base">Order items</h3>
                <div className="border rounded-lg p-4 bg-card shadow-sm">
                    <div className="grid grid-cols-4 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
                        <div>PRODUCT</div>
                        <div>QUANTITY</div>
                        <div className="text-right">PRICE</div>
                        <div className="text-right">TOTAL</div>
                    </div>
                    <div className="border-t border-dashed my-3"></div>
                    {orderItems.map((item, index) => (
                        <div key={index} className="grid grid-cols-4 text-sm items-center py-1">
                            <div className="font-medium text-gray-700">{item.product}</div>
                            <div className="text-gray-500">{item.quantity}</div>
                            <div className="text-right text-gray-700">{item.price}</div>
                            <div className="text-right font-medium text-gray-900">{item.total}</div>
                        </div>
                    ))}
                    <div className="border-t my-3"></div>
                    <div className="flex justify-end items-center gap-2 text-sm">
                         <span className="font-bold text-teal-700">Total :</span>
                         <span className="font-bold text-gray-900">{order.total}</span>
                    </div>
                </div>
            </div>

            {/* User Information */}
            <div className="border rounded-lg p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b">
                    <IconUser className="h-5 w-5 text-teal-700" />
                    <h3 className="text-teal-700 font-medium text-lg">User Information</h3>
                </div>
                
                <div className="grid gap-3 text-sm">
                    <div className="grid grid-cols-[120px_1fr] gap-2 items-center">
                        <span className="font-medium text-gray-700">User Name :</span>
                        <span className="text-teal-600 font-medium">{userInfo.name}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2 items-center">
                        <span className="font-medium text-gray-700">Email :</span>
                        <span className="text-teal-600 font-medium">{userInfo.email}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2 items-center">
                        <span className="font-medium text-gray-700">Phone Number :</span>
                        <span className="text-teal-600 font-medium">{userInfo.phone}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                        <span className="font-medium text-gray-700">Address:</span>
                        <span className="text-teal-600 font-medium">{userInfo.address}</span>
                    </div>
                     <div className="grid grid-cols-[120px_1fr] gap-2 items-center">
                        <span className="font-medium text-gray-700">Delivery Date:</span>
                        <span className="text-teal-600 font-medium">{userInfo.deliveryDate}</span>
                    </div>
                </div>
            </div>
        </div>

        <DialogFooter className="flex flex-row gap-4 w-full sm:justify-between">
            <DialogClose asChild>
              <Button
                className="flex-1 bg-[#00B050] hover:bg-[#009040] text-white h-11 text-base"
                onClick={handleApprove}
              >
                <IconCheck className="h-5 w-5 mr-2" />
                Approve Order
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="destructive"
                className="flex-1 bg-[#FF0000] hover:bg-[#CC0000] h-11 text-base"
                onClick={handleReject}
              >
                <IconX className="h-5 w-5 mr-2" />
                Reject Order
              </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
