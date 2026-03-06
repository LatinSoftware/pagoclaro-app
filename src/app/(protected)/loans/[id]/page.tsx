import { getLoanById } from "@/actions/loans";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  User,
  Info,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Hash,
  Activity,
  Phone,
  MapPin,
  CalendarDays,
  Percent,
  RefreshCw,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { Status, InstallmentStatus } from "@/types/loan";
import { cn } from "@/lib/utils";
import { DisburseLoanButton } from "@/components/loans/DisburseLoanButton";
import { RegisterPaymentDialog } from "@/components/loans/RegisterPaymentDialog";
import { formatCurrency, formatDate } from "@/lib/utils/loan-helpers";
import { BackButton } from "@/components/ui/BackButton";

interface LoanDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function LoanDetailPage({ params }: LoanDetailPageProps) {
  const { id } = await params;
  const result = await getLoanById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const loan = result.data;

  const getStatusConfig = (status: Status) => {
    switch (status) {
      case Status.Active:
        return {
          label: "Active",
          className:
            "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
          icon: Activity,
        };
      case Status.PaidOff:
        return {
          label: "Paid Off",
          className:
            "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
          icon: CheckCircle2,
        };
      case Status.Defaulted:
        return {
          label: "Defaulted",
          className:
            "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
          icon: AlertCircle,
        };
      case Status.Cancelled:
        return {
          label: "Cancelled",
          className:
            "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20",
          icon: Info,
        };
      default:
        return {
          label: "Draft",
          className:
            "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
          icon: Clock,
        };
    }
  };

  const getInstallmentStatusConfig = (status: InstallmentStatus) => {
    switch (status) {
      case InstallmentStatus.Paid:
        return {
          label: "Paid",
          color:
            "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400",
        };
      case InstallmentStatus.Overdue:
        return {
          label: "Overdue",
          color: "text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400",
        };
      case InstallmentStatus.Partial:
        return {
          label: "Partial",
          color:
            "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400",
        };
      default:
        return {
          label: "Pending",
          color:
            "text-slate-600 bg-slate-50 dark:bg-slate-500/10 dark:text-slate-400",
        };
    }
  };

  const statusConfig = getStatusConfig(loan.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-background pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm px-4 sm:px-8 py-3 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackButton />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                Loan Details
              </h1>
              <div
                className={cn(
                  "px-2 sm:px-2.5 h-6 rounded-full border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm whitespace-nowrap",
                  statusConfig.className,
                )}
              >
                <StatusIcon className="h-3 w-3" />
                {statusConfig.label}
              </div>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-mono uppercase mt-0.5">
              ID: {loan.id.toUpperCase()}
            </p>
          </div>
        </div>
        {loan.status === Status.Draft && (
          <DisburseLoanButton loanId={loan.id} />
        )}
        {(loan.status === Status.Active || loan.status === Status.Defaulted) &&
          loan.outstanding_balance > 0 && (
            <RegisterPaymentDialog loanId={loan.id} />
          )}
      </div>

      <div className="container mx-auto p-4 md:p-8 space-y-8">
        {/* Main Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800 shadow-xl bg-linear-to-br from-card to-zinc-50/50 dark:to-zinc-900/50 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <ArrowDownLeft className="h-12 w-12 text-primary" />
            </div>
            <CardHeader className="pb-2">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Outstanding Balance
              </p>
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tighter text-foreground decoration-primary/30 underline-offset-8 break-words">
                {formatCurrency(loan.outstanding_balance)}
              </h2>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800 shadow-lg bg-card group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            </div>
            <CardHeader className="pb-2">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Total Paid
              </p>
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tighter text-emerald-600 dark:text-emerald-400 wrap-break-word">
                {formatCurrency(loan.total_paid)}
              </h2>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800 shadow-lg bg-card group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Wallet className="h-12 w-12 text-zinc-400" />
            </div>
            <CardHeader className="pb-2">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Original Capital
              </p>
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tighter break-words">
                {formatCurrency(loan.capital)}
              </h2>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Client & Loan Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Client Card */}
            <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
              <CardHeader className="bg-zinc-50 dark:bg-zinc-900 py-4 flex flex-row items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-tight">
                    Client Information
                  </h3>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                    Reference Details
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 uppercase font-black text-zinc-400">
                    {loan.client.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-black tracking-tight truncate leading-none mb-1">
                      {loan.client.name}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Hash className="h-3 w-3" /> {loan.client.cedula || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-8 w-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="font-medium">{loan.client.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-8 w-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="font-medium leading-tight">
                      {loan.client.address || "No address provided"}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Link href={`/clients/${loan.client_id}`}>
                    <Button
                      variant="outline"
                      className="w-full text-xs font-bold uppercase tracking-widest border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                    >
                      View Full Profile
                      <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Loan Terms Card */}
            <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
              <CardHeader className="bg-zinc-50 dark:bg-zinc-900 py-4 flex flex-row items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-tight">
                    Loan Terms
                  </h3>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                    Financial structure
                  </p>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-y-6 pt-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                    Total Payable
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {formatCurrency(loan.total_amount)}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                    Interest Rate
                  </span>
                  <span className="text-sm font-bold flex items-center gap-1">
                    <Percent className="h-3.5 w-3.5 text-zinc-400" />
                    {(loan.interest_rate * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                    Frequency
                  </span>
                  <span className="text-sm font-bold capitalize">
                    {loan.frequency}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                    Calculation
                  </span>
                  <span className="text-sm font-bold capitalize">
                    {loan.method}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                    Term Duration
                  </span>
                  <span className="text-sm font-bold">
                    {loan.term} Installments
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                    Disbursed At
                  </span>
                  <span className="text-sm font-bold">
                    {formatDate(loan.disbursement_date)}
                  </span>
                </div>
              </CardContent>
              {loan.notes && (
                <CardFooter className="bg-zinc-50/50 dark:bg-zinc-900/50 p-4 border-t">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                      Internal Notes
                    </span>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 italic line-clamp-3">
                      {loan.notes}
                    </p>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>

          {/* Right Column: Installments Table */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden min-h-[600px]">
              <CardHeader className="p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg uppercase tracking-tight">
                      Payment Schedule
                    </h3>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                      Installment tracking
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg border text-[10px] font-bold uppercase text-zinc-500">
                    <CalendarDays className="h-3 w-3" />
                    {formatDate(new Date())}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-[10px] uppercase font-black tracking-widest text-muted-foreground bg-zinc-50/50 dark:bg-zinc-900/50 border-b">
                      <tr>
                        <th className="px-6 py-4">N°</th>
                        <th className="px-6 py-4">Due Date</th>
                        <th className="px-6 py-4">Capital</th>
                        <th className="px-6 py-4">Interest</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4">Paid</th>
                        <th className="px-6 py-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {loan.installments.map((installment) => {
                        const installStatus = getInstallmentStatusConfig(
                          installment.status,
                        );
                        return (
                          <tr
                            key={installment.id}
                            className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                          >
                            <td className="px-6 py-4 font-mono font-bold text-zinc-400 group-hover:text-primary transition-colors">
                              {installment.installment_number
                                .toString()
                                .padStart(2, "0")}
                            </td>
                            <td className="px-6 py-4 font-semibold whitespace-nowrap">
                              {formatDate(installment.due_date)}
                            </td>
                            <td className="px-6 py-4 font-medium text-zinc-500">
                              {formatCurrency(installment.capital_amount)}
                            </td>
                            <td className="px-6 py-4 font-medium text-zinc-500">
                              {formatCurrency(installment.interest_amount)}
                            </td>
                            <td className="px-6 py-4 font-bold">
                              {formatCurrency(installment.total_due)}
                            </td>
                            <td className="px-6 py-4 font-bold text-emerald-600 dark:text-emerald-400">
                              {installment.amount_paid > 0
                                ? formatCurrency(installment.amount_paid)
                                : "-"}
                            </td>
                            <td className="px-6 py-4">
                              <div
                                className={cn(
                                  "px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider text-center border shadow-sm",
                                  installStatus.color,
                                )}
                              >
                                {installStatus.label}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {loan.installments.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
                    <CreditCard className="h-12 w-12 opacity-20 mb-4" />
                    <p className="font-bold uppercase tracking-widest text-xs">
                      No installments generated
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
