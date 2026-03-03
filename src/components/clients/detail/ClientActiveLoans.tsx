import { getLoans } from "@/actions/loans";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard, ChevronRight, Activity, CalendarDays } from "lucide-react";
import { Status } from "@/types/loan";
import Link from "next/link";

interface ClientActiveLoansProps {
  clientId: string;
}

export async function ClientActiveLoans({ clientId }: ClientActiveLoansProps) {
  const result = await getLoans({ client_id: clientId, limit: "100" });

  if (!result.success || !result.data || result.data.data.length === 0) {
    return (
      <Card className="mb-6 overflow-hidden border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <CreditCard className="h-8 w-8 text-muted-foreground opacity-70" />
          </div>
          <h3 className="text-xl font-bold font-heading mb-2">No active loans found</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            This client does not have any registered loans at this time.
          </p>
        </CardContent>
      </Card>
    );
  }

  const loans = result.data.data;

  const formatMoney = (amount: number) => 
    new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP" }).format(amount);

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case Status.Active:
        return (
          <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 uppercase tracking-wider">
            Active
          </span>
        );
      case Status.PaidOff:
        return (
          <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 uppercase tracking-wider">
            Paid Off
          </span>
        );
      case Status.Defaulted:
        return (
          <span className="inline-flex items-center rounded-full bg-red-50 dark:bg-red-500/10 px-2.5 py-0.5 text-xs font-bold text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20 uppercase tracking-wider">
            Defaulted
          </span>
        );
      case Status.Draft:
        return (
          <span className="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 uppercase tracking-wider">
            Draft
          </span>
        );
      case Status.Cancelled:
        return (
          <span className="inline-flex items-center rounded-full bg-slate-50 dark:bg-slate-500/10 px-2.5 py-0.5 text-xs font-bold text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-500/20 uppercase tracking-wider">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Loans History
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6 items-stretch">
        {loans.map((loan) => (
          <Card key={loan.id} className="relative flex flex-col overflow-hidden group hover:border-slate-900 dark:hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl border-zinc-200 dark:border-zinc-800 bg-card">
            <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/20">
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Loan Identity</p>
                  <p className="text-sm font-bold text-foreground">ID: {loan.id.slice(0, 12).toUpperCase()}</p>
                </div>
                {getStatusBadge(loan.status)}
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Outstanding Balance</p>
                <div className="text-4xl font-bold text-foreground tracking-tighter">
                  {formatMoney(loan.outstanding_balance)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="py-6 flex-1 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Capital</span>
                  <span className="text-sm font-semibold text-foreground">{formatMoney(loan.capital)}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Total Amount</span>
                  <span className="text-sm font-semibold text-foreground">{formatMoney(loan.total_amount)}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Total Paid</span>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{formatMoney(loan.total_paid)}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Rate & Term</span>
                  <span className="text-sm font-semibold text-foreground">{(loan.interest_rate * 100).toFixed(2)}% - {loan.term} terms</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex align-middle justify-between">
                 <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" /> Disbursal
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {new Date(loan.disbursement_date).toLocaleDateString("es-DO", { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                   <div className="space-y-1 text-right">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1 justify-end">
                      <Calendar className="h-3 w-3" /> Created
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                       {new Date(loan.created_at).toLocaleDateString("es-DO", { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-2 pb-6 px-6">
              <Link href={`/loans/${loan.id}`} className="w-full">
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-primary dark:text-background font-bold uppercase tracking-widest h-12 rounded-xl transition-all group-hover:scale-[1.02] shadow-sm">
                  View Details
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

