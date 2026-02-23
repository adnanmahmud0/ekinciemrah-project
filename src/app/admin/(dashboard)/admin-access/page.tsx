"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

type AdminUser = {
  id: string;
  name: string;
  email: string;
};

const initialAdmins: AdminUser[] = [
  {
    id: "1",
    name: "Main Admin",
    email: "admin@unifiedproduce.com",
  },
];

export default function AdminAccessPage() {
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleDelete = (id: string) => {
    setAdmins((prev) => prev.filter((admin) => admin.id !== id));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newAdmin: AdminUser = {
      id: Date.now().toString(),
      name: newName.trim(),
      email: newEmail.trim(),
    };

    setAdmins((prev) => [...prev, newAdmin]);
    setNewName("");
    setNewEmail("");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pr-6">
        <PageHeader
          title="Admin Access"
          description="Manage which users have admin access to the dashboard"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add admin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[420px]">
            <DialogHeader>
              <DialogTitle>Add admin</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-name">Name</Label>
                <Input
                  id="admin-name"
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  placeholder="Enter admin name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={newEmail}
                  onChange={(event) => setNewEmail(event.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="overflow-hidden rounded-xl border bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {admin.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {admin.email}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          Admin
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDelete(admin.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {admins.length === 0 && (
                    <tr>
                      <td
                        className="px-4 py-6 text-center text-sm text-gray-500"
                        colSpan={4}
                      >
                        No admin users added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
