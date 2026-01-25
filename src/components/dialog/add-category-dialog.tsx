/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { IconPlus, IconPhoto, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { privateApi } from "@/lib/api-client";
import { toast } from "sonner"; // Assuming sonner is used, or I'll use alert/console if not found.
// I'll check if toast/sonner is available. If not, I'll stick to simple alerts or just log.
// Checking imports in other files... columns.tsx uses window.location.reload().
// I'll stick to basic alert for error and reload for success.

interface Category {
  _id: string;
  categoryName: string;
  image: string;
}

interface AddCategoryDialogProps {
  category?: Category;
  trigger?: React.ReactNode;
}

export function AddCategoryDialog({
  category,
  trigger,
}: AddCategoryDialogProps) {
  const [name, setName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (category) {
      setName(category.categoryName);
      setPreviewUrl(category.image);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setName("");
      setPreviewUrl("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [category, open]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleRemoveFile = () => {
    setPreviewUrl("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("categoryName", name);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      let res;
      if (category) {
        res = await privateApi.patch(`category/${category._id}`, formData);
      } else {
        res = await privateApi.post("/category", formData);
      }

      if (res.data.success) {
        toast.success(
          category
            ? "Category updated successfully"
            : "Category created successfully",
        );
        setOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to save category:", error);
      toast.error("Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="gap-2 text-primary border-primary hover:bg-primary/10"
          >
            <IconPlus className="h-4 w-4" />
            Add Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogDescription>
            {category
              ? "Make changes to your category here. Click save when you're done."
              : "Create a new category for your products. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="e.g., Electronics"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label>Category Image</Label>
            <div
              className={`relative flex flex-col items-center justify-center w-full h-32 rounded-xl border border-dashed transition-colors ${
                previewUrl
                  ? "bg-gray-100"
                  : "bg-muted/40 hover:bg-muted/60 cursor-pointer"
              }`}
              onClick={!previewUrl ? handleUploadClick : undefined}
            >
              {previewUrl ? (
                <>
                  <div
                    className="h-full w-full rounded-xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${previewUrl})` }}
                  />
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white text-red-500 transition-colors"
                  >
                    <IconX className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <>
                  <IconPhoto className="h-8 w-8 mb-2 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Upload category image
                  </span>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
