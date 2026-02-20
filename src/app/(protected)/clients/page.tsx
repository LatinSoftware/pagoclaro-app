import { api } from "@/lib/api";
import { ClientListResponse, ClientFilters, ClientStatus } from "@/types/client";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientFilters as FilterControls } from "@/components/clients/ClientFilters";
import { ClientTable } from "@/components/clients/ClientTable";

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

  let clientData: ClientListResponse = {
    data: [],
    meta: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0
    }
  };

  try {
    // We pass the filters as query parameters to the Axios request
    clientData = await api.get<ClientListResponse>("/clients", {
      params: filters
    });
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    //TODO: In a real app, we might want to handle this with an error boundary or a toast
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Client Directory</h1>
          <p className="text-sm text-muted-foreground">Manage your relationships and track payments.</p>
        </div>
        <Button className="rounded-lg shadow-sm">
          <UserPlus size={18} className="mr-2" />
          <span className="hidden sm:inline">Add Client</span>
          <span className="sm:hidden">+</span>
        </Button>
      </header>

      {/* Search & Filter Bar */}
      <FilterControls />

      {/* Client List */}
      <ClientTable clients={clientData.data} />

      {/* FAB for Mobile (Optional, since we have the top button) */}
      <div className="fixed bottom-24 right-6 lg:hidden">
        <Button size="icon" className="size-14 rounded-full shadow-lg">
          <UserPlus size={24} />
        </Button>
      </div>
    </div>
  );
}
