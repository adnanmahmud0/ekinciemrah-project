"use client";

import { IconPlus } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

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
import { useApi } from "@/hooks/use-api-data";

interface CustomerType {
  _id: string;
  customerType: string;
}

interface AddCustomerTypeDialogProps {
  customerType?: CustomerType;
  trigger?: React.ReactNode;
}

export function AddCustomerTypeDialog({
  customerType,
  trigger,
}: AddCustomerTypeDialogProps) {
  const [name, setName] = useState(customerType?.customerType ?? "");
  const [open, setOpen] = useState(false);
  
  // Disable GET query, only use mutations
  const { post, patch, isCreating, isUpdating } = useApi(
    "/customer-type", 
    ["customer-types"], 
    { enabled: false }
  );

  const isEdit = Boolean(customerType);
  const isLoading = isCreating || isUpdating;

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setName(customerType?.customerType ?? "");
    }
  }, [open, customerType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEdit && customerType) {
        // Edit: customer-type/{id}
        await patch(`/customer-type/${customerType._id}`, { customerType: name });
        toast.success("Customer type updated successfully");
      } else {
        // Add: /customer-type
        await post("/customer-type", { customerType: name });
        toast.success("Customer type created successfully");
      }
      setOpen(false);
      if (!isEdit) setName(""); // Clear input on success for add mode
    } catch (error) {
      console.error(error);
      toast.error(isEdit ? "Failed to update customer type" : "Failed to create customer type");
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
            Add Customer Type
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Customer Type" : "Add Customer Type"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the customer type name and click save when you're done."
              : "Create a new customer type. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Type name</Label>
            <Input
              id="name"
              placeholder="e.g., Restaurant"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isLoading}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : (isEdit ? "Save changes" : "Add type")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
