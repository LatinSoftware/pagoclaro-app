import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientTimelineEvent } from "@/types/client";
import { CheckCircle2, AlertTriangle, FileText, Activity } from "lucide-react";

interface ClientTimelineProps {
  events: ClientTimelineEvent[];
}

export function ClientTimeline({ events }: ClientTimelineProps) {
  if (!events || events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Historial de Eventos</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-6 text-muted-foreground">
          Aún no hay eventos registrados para este cliente.
        </CardContent>
      </Card>
    );
  }

  const getEventIcon = (type: ClientTimelineEvent["type"]) => {
    switch (type) {
      case "PAYMENT":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "LATE_PAYMENT":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "LOAN_CREATED":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "OTHER":
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-xl font-semibold tracking-tight">Historial de Eventos</h2>
      <div className="relative border-l border-muted ml-3 space-y-8 py-2">
        {events.map((event, index) => (
          <div key={event.id || index} className="relative pl-8">
            <span className="absolute -left-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-background ring-4 ring-white dark:ring-background shadow-sm border border-muted">
              {getEventIcon(event.type)}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{event.description}</h3>
                <p className="text-sm text-muted-foreground mt-1">Evento de sistema</p>
              </div>
              <time className="text-sm text-slate-500 font-medium whitespace-nowrap bg-muted/50 px-2 py-1 rounded">
                {new Date(event.date).toLocaleDateString("es-DO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
