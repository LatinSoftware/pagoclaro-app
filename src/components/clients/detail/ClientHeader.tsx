import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FinancialStatus } from "@/types/client";
import { PlusCircle, Banknote, MessageCircle } from "lucide-react";

interface ClientHeaderProps {
  name: string;
  financialStatus: FinancialStatus;
  pendingBalance: number;
  nextInstallmentDate?: string;
  nextInstallmentAmount?: number;
  phone: string;
}

export function ClientHeader({
  name,
  financialStatus,
  pendingBalance,
  nextInstallmentDate,
  nextInstallmentAmount,
  phone,
}: ClientHeaderProps) {
  const getBadgeConfig = (status: FinancialStatus) => {
    switch (status) {
      case "AL_DIA":
        return { label: "Al día", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" };
      case "PARCIAL":
        return { label: "Parcial", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" };
      case "EN_MORA":
        return { label: "En mora", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" };
      default:
        return { label: "Desconocido", className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" };
    }
  };

  const badge = getBadgeConfig(financialStatus);
  const formattedBalance = new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP" }).format(pendingBalance);
  
  const whatsappLink = `https://wa.me/${phone.replace(/\D/g, '')}`;

  return (
    <Card className="mb-6 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}>
                {badge.label}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Balance pendiente</p>
                <p className="text-xl font-semibold">{formattedBalance}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Próxima cuota</p>
                {nextInstallmentDate ? (
                  <p className="text-xl font-semibold">
                    {new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP" }).format(nextInstallmentAmount || 0)}
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                       (hasta {new Date(nextInstallmentDate).toLocaleDateString("es-DO")})
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">No hay pagos pendientes</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2">
            <Button size="sm" className="w-full md:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo préstamo
            </Button>
            <Button size="sm" variant="secondary" className="w-full md:w-auto">
              <Banknote className="mr-2 h-4 w-4" />
              Registrar pago
            </Button>
            <Button size="sm" variant="outline" className="w-full md:w-auto border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700 dark:border-green-900/50 dark:text-green-400 dark:hover:bg-green-900/20" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Enviar WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
