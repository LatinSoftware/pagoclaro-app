export interface DashboardKpis {
  activeCapital: number;
  totalCollected: number;
  pendingBalance: number;
  overdueAmount: number;
  todayCollections: number;
  activeClients: number;
}

export interface CollectionSummary {
  installmentsDueToday: number;
  installmentsDueThisWeek: number;
  overdueInstallments: number;
  loansAtRisk: number;
}

export interface AttentionItem {
  clientName: string;
  clientPhone: string;
  loanId: string;
  nextDueDate: string;
  amountDue: number;
  status: string;
  daysOverdue: number;
}

export interface CollectionChartPoint {
  date: string;
  amount: number;
}

export interface InstallmentDistribution {
  pending: number;
  partial: number;
  paid: number;
  overdue: number;
}

export interface UpcomingInstallment {
  clientName: string;
  clientPhone: string;
  dueDate: string;
  amount: number;
  status: string;
}

export interface DashboardSummary {
  kpis: DashboardKpis;
  collectionSummary: CollectionSummary;
  attentionItems: AttentionItem[];
  collectionsChart: CollectionChartPoint[];
  installmentDistribution: InstallmentDistribution;
  upcomingInstallments: UpcomingInstallment[];
}
