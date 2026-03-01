"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountschema } from "@/app/lib/accountschema";
import useFetch from "@/app/hooks/use-fetch";
import { createDashboard } from "@/actions/dashboard";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CreateAccountDrawer({ children }) {

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountschema),
    defaultValues: {
      name: "",
      type: "current",
      balance: "",
      isDefault: false,
    },
  });

  const {
    data: newAccount,
    loading: createDashboardLoading,
    error,
    fetchdata: createDashboardfn,
  } = useFetch(createDashboard);

  const onSubmit = async (formData) => {
    try {
      const dataToSend = {
        ...formData,
        balance: parseFloat(formData.balance) || 0,
      };
      await createDashboardfn(dataToSend);
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    } catch (err) {
      toast.error(err.message || "Failed to create account");
    }
  };

  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create Account</DrawerTitle>
            <DrawerDescription>Fill in the account details</DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Account Name
                </label>
                <Input id="name" placeholder="e.g., Main Checking" {...register("name")} />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Account Type
                </label>
                <Select value={watch("type")} onValueChange={(value) => setValue("type", value)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Type" id="type" className="text-gray-900" />
                  </SelectTrigger>
                  <SelectContent className="h-[80px]">
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-red-500">{errors.type.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="balance" className="text-sm font-medium">
                  Initial Balance
                </label>
                <Input id="balance" placeholder="e.g., 0.00" step="0.01" {...register("balance")} />
                {errors.balance && <p className="text-red-500">{errors.balance.message}</p>}
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-300 p-3">
                <div className="text-black/80">
                  <label htmlFor="isDefault" className="text-sm font-medium">
                    Set as Default
                  </label>
                  <p>This account will be the default for transactions</p>
                </div>
                <Switch
                  id="isDefault"
                  name="isDefault"
                  checked={watch("isDefault")}
                  onCheckedChange={(checked) => setValue("isDefault", checked)}
                />
              </div>

              <div className="flex gap-2">
                <DrawerClose asChild>
                  <Button variant="outline" type="button" className="flex-1">
                    Cancel
                  </Button>
                </DrawerClose>
                <Button type="submit" className="flex-1" disabled={createDashboardLoading}>
                  {createDashboardLoading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
