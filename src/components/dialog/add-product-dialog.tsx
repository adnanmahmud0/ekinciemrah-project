/* eslint-disable react-hooks/set-state-in-effect */
"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from "react";
import { IconPhoto, IconPlus, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: number;
  product: string;
  image: string;
  category: string;
  price: string;
  stock: string;
  status: string;
}

interface AddProductDialogProps {
  product?: Product;
  trigger?: React.ReactNode;
}

export function AddProductDialog({ product, trigger }: AddProductDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Initialize form data if product exists
  useEffect(() => {
    if (product) {
      setPreviewUrl(product.image);
    }
  }, [product]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <IconPlus className="h-4 w-4" />
            Add Product
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label>Upload Product Image</Label>
            <div
              className={`relative flex flex-col items-center justify-center w-full h-32 rounded-xl transition-colors ${
                previewUrl
                  ? "bg-gray-100"
                  : "bg-primary hover:bg-primary/80 cursor-pointer"
              }`}
              onClick={!previewUrl ? handleUploadClick : undefined}
            >
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-full w-full object-contain rounded-xl"
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
                  <IconPhoto className="h-8 w-8 mb-2 text-white" />
                  <span className="text-sm font-medium text-white">
                    Select File
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

          <div className="grid gap-3">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              defaultValue={product?.product}
              placeholder="e.g., Vegetables"
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Type..."
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="category">Category</Label>
            <Select defaultValue={product?.category?.toLowerCase()}>
              <SelectTrigger className="w-full bg-gray-50 border-gray-200 text-gray-500">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="bakery">Bakery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="main-price">Main Price ($)</Label>
              <Input
                id="main-price"
                placeholder="$3.50"
                className="bg-gray-50 border-gray-200"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="selling-price">Selling Price ($)</Label>
              <Input
                id="selling-price"
                placeholder="$2.50"
                className="bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="unit">Unit</Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-50 border-gray-200 text-gray-500">
                <SelectValue placeholder="Pound" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pound">Pound</SelectItem>
                <SelectItem value="kg">Kg</SelectItem>
                <SelectItem value="piece">Piece</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/80 text-white"
            >
              {product ? "Save Changes" : "Add Product"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
