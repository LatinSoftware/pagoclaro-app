import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Client } from "@/types/client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { formatDate } from "@/lib/utils/loan-helpers";

interface ClientTableProps {
  clients: Client[];
}

export function ClientTable({ clients }: ClientTableProps) {
  if (clients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="bg-muted rounded-full p-4 text-muted-foreground">
          <ChevronRight size={32} />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-lg">No clients found</p>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {clients.map((client) => (
        <Link
          key={client.id}
          href={`/clients/${client.id}`}
          className="block bg-card hover:bg-muted/50 p-4 rounded-xl shadow-sm border border-border group hover:border-primary/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg overflow-hidden relative border border-primary/5">
                {client.photoUrl ? (
                  <Image
                    className="w-full h-full object-cover"
                    src={client.photoUrl}
                    alt={client.name}
                  />
                ) : (
                  <span>{client.name.substring(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {client.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  ID: {client.cedula} • Last Pay:{" "}
                  {client.lastPaymentDate
                    ? formatDate(client.lastPaymentDate)
                    : "Never"}
                </span>
                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      client.status === "active" && "bg-emerald-500",
                      // client.status === 'overdue' && "bg-amber-500",
                      client.status === "inactive" && "bg-slate-400",
                      // client.status === 'new' && "bg-blue-500",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] uppercase font-bold tracking-wider",
                      client.status === "active" &&
                        "text-emerald-600 dark:text-emerald-400",
                      // client.status === 'overdue' && "text-amber-600 dark:text-amber-400",
                      client.status === "inactive" && "text-slate-500",
                      // client.status === 'new' && "text-blue-600 dark:text-blue-400",
                    )}
                  >
                    {client.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right flex flex-col items-end">
              <span className={cn("text-sm font-bold")}>
                $
                {(client.pendingBalance ?? 0).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium">
                Balance
              </span>
              <ChevronRight className="text-muted-foreground group-hover:text-primary mt-1 transition-colors size-4" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
