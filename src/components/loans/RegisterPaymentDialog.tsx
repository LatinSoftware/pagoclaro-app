"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CalendarIcon, Loader2, CreditCard } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { PaymentMethod } from "@/types/payment";
import {
  CreatePaymentFormValues,
  createPaymentSchema,
} from "@/lib/schemas/payment";
import { registerPaymentAction } from "@/actions/payments";

interface RegisterPaymentDialogProps {
  loanId: string;
}

export function RegisterPaymentDialog({ loanId }: RegisterPaymentDialogProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto font-bold tracking-widest uppercase shadow-xl transition-all hover:scale-105 active:scale-95 bg-primary text-primary-foreground">
            <CreditCard className="mr-2 h-4 w-4" />
            Register Payment
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold uppercase tracking-tight">
              Register Payment
            </DialogTitle>
            <DialogDescription className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
              Apply a new payment to this loan.
            </DialogDescription>
          </DialogHeader>
          <PaymentForm loanId={loanId} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full sm:w-auto font-bold tracking-widest uppercase shadow-xl transition-all hover:scale-105 active:scale-95 bg-primary text-primary-foreground">
          <CreditCard className="mr-2 h-4 w-4" />
          Register Payment
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-full max-w-lg">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl font-bold uppercase tracking-tight">
            Register Payment
          </DrawerTitle>
          <DrawerDescription className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
            Apply a new payment to this loan.
          </DrawerDescription>
        </DrawerHeader>
        <PaymentForm loanId={loanId} setOpen={setOpen} isDrawer />
      </DrawerContent>
    </Drawer>
  );
}

function PaymentForm({
  loanId,
  setOpen,
  className,
  isDrawer = false,
}: React.ComponentProps<"form"> & {
  loanId: string;
  setOpen: (open: boolean) => void;
  isDrawer?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreatePaymentFormValues>({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {
      amount: "",
      loan_id: loanId,
      payment_method: "",
      note: "",
      payment_date: new Date(),
    } as unknown as CreatePaymentFormValues,
  });

  const onSubmit = (values: CreatePaymentFormValues) => {
    startTransition(async () => {
      const result = await registerPaymentAction(values);

      if (result.success) {
        toast.success("Payment registered successfully", {
          description: "The payment has been allocated to the loan.",
        });
        setOpen(false);
        form.reset();
      } else {
        toast.error("Failed to register payment", {
          description: result.error || "An unknown error occurred.",
        });

        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, message]) => {
            form.setError(field as keyof CreatePaymentFormValues, {
              type: "server",
              message,
            });
          });
        }
      }
    });
  };

  return (
    <div className={cn(isDrawer ? "px-4 pb-0" : "", className)}>
      <Form {...form}>
        <form
          id="payment-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Amount
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : "",
                        )
                      }
                      disabled={isPending}
                      className="pl-7 font-mono font-bold text-lg"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Method
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="font-semibold uppercase text-xs tracking-wider">
                        <SelectValue placeholder="Select Method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value={PaymentMethod.Cash}
                        className="font-semibold uppercase text-xs tracking-wider"
                      >
                        Cash
                      </SelectItem>
                      <SelectItem
                        value={PaymentMethod.Transfer}
                        className="font-semibold uppercase text-xs tracking-wider"
                      >
                        Transfer
                      </SelectItem>
                      <SelectItem
                        value={PaymentMethod.Other}
                        className="font-semibold uppercase text-xs tracking-wider"
                      >
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_date"
              render={({ field }) => (
                <FormItem className="flex flex-col pt-1">
                  <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">
                    Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={isPending}
                          className={cn(
                            "w-full pl-3 text-left font-semibold uppercase text-xs tracking-wider",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Notes (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any relevant details about this payment..."
                    className="resize-none"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!isDrawer && (
            <Button
              type="submit"
              disabled={isPending}
              className="w-full mt-4 font-bold uppercase tracking-widest"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Payment
            </Button>
          )}
        </form>
      </Form>

      {isDrawer && (
        <DrawerFooter className="px-0 pt-4">
          <Button
            type="submit"
            form="payment-form"
            disabled={isPending}
            className="w-full font-bold uppercase tracking-widest"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Payment
          </Button>
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="w-full font-bold uppercase tracking-widest"
              disabled={isPending}
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      )}
    </div>
  );
}
