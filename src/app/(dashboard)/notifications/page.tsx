"use client";

import { User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import data from "./data.json";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
        <Button variant="link" className="text-gray-500 hover:text-gray-900">
          Mark all as read
        </Button>
      </div>

      <div className="flex flex-col">
        {data.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-4 p-4 ${
              notification.type === "info" ? "bg-blue-50/50" : "bg-teal-50/50"
            } border-b border-white last:border-0`}
          >
            <div className="mt-1">
              {notification.type === "info" ? (
                <User className="h-5 w-5 text-gray-700" />
              ) : (
                <X className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-gray-900">
                {notification.message}
              </p>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
