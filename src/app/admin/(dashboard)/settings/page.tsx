"use client";

import { useState } from "react";
import { Eye, EyeOff, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/context/auth-context";

export default function SettingsPage() {
  const { user } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.id]: e.target.value });
  };

  const handleSave = async () => {
    setError("");
    setMessage("");

    // Only attempt password change if fields are filled
    if (
      passwords.currentPassword ||
      passwords.newPassword ||
      passwords.confirmPassword
    ) {
      if (passwords.newPassword !== passwords.confirmPassword) {
        setError("New passwords do not match");
        return;
      }

      setLoading(true);
      try {
        const response = await authService.changePassword({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
          confirmPassword: passwords.confirmPassword,
        });

        if (response.success) {
          setMessage("Password changed successfully");
          setPasswords({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          setError(response.message || "Failed to change password");
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Manage your profile settings and preferences."
      />

      <div className="rounded-lg p-6 md:p-8">
        <div className="grid gap-6 max-w-2xl">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {message && <div className="text-green-500 text-sm">{message}</div>}

          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your Name"
              className="bg-blue-50/50 border-blue-100"
              defaultValue={user?.name || ""}
              disabled
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="bg-blue-50/50 border-blue-100"
              defaultValue={user?.email || ""}
              disabled
            />
          </div>

          <div className="border-t border-gray-200 my-2"></div>

          <h3 className="text-lg font-medium">Change Password</h3>

          <div className="grid gap-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                className="bg-blue-50/50 border-blue-100 pr-10"
                value={passwords.currentPassword}
                onChange={handleChange}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <Eye className="h-4 w-4 text-gray-500" />
                ) : (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                )}
                <span className="sr-only">
                  {showCurrentPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter New Password"
                className="bg-blue-50/50 border-blue-100 pr-10"
                value={passwords.newPassword}
                onChange={handleChange}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <Eye className="h-4 w-4 text-gray-500" />
                ) : (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                )}
                <span className="sr-only">
                  {showNewPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter New Password"
                className="bg-blue-50/50 border-blue-100 pr-10"
                value={passwords.confirmPassword}
                onChange={handleChange}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <Eye className="h-4 w-4 text-gray-500" />
                ) : (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                )}
                <span className="sr-only">
                  {showConfirmPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
        </div>
        <Button
          className="cursor-pointer mt-8"
          onClick={handleSave}
          disabled={loading}
        >
          <Save /> {loading ? "Saving..." : "Save & Change"}
        </Button>
      </div>

      <div></div>
    </div>
  );
}
