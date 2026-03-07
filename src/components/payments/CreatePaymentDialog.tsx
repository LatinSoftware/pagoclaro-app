"use client";

import { useState } from "react";
import { Plus, CreditCard } from "lucide-react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { GlobalPaymentForm } from "./GlobalPaymentForm";

export function CreatePaymentDialog() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const TriggerButton = (
    <Button className="rounded-lg shadow-md gap-2 h-11 px-5 group">
      <div className="relative">
        <CreditCard className="size-4 group-hover:scale-110 transition-transform" />
        <Plus className="size-2 absolute -top-1 -right-1 bg-primary border-2 border-primary rounded-full text-primary-foreground" />
      </div>
      <span className="font-bold tracking-tight">Create Payment</span>
    </Button>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-0 shadow-2xl">
          <div className="bg-primary h-2 w-full" />
          <div className="p-6">
            <DialogHeader className="mb-6 text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CreditCard className="size-8 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold tracking-tight">
                    Register New Payment
                  </DialogTitle>
                  <DialogDescription className="text-sm font-medium text-muted-foreground">
                    Apply a payment to any client&apos;s active loan.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <GlobalPaymentForm setOpen={setOpen} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
      <DrawerContent className="mx-auto w-full max-w-lg p-0 overflow-hidden border-0">
        <div className="bg-primary h-1.5 w-full" />
        <div className="p-4">
          <DrawerHeader className="text-left mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <CreditCard className="size-8 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold tracking-tight">
                  Register New Payment
                </DialogTitle>
                <DialogDescription className="text-sm font-medium text-muted-foreground">
                  Apply a payment to any client&apos;s active loan.
                </DialogDescription>
              </div>
            </div>
          </DrawerHeader>
          <GlobalPaymentForm setOpen={setOpen} isDrawer />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
