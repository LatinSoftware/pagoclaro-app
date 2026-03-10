import {
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  CalendarCheck,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardKpis } from "@/types/dashboard";

interface KpiCardsProps {
  kpis: DashboardKpis;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 2,
  }).format(amount);
}

const kpiConfig = [
  {
    key: "activeCapital" as const,
    label: "Capital Prestado",
    icon: DollarSign,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/40",
    format: formatCurrency,
  },
  {
    key: "totalCollected" as const,
    label: "Total Cobrado",
    icon: TrendingUp,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/40",
    format: formatCurrency,
  },
  {
    key: "pendingBalance" as const,
    label: "Balance Pendiente",
    icon: Clock,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/40",
    format: formatCurrency,
  },
  {
    key: "overdueAmount" as const,
    label: "Monto en Mora",
    icon: AlertTriangle,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/40",
    format: formatCurrency,
  },
  {
    key: "todayCollections" as const,
    label: "Cobros de Hoy",
    icon: CalendarCheck,
    color: "text-primary",
    bgColor: "bg-primary/10",
    format: formatCurrency,
  },
  {
    key: "activeClients" as const,
    label: "Clientes Activos",
    icon: Users,
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-900/40",
    format: (val: number) => val.toString(),
  },
];

export function KpiCards({ kpis }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpiConfig.map((cfg) => {
        const Icon = cfg.icon;
        const value = kpis[cfg.key];
        return (
          <Card
            key={cfg.key}
            className="hover:shadow-md transition-shadow duration-200 border-l-4"
            style={{
              borderLeftColor: `var(--color-${cfg.key === "todayCollections" ? "primary" : ""})`,
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-1.5 rounded-lg ${cfg.bgColor}`}>
                  <Icon size={16} className={cfg.color} />
                </div>
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {cfg.label}
              </p>
              <p className="text-lg font-bold text-foreground tracking-tight">
                {cfg.format(value)}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
