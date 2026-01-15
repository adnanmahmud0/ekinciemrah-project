"use client";

import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

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

interface CustomerType {
  id: number;
  name: string;
}

interface AddCustomerTypeDialogProps {
  customerType?: CustomerType;
  trigger?: React.ReactNode;
}

export function AddCustomerTypeDialog({
  customerType,
  trigger,
}: AddCustomerTypeDialogProps) {
  const [name, setName] = useState(customerType?.name ?? "");

  const isEdit = Boolean(customerType);

  return (
    <Dialog>
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
        <form className="grid gap-4 py-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Type name</Label>
            <Input
              id="name"
              placeholder="e.g., Restaurant"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isEdit ? "Save changes" : "Add type"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

