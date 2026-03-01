import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loan } from "@/types/client";
import { Calendar, CreditCard, ChevronRight } from "lucide-react";

interface ClientActiveLoansProps {
  loans: Loan[];
}

export function ClientActiveLoans({ loans }: ClientActiveLoansProps) {
  if (!loans || loans.length === 0) {
    return (
      <Card className="mb-6">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <CreditCard className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
          <p className="text-lg font-medium">No hay préstamos activos</p>
          <p className="text-sm text-muted-foreground">Este cliente no tiene ningún préstamo en este momento.</p>
        </CardContent>
      </Card>
    );
  }

  const formatMoney = (amount: number) => 
    new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP" }).format(amount);

  const getStatusBadge = (status: Loan["status"]) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200 uppercase tracking-wider">
            Activo
          </span>
        );
      case "PAID":
        return (
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200 uppercase tracking-wider">
            Saldado
          </span>
        );
      case "DEFAULT":
        return (
          <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-700 border border-red-200 uppercase tracking-wider">
            Atrasado
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-6 space-y-6 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold uppercase ">
        Active Loans
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {loans.map((loan) => (
          <Card key={loan.id} className="relative flex flex-col overflow-hidden group hover:border-slate-900 dark:hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl border-zinc-200">
            <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50">
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Loan Identity</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-200">ID: {loan.id.slice(0, 12).toUpperCase()}</p>
                </div>
                {getStatusBadge(loan.status)}
              </div>
              <div className="mt-2">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Current Balance</p>
                <div className="text-3xl font-bold text-slate-900 dark:text-primary tracking-tighter">
                  {formatMoney(loan.currentBalance)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="py-6 flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Initial Capital</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">{formatMoney(loan.initialCapital)}</span>
                </div>
                {loan.nextInstallmentDate && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Next Payment
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                      {new Date(loan.nextInstallmentDate).toLocaleDateString("es-DO", { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="pt-2 pb-6 px-6">
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-primary dark:text-background font-bold uppercase tracking-widest h-12 rounded-xl transition-all group-hover:scale-[1.02]">
                View Installments
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
