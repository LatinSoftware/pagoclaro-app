import { getDashboardSummary } from "@/actions/dashboard";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Executive summary of loans, collections, and key metrics.",
};

import { CollectionSummary } from "@/components/dashboard/CollectionSummary";
import { AttentionTable } from "@/components/dashboard/AttentionTable";
import { CollectionsChart } from "@/components/dashboard/CollectionsChart";
import { InstallmentDistribution } from "@/components/dashboard/InstallmentDistribution";
import { UpcomingInstallments } from "@/components/dashboard/UpcomingInstallments";
import { AlertTriangle } from "lucide-react";

export default async function DashboardPage() {
  const result = await getDashboardSummary();

  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
        <AlertTriangle size={48} className="text-destructive" />
        <h2 className="text-xl font-semibold text-foreground">
          Error loading dashboard
        </h2>
        <p className="text-sm">{result.error}</p>
      </div>
    );
  }

  const {
    kpis,
    collectionSummary,
    attentionItems,
    collectionsChart,
    installmentDistribution,
    upcomingInstallments,
  } = result.data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Real-time business summary
        </p>
      </header>

      {/* Section 1: KPI Cards */}
      <section>
        <KpiCards kpis={kpis} />
      </section>

      {/* Section 2: Collection Summary */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Collection Summary
        </h2>
        <CollectionSummary summary={collectionSummary} />
      </section>

      {/* Section 3: Requires Attention Table */}
      <section>
        <AttentionTable items={attentionItems} />
      </section>

      {/* Section 4 & 5: Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CollectionsChart data={collectionsChart} />
        <InstallmentDistribution distribution={installmentDistribution} />
      </section>

      {/* Section 6: Upcoming Installments */}
      <section>
        <UpcomingInstallments installments={upcomingInstallments} />
      </section>
    </div>
  );
}
