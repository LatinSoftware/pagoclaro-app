export type ClientStatus = "active" | "inactive";

export interface Client {
  id: string;
  name: string;
  phone: string;
  cedula: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  status: ClientStatus;
  photoUrl: string | null;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  // Financial info (suggested by design)
  totalRevenue?: number;
  outstandingBalance?: number;
  lastPaymentDate?: string;
}

export interface ClientListResponse {
  data: Client[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ClientFilters {
  search?: string;
  status?: ClientStatus;
  limit?: number;
  page?: number;
}
