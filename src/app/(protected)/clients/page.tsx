import { api } from "@/lib/api";
import { ClientListResponse, ClientFilters, ClientStatus } from "@/types/client";
import { UserPlus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientFilters as FilterControls } from "@/components/clients/ClientFilters";
import { ClientTable } from "@/components/clients/ClientTable";
import { getErrorMessage } from "@/lib/error-handler";
import Link from "next/link";

interface ClientsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  const params = await searchParams;
  
  const filters: ClientFilters = {
    search: params.search,
    status: params.status as ClientStatus,
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
  };

  let clientData: ClientListResponse | null = null;
  let fetchError: string | null = null;

  try {
    clientData = await api.get<ClientListResponse>("/clients", {
      params: filters
    });
  } catch (error) {
    fetchError = getErrorMessage(error);
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Client Directory</h1>
          <p className="text-sm text-muted-foreground">Manage your relationships and track payments.</p>
        </div>
        <Link href="/clients/new">
          <Button className="rounded-lg shadow-sm">
            <UserPlus size={18} className="mr-2" />
            <span className="hidden sm:inline">Add Client</span>
            <span className="sm:hidden">+</span>
          </Button>
        </Link>
      </header>

      {/* Search & Filter Bar */}
      <FilterControls />

      {/* Error State */}
      {fetchError && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{fetchError}</p>
        </div>
      )}

      {/* Client List */}
      <ClientTable clients={clientData?.data || []} />
    </div>
  );
}
