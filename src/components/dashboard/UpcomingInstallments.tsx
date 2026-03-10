import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Phone } from "lucide-react";
import type { UpcomingInstallment } from "@/types/dashboard";

interface UpcomingInstallmentsProps {
  installments: UpcomingInstallment[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 2,
  }).format(amount);
}

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    pending:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
    partial:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  };

  const labels: Record<string, string> = {
    pending: "Pendiente",
    partial: "Parcial",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${styles[status] ?? styles.pending}`}
    >
      {labels[status] ?? status}
    </span>
  );
}

export function UpcomingInstallments({
  installments,
}: UpcomingInstallmentsProps) {
  if (installments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarClock size={18} className="text-primary" />
            Próximos Vencimientos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No hay vencimientos próximos.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarClock size={18} className="text-primary" />
          Próximos Vencimientos
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Cliente
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Fecha
                </th>
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground">
                  Monto
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">
                  Teléfono
                </th>
                <th className="text-center px-4 py-3 font-semibold text-muted-foreground">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {installments.map((item, index) => (
                <tr
                  key={`${item.clientName}-${item.dueDate}-${index}`}
                  className="border-b last:border-b-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {item.clientName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(item.dueDate).toLocaleDateString("es-DO", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-foreground">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    <span className="flex items-center gap-1">
                      <Phone size={12} className="text-muted-foreground/60" />
                      {item.clientPhone}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {getStatusBadge(item.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
