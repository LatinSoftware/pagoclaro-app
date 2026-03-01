import { getClientProfile } from "@/actions/clients";
import { notFound } from "next/navigation";
import { ClientProfileHeader } from "@/components/clients/detail/ClientProfileHeader";
import { ClientTabs } from "@/components/clients/detail/ClientTabs";

interface ClientDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const resolvedParams = await params;
  const result = await getClientProfile(resolvedParams.id);

  if (!result.success || !result.data) {
    if (result.error?.includes("404")) {
      notFound();
    }
    
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-4 p-4 text-center">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">Ocurrió un error</h2>
        <p className="text-muted-foreground">{result.error || "No se pudo cargar el cliente."}</p>
      </div>
    );
  }

  const client = result.data;

  // Render using a responsive web layout
  return (
    <div className="w-full bg-white dark:bg-background">
      <div className="mx-auto max-w-5xl w-full flex flex-col">
        <ClientProfileHeader client={client} />
        <ClientTabs client={client} />
      </div>
    </div>
  );
}
