import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ClientProfile, FinancialStatus } from "@/types/client";
import { 
  PlusCircle, 
  Banknote, 
  MessageCircle, 
  ChevronLeft, 
  Activity, 
  Wallet, 
  CalendarClock, 
  ChevronRight,
  ArrowDownLeft,
  CircleCheck,
  AlertTriangle,
  Info,
  Shield,
  Clock,
  Verified
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EditClientBasicInfoDialog } from "./EditClientBasicInfoDialog";

interface ClientHeaderProps {
  client: ClientProfile;
}

export function ClientHeader({ client }: ClientHeaderProps) {
  const getBadgeConfig = (status: FinancialStatus) => {
    switch (status) {
      case "AL_DIA":
        return { 
          label: "Al día", 
          className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
          icon: CircleCheck 
        };
      case "PARCIAL":
        return { 
          label: "Parcial", 
          className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
          icon: Info 
        };
      case "EN_MORA":
        return { 
          label: "En mora", 
          className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
          icon: AlertTriangle 
        };
      default:
        return { 
          label: "Desconocido", 
          className: "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-500/10 dark:text-zinc-400 dark:border-zinc-500/20",
          icon: Activity 
        };
    }
  };

  const badge = getBadgeConfig(client.financialStatus);
  const StatusIcon = badge.icon;
  
  const formatMoney = (amount: number) => 
    new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP" }).format(amount);

  const formattedBalance = formatMoney(client.pendingBalance);
  
  const whatsappLink = `https://wa.me/${client.phone.replace(/\D/g, '')}`;
  const avatarUrl = client.photoUrl || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=256&auto=format&fit=crop";

  return (
    <div className="w-full space-y-0">
      {/* Sticky Control Bar */}
      <div className="sticky top-0 z-30 w-full border-b border-primary/10 bg-white/80 dark:bg-background/80 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between shadow-sm">
        <Link 
          href="/clients"
          className="text-primary flex h-9 w-9 shrink-0 items-center justify-center cursor-pointer hover:bg-primary/10 rounded-full transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-foreground text-sm font-bold leading-tight tracking-tight uppercase flex-1 text-center">
          Client Profile
        </h2>
        <div className="flex items-center gap-2">
           <EditClientBasicInfoDialog client={client} />
        </div>
      </div>

      <div className="p-6 md:p-8 bg-linear-to-b from-primary/5 to-transparent flex flex-col items-center md:flex-row md:justify-between gap-6 border-b border-zinc-100 dark:border-zinc-800/50">
        <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-6 text-center md:text-left">
          <div className="relative group cursor-pointer">
            <div 
              className="bg-primary/20 aspect-square rounded-full h-24 w-24 md:h-28 md:w-28 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-cover bg-center group-hover:scale-105"
              style={{ backgroundImage: `url('${avatarUrl}')` }}
            />
            <div className="absolute bottom-1 right-1 h-7 w-7 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full flex items-center justify-center shadow-sm">
              <Verified className="text-white h-4 w-4" />
            </div>
          </div>
          
          <div className="flex flex-col space-y-1 md:space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase">{client.name}</h1>
              <div className={cn("hidden md:flex px-2 py-0.5 rounded-md border text-[10px] items-center gap-1 shadow-sm font-black uppercase tracking-widest", badge.className)}>
                <StatusIcon className="h-3.5 w-3.5" />
                {badge.label}
              </div>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 font-mono text-sm uppercase tracking-widest">ID: {client.cedula}</p>
            <div className={cn("flex md:hidden px-2 py-0.5 mt-2 rounded-md border text-[10px] items-center justify-center w-fit mx-auto gap-1 shadow-sm font-black uppercase tracking-widest", badge.className)}>
               <StatusIcon className="h-3.5 w-3.5" />
               {badge.label}
            </div>
          </div>
        </div>

        {/* Dynamic Badges */}
        <div className="flex gap-3 w-full max-w-sm md:max-w-md md:w-auto">
          <div className="flex-1 md:w-32 flex flex-col items-center justify-center py-2.5 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 shadow-sm transition-all hover:-translate-y-1">
            <span className="text-[10px] uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold mb-1">
              Risk Score
            </span>
            <div className="flex items-center gap-1 text-emerald-800 dark:text-emerald-300 font-black">
              <Shield className="h-4 w-4" />
              <span>{client.riskScore || "Low"}</span>
            </div>
          </div>
          <div className="flex-1 md:w-32 flex flex-col items-center justify-center py-2.5 px-4 rounded-xl bg-primary/5 dark:bg-primary/20 border border-primary/20 shadow-sm transition-all hover:-translate-y-1">
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">
              Punctuality
            </span>
            <div className="flex items-center gap-1 text-primary font-black">
              <Clock className="h-4 w-4" />
              <span>{client.punctuality ?? 100}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 pt-8 pb-4">
        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800 shadow-xl bg-linear-to-br from-card to-zinc-50/50 dark:to-zinc-900/50 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
               <ArrowDownLeft className="h-12 w-12 text-primary" />
            </div>
            <CardContent className="pt-6">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Balance Pendiente</p>
              <h2 className="text-4xl font-black tracking-tighter text-foreground decoration-primary/30 underline-offset-8">
                {formattedBalance}
              </h2>
              <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                <Wallet className="h-3 w-3" />
                Current Outstanding
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800 shadow-lg bg-card group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
               <CalendarClock className="h-12 w-12 text-amber-500" />
            </div>
            <CardContent className="pt-6">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Próxima Cuota</p>
              {client.nextInstallmentDate ? (
                <>
                  <h2 className="text-4xl font-black tracking-tighter text-amber-600 dark:text-amber-400">
                    {formatMoney(client.nextInstallmentAmount || 0)}
                  </h2>
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                     Vencimiento: {new Date(client.nextInstallmentDate).toLocaleDateString("es-DO", { day: '2-digit', month: 'short' })}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-black tracking-tighter text-emerald-600 dark:text-emerald-400 opacity-50">
                    ---
                  </h2>
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                    Sin cobros pendientes
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Action Card for quick navigation */}
          <Card className="bg-slate-900 dark:bg-primary border-none shadow-xl overflow-hidden group">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="p-6 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2">
                   <p className="text-[10px] font-black text-white/50 dark:text-background/50 uppercase tracking-widest">Quick Actions</p>
                   <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-white dark:bg-background/10 dark:hover:bg-background/30 text-white dark:text-background border-none" asChild>
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-3 w-3" />
                      </a>
                   </Button>
                </div>
                
                <div className="flex flex-col gap-2 mt-2">
                  <Button className="justify-between bg-white/10 hover:bg-white/20 text-white dark:bg-background/10 dark:hover:bg-background/20 dark:text-background border-none group/btn shadow-none h-10">
                    <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                      <PlusCircle className="h-4 w-4" />
                      Nuevo Préstamo
                    </div>
                    <ChevronRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                  <Button className="justify-between bg-white text-slate-900 hover:bg-zinc-100 dark:bg-background dark:text-primary dark:hover:bg-zinc-50 border-none group/btn shadow-none h-10">
                    <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                      <Banknote className="h-4 w-4" />
                      Registrar Pago
                    </div>
                    <ChevronRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}