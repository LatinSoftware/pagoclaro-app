import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import type { AttentionItem } from "@/types/dashboard";

interface AttentionTableProps {
  items: AttentionItem[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    overdue: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    partial:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    pending:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  };

  const labels: Record<string, string> = {
    overdue: "Overdue",
    partial: "Partial",
    pending: "Pending",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${styles[status] ?? styles.pending}`}
    >
      {labels[status] ?? status}
    </span>
  );
}

export function AttentionTable({ items }: AttentionTableProps) {
  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" />
            Requires Attention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">
              🎉 No installments require immediate attention.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-500" />
          Requires Attention
          <span className="ml-auto text-xs font-normal text-muted-foreground">
            Sorted by priority
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Client
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">
                  Phone
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Next Due Date
                </th>
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground">
                  Amount
                </th>
                <th className="text-center px-4 py-3 font-semibold text-muted-foreground">
                  Status
                </th>
                <th className="text-center px-4 py-3 font-semibold text-muted-foreground">
                  Days Overdue
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={`${item.loanId}-${item.nextDueDate}-${index}`}
                  className="border-b last:border-b-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {item.clientName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    {item.clientPhone}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(item.nextDueDate).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-foreground">
                    {formatCurrency(item.amountDue)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center justify-center min-w-8 px-2 py-0.5 rounded-full text-xs font-bold ${
                        item.daysOverdue > 7
                          ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                          : item.daysOverdue > 3
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {item.daysOverdue}d
                    </span>
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
