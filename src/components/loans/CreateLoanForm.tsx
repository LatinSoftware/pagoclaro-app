"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { toast } from "sonner";
import {
  DollarSign,
  Percent,
  Calendar,
  Hash,
  User,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  createLoanSchema,
  type CreateLoanFormValues,
} from "@/lib/schemas/create-loan";
import { createLoanAction } from "@/actions/loans";
import { FREQUENCY_LABELS, METHOD_LABELS } from "@/lib/utils/loan-helpers";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export function CreateLoanForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<CreateLoanFormValues>({
    resolver: zodResolver(createLoanSchema),
    defaultValues: {
      client_id: "",
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="client_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <User className="size-3.5 text-muted-foreground" />
                      Client ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      UUID of the client receiving this loan.
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Rate & Term ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Frequency & Method ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Frequency</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-12 w-full rounded-lg border border-input bg-transparent px-4 py-1 text-base shadow-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                        value={field.value ?? ""}
                      >
                        <option value="" disabled>
                          Select frequency…
                        </option>
                        {Object.entries(FREQUENCY_LABELS).map(
                          ([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ),
                        )}
                      </select>
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
                    <FormLabel>Calculation Method</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-12 w-full rounded-lg border border-input bg-transparent px-4 py-1 text-base shadow-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                        value={field.value ?? ""}
                      >
                        <option value="" disabled>
                          Select method…
                        </option>
                        {Object.entries(METHOD_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Date & Notes ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="disbursement_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-muted-foreground" />
                      Disbursement Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel>Notes (optional)</FormLabel>
                    <FormControl>
                      <textarea
                        className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-4 py-3 text-base shadow-sm transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                        placeholder="Add any additional notes about this loan…"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
