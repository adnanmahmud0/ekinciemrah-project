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
import { useApi } from "@/hooks/use-api-data";
import { Product } from "@/types/product";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AddProductDialogProps {
  product?: Product;
  trigger?: React.ReactNode;
}

export function AddProductDialog({ product, trigger }: AddProductDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    unit: "",
    basePrice: "",
    stock: "",
    status: "Available",
  });
  const [categoryPrices, setCategoryPrices] = useState<{
    [key: string]: string;
  }>({});
  const { post, patch } = useApi();
  const queryClient = useQueryClient();

  // Initialize form data if product exists
  useEffect(() => {
    if (product) {
      setPreviewUrl(
        product.image.startsWith("http")
          ? product.image
          : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${product.image}`,
      );
      setFormData({
        productName: product.productName,
        description: product.description,
        category: product.category,
        unit: product.unit,
        basePrice: product.basePrice.toString(),
        stock: product.stock.toString(),
        status: product.status || "Available",
      });

      const prices: { [key: string]: string } = {};
      product.customerTypePrice.forEach((cp) => {
        prices[cp.categoryName] = cp.price;
      });
      setCategoryPrices(prices);
      setSelectedFile(null); // Reset selected file when editing existing product
    } else {
      // Reset form when dialog opens in "Add" mode
      if (open && !product) {
        setFormData({
          productName: "",
          description: "",
          category: "",
          unit: "",
          basePrice: "",
          stock: "",
          status: "Available",
        });
        setCategoryPrices({});
        setPreviewUrl(null);
        setSelectedFile(null);
      }
    }
  }, [product, open]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product && !selectedFile) {
      toast.error("Product image is required");
      return;
    }

    const submitData = new FormData();
    submitData.append("productName", formData.productName);
    submitData.append("description", formData.description);
    submitData.append("category", formData.category);
    submitData.append("unit", formData.unit);
    submitData.append("basePrice", formData.basePrice);
    submitData.append("stock", formData.stock);
    submitData.append("status", formData.status);

    const customerTypePrice = Object.entries(categoryPrices).map(
      ([categoryName, price]) => ({
        categoryName,
        price,
      }),
    );

    if (product) {
      // The backend UPDATE controller likely doesn't manually parse JSON strings for FormData.
      // So we send it as individual fields (which body-parser expands into an array of objects).
      customerTypePrice.forEach((item, index) => {
        submitData.append(
          `customerTypePrice[${index}][categoryName]`,
          item.categoryName,
        );
        submitData.append(`customerTypePrice[${index}][price]`, item.price);
      });
    } else {
      // The backend CREATE controller manually calls JSON.parse() on this field.
      // We MUST send a JSON string, otherwise the backend receives [object Object]
      // and throws "SyntaxError: Unexpected token o".
      submitData.append("customerTypePrice", JSON.stringify(customerTypePrice));
    }

    if (selectedFile) {
      submitData.append("image", selectedFile);
    }

    try {
      if (product) {
        // Edit mode - PATCH
        await patch(`/product&catelog/${product._id}`, submitData);
        toast.success("Product updated successfully");
      } else {
        // Create mode - POST
        await post("/product&catelog", submitData);
        toast.success("Product created successfully");
      }
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(
        product ? "Failed to update product" : "Failed to create product",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label>Upload Product Image</Label>
            <div
              className={`relative flex flex-col items-center justify-center w-full h-32 rounded-xl transition-colors ${
                previewUrl
                  ? "bg-gray-100 border-none"
                  : "bg-gray-50 border-2 border-dashed border-gray-200 hover:bg-gray-100"
              }`}
              onClick={handleUploadClick}
            >
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <div
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm cursor-pointer hover:bg-gray-100"
                    onClick={handleRemoveFile}
                  >
                    <IconX className="w-4 h-4 text-gray-500" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                  <div className="p-3 bg-white rounded-full shadow-sm">
                    <IconPhoto className="w-5 h-5 text-gray-400" />
                  </div>
                  <span className="text-sm text-gray-500">
                    Click to upload image
                  </span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                id="image"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                placeholder="Enter product name"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetable">Vegetable</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Meat">Meat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Base Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={formData.basePrice}
                onChange={(e) =>
                  setFormData({ ...formData, basePrice: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                placeholder="e.g. kg, lb"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base">Customer Type Pricing</Label>
            <div className="grid grid-cols-3 gap-4">
              {["Category A", "Category B", "Category C"].map((cat) => (
                <div key={cat} className="grid gap-2">
                  <Label
                    htmlFor={`price-${cat}`}
                    className="text-xs text-muted-foreground"
                  >
                    {cat} Price
                  </Label>
                  <Input
                    id={`price-${cat}`}
                    type="number"
                    placeholder="0.00"
                    value={categoryPrices[cat] || ""}
                    onChange={(e) =>
                      setCategoryPrices({
                        ...categoryPrices,
                        [cat]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {product ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
