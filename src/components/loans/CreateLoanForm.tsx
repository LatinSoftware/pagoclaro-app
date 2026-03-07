"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { toast } from "sonner";
import {
  DollarSign,
  Percent,
  CalendarIcon,
  Hash,
  User,
  FileText,
  Loader2,
  AlertCircle,
  Activity,
  Calculator,
  MessageSquare,
} from "lucide-react";

import { format } from "date-fns";
import { cn } from "@/lib/utils";

import {
  createLoanSchema,
  type CreateLoanFormValues,
} from "@/lib/schemas/create-loan";
import { createLoanAction } from "@/actions/loans";
import { FREQUENCY_LABELS, METHOD_LABELS } from "@/lib/utils/loan-helpers";
import { ClientCombobox } from "@/components/loans/ClientCombobox";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

interface CreateLoanFormProps {
  defaultClientId?: string;
}

export function CreateLoanForm({ defaultClientId = "" }: CreateLoanFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<CreateLoanFormValues>({
    resolver: zodResolver(createLoanSchema),
    defaultValues: {
      client_id: defaultClientId,
      capital: undefined,
      interest_rate: undefined,
      term: undefined,
      frequency: undefined,
      method: undefined,
      disbursement_date: "",
      notes: "",
    },
  });

  function onSubmit(values: CreateLoanFormValues) {
    setServerError(null);

    startTransition(async () => {
      const result = await createLoanAction(values);

      if (result.success && result.data) {
        toast.success("Loan created successfully!");
        router.push(`/loans/${result.data.id}`);
      } else if (result.fieldErrors) {
        // Set server-side field errors onto the form
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          form.setError(field as keyof CreateLoanFormValues, {
            type: "server",
            message,
          });
        }
      } else {
        setServerError(result.error || "An unexpected error occurred.");
      }
    });
  }

  return (
    <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="size-5 text-primary" />
          Loan Details
        </CardTitle>
        <CardDescription>
          Fill in the loan information. Interest rate is entered as a percentage
          (e.g. 5 = 5%).
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Server Error Banner */}
        {serverError && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive animate-in fade-in slide-in-from-top-1 duration-300">
            <AlertCircle className="size-5 shrink-0" />
            <p className="text-sm font-medium">{serverError}</p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* ── Client & Capital ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <FormField
                control={form.control}
                name="client_id"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <User className="size-3.5 text-muted-foreground" />
                      Client
                    </FormLabel>
                    <FormControl>
                      <ClientCombobox
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                    <FormDescription>
                      Search and select the client receiving this loan.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <DollarSign className="size-3.5 text-muted-foreground" />
                      Capital (DOP)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="0.00"
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : parseFloat(e.target.value),
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      The total amount of money to be lent.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Rate & Term ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <FormField
                control={form.control}
                name="interest_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <Percent className="size-3.5 text-muted-foreground" />
                      Interest Rate (%)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        step="0.01"
                        placeholder="5"
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : parseFloat(e.target.value),
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Entered as percentage. 5 = 5%.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <Hash className="size-3.5 text-muted-foreground" />
                      Term (installments)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        step="1"
                        placeholder="12"
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : parseInt(e.target.value, 10),
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Total number of payments for this loan.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Frequency & Method ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <Activity className="size-3.5 text-muted-foreground" />
                      Payment Frequency
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full h-12 shadow-sm rounded-lg border-input">
                          <SelectValue placeholder="Select frequency…" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(FREQUENCY_LABELS).map(
                            ([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <Calculator className="size-3.5 text-muted-foreground" />
                      Calculation Method
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full h-12 shadow-sm rounded-lg border-input">
                          <SelectValue placeholder="Select method…" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(METHOD_LABELS).map(
                            ([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Date & Notes ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <FormField
                control={form.control}
                name="disbursement_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <CalendarIcon className="size-3.5 text-muted-foreground" />
                      Disbursement Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal border-input h-12 shadow-sm rounded-lg",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value + "T12:00:00"), "PPP")
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
                          selected={
                            field.value
                              ? new Date(field.value + "T12:00:00")
                              : undefined
                          }
                          onSelect={(date) => {
                            if (date) {
                              const yyyy = date.getFullYear();
                              const mm = String(date.getMonth() + 1).padStart(
                                2,
                                "0",
                              );
                              const dd = String(date.getDate()).padStart(
                                2,
                                "0",
                              );
                              field.onChange(`${yyyy}-${mm}-${dd}`);
                            } else {
                              field.onChange("");
                            }
                          }}
                          disabled={(date) => date < new Date("1900-01-01")}
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
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5">
                    <MessageSquare className="size-3.5 text-muted-foreground" />
                    Notes (optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes about this loan…"
                      className="min-h-[100px] resize-none shadow-sm rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ── Actions ── */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isPending}
                className="sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="sm:w-auto min-w-[140px]"
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Creating…
                  </>
                ) : (
                  "Create Loan"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
