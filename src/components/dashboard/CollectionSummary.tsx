import {
  CalendarClock,
  CalendarDays,
  AlertOctagon,
  ShieldAlert,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { CollectionSummary as CollectionSummaryType } from "@/types/dashboard";

interface CollectionSummaryProps {
  summary: CollectionSummaryType;
}

const summaryConfig = [
  {
    key: "installmentsDueToday" as const,
    label: "Cuotas para Hoy",
    icon: CalendarClock,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/30",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    key: "installmentsDueThisWeek" as const,
    label: "Cuotas esta Semana",
    icon: CalendarDays,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/30",
    borderColor: "border-indigo-200 dark:border-indigo-800",
  },
  {
    key: "overdueInstallments" as const,
    label: "Cuotas Vencidas",
    icon: AlertOctagon,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-900/30",
    borderColor: "border-red-200 dark:border-red-800",
  },
  {
    key: "loansAtRisk" as const,
    label: "Préstamos en Riesgo",
    icon: ShieldAlert,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/30",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
];

export function CollectionSummary({ summary }: CollectionSummaryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {summaryConfig.map((cfg) => {
        const Icon = cfg.icon;
        const value = summary[cfg.key];
        const isHighlight =
          cfg.key === "overdueInstallments" || cfg.key === "loansAtRisk";

        return (
          <Card
            key={cfg.key}
            className={`${cfg.borderColor} ${isHighlight && value > 0 ? "ring-1 ring-red-300 dark:ring-red-700" : ""} transition-all hover:shadow-sm`}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2.5 rounded-xl ${cfg.bgColor}`}>
                <Icon size={20} className={cfg.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground font-medium">
                  {cfg.label}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
