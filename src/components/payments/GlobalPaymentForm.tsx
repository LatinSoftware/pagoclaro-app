"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { toast } from "sonner";
import {
  CalendarIcon,
  Loader2,
  DollarSign,
  Briefcase,
  User,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { Loan, Status as LoanStatus } from "@/types/loan";
import {
  CreatePaymentFormValues,
  createPaymentSchema,
} from "@/lib/schemas/payment";
import { registerPaymentAction } from "@/actions/payments";
import { getLoans } from "@/actions/loans";
import { ClientCombobox } from "@/components/loans/ClientCombobox";
import { formatCurrency } from "@/lib/utils/loan-helpers";

interface GlobalPaymentFormProps {
  setOpen: (open: boolean) => void;
  isDrawer?: boolean;
  defaultClientId?: string;
}

export function GlobalPaymentForm({
  setOpen,
  isDrawer = false,
  defaultClientId = "",
}: GlobalPaymentFormProps) {
  const [isPending, startTransition] = useTransition();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoadingLoans, setIsLoadingLoans] = useState(false);
  const [selectedClientId, setSelectedClientId] =
    useState<string>(defaultClientId);

  const form = useForm<CreatePaymentFormValues>({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {
      amount: undefined,
      loan_id: "",
      payment_method: PaymentMethod.Cash,
      note: "",
      payment_date: new Date(),
    } as unknown as CreatePaymentFormValues,
  });

  const watchLoanId = form.watch("loan_id");

  // Watch for client selection to fetch their loans
  useEffect(() => {
    if (selectedClientId) {
      const fetchLoans = async () => {
        setIsLoadingLoans(true);
        // We fetch active loans for the client
        const result = await getLoans({
          status: LoanStatus.Active,
          client_id: selectedClientId,
          page: "1",
          limit: "100", // Get all active loans for selection
        });

        if (result.success && result.data) {
          const clientLoans = result.data.data;
          setLoans(clientLoans);

          if (clientLoans.length === 1) {
            form.setValue("loan_id", clientLoans[0].id);
          } else {
            form.setValue("loan_id", "");
          }
        }
        setIsLoadingLoans(false);
      };
      fetchLoans();
    } else {
      setLoans([]);
      form.setValue("loan_id", "");
    }
  }, [selectedClientId, form]);

  const onSubmit = (values: CreatePaymentFormValues) => {
    startTransition(async () => {
      const result = await registerPaymentAction(values);

      if (result.success) {
        toast.success("Payment registered successfully");
        setOpen(false);
        form.reset();
      } else {
        toast.error(result.error || "Failed to register payment");
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
    <div className={cn("space-y-6", isDrawer ? "px-4 pb-8" : "")}>
      <Form {...form}>
        <form
          id="global-payment-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Client Selection */}
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              <User className="size-3.5 text-muted-foreground" />
              Client
            </FormLabel>
            <FormControl>
              <ClientCombobox
                value={selectedClientId}
                onChange={(val) => setSelectedClientId(val)}
                disabled={!!defaultClientId}
              />
            </FormControl>
            <FormDescription>
              Select the client who is making the payment.
            </FormDescription>
          </FormItem>

          {/* Loan Selection (Dynamic) */}
          <FormField
            control={form.control}
            name="loan_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5">
                  <Briefcase className="size-3.5 text-muted-foreground" />
                  Loan / Debt
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={
                    !selectedClientId ||
                    isLoadingLoans ||
                    isPending ||
                    (loans.length === 0 && !isLoadingLoans)
                  }
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        "h-auto min-h-12 py-2 rounded-lg shadow-sm bg-background transition-colors hover:bg-accent/50 focus:ring-2 focus:ring-primary/20 w-full",
                        loans.length === 0 &&
                          selectedClientId &&
                          !isLoadingLoans &&
                          "text-destructive border-destructive/50",
                      )}
                    >
                      <SelectValue
                        placeholder={
                          isLoadingLoans
                            ? "Loading loans..."
                            : selectedClientId
                              ? loans.length === 0
                                ? "No active loans found"
                                : "Select a loan"
                              : "Select a client first"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-[--radix-select-trigger-width] min-w-[320px] p-1">
                    {loans.map((loan) => (
                      <SelectItem
                        key={loan.id}
                        value={loan.id}
                        className="rounded-md focus:bg-primary/5 cursor-pointer py-2.5"
                      >
                        <div className="flex flex-col gap-1 items-start">
                          <span className="font-semibold text-sm">
                            {formatCurrency(loan.total_amount || loan.capital)}{" "}
                            Loan
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span>
                              Balance:{" "}
                              <span className="text-foreground/90 font-medium">
                                {formatCurrency(loan.outstanding_balance)}
                              </span>
                            </span>
                            <span className="opacity-40">•</span>
                            <span className="font-mono text-[10px] opacity-70">
                              #{loan.id.slice(-6).toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Method */}
            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || PaymentMethod.Cash}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 min-w-[140px] rounded-lg shadow-sm bg-background transition-colors hover:bg-accent/50 focus:ring-2 focus:ring-primary/20 font-semibold uppercase text-xs tracking-wider">
                        <SelectValue placeholder="Select Method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="min-w-[140px]">
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

            {/* Date */}
            <FormField
              control={form.control}
              name="payment_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={isPending}
                          className={cn(
                            "w-full h-12 pl-3.5 text-left font-semibold uppercase text-xs tracking-wider rounded-lg shadow-sm bg-background transition-colors hover:bg-accent/50 focus:ring-2 focus:ring-primary/20",
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
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-5">
            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5">
                    <DollarSign className="size-3.5 text-muted-foreground" />
                    Amount to Pay
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground transition-colors group-focus-within:text-primary">
                        $
                      </span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined,
                          )
                        }
                        disabled={!watchLoanId || isPending}
                        className="pl-8 h-14 text-2xl font-bold rounded-lg shadow-sm bg-background transition-colors hover:bg-accent/50 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </FormControl>
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
                <FormLabel className="flex items-center gap-1.5">
                  <MessageSquare className="size-3.5 text-muted-foreground" />
                  Notes (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Reference #, bank details, etc..."
                    className="resize-none min-h-[100px] rounded-lg shadow-sm bg-background transition-colors hover:bg-accent/50 focus:ring-2 focus:ring-primary/20"
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
              disabled={isPending || !watchLoanId}
              className="w-full h-12 mt-2 shadow-lg font-bold"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Payment
            </Button>
          )}
        </form>
      </Form>

      {isDrawer && (
        <div className="flex flex-col gap-3 pt-4">
          <Button
            type="submit"
            form="global-payment-form"
            disabled={isPending || !watchLoanId}
            className="w-full h-12 shadow-lg font-bold"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Payment
          </Button>
        </div>
      )}
    </div>
  );
}
