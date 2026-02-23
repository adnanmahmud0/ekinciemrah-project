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
import { useApi } from "@/hooks/use-api-data";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type BackendAdminUser = {
  _id: string;
  name?: string;
  email: string;
};

type AdminListResponse = {
  success: boolean;
  message: string;
  data?: {
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data: BackendAdminUser[];
  };
};

type AdminUser = {
  id: string;
  name: string;
  email: string;
};

export default function AdminAccessPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [adminToDelete, setAdminToDelete] = useState<AdminUser | null>(null);

  const {
    data: apiResponse,
    isLoading,
    isError,
    create,
    remove,
    isCreating,
    isDeleting,
  } = useApi<AdminListResponse>("/user/admin", ["admin-access"]);

  const admins: AdminUser[] =
    apiResponse?.data?.data?.map((admin) => ({
      id: admin._id,
      name: admin.name || "Admin user",
      email: admin.email,
    })) || [];

  const handleDelete = async (id: string) => {
    try {
      await remove(id);
      toast.success("Admin access removed");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to remove admin access",
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) return;

    try {
      await create({
        name: newName.trim(),
        email: newEmail.trim(),
        password: newPassword.trim(),
      });
      toast.success("Admin access granted");
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to grant admin access",
      );
    }
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
                  disabled={isCreating}
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
                  disabled={isCreating}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Enter password"
                  required
                  disabled={isCreating}
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? "Saving..." : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {isLoading ? (
              <div className="py-10 text-center text-sm text-gray-500">
                Loading admin users...
              </div>
            ) : isError ? (
              <div className="py-10 text-center text-sm text-red-500">
                Failed to load admin users.
              </div>
            ) : (
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
                            onClick={() => setAdminToDelete(admin)}
                            disabled={isDeleting}
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
            )}
          </div>
        </div>
      </div>

      <AlertDialog
        open={adminToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setAdminToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove admin access?</AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-sm text-muted-foreground">
            This will remove admin dashboard access for{" "}
            <span className="font-semibold">
              {adminToDelete?.email || "this user"}
            </span>
            . You can give access again later if needed.
          </p>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                if (!adminToDelete) return;
                await handleDelete(adminToDelete.id);
                setAdminToDelete(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
