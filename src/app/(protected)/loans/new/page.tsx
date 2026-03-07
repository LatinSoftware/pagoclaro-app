import { CreateLoanForm } from "@/components/loans/CreateLoanForm";
import { BackButton } from "@/components/ui/BackButton";

interface NewLoanPageProps {
  searchParams: Promise<{
    client_id?: string;
  }>;
}

export default async function NewLoanPage({ searchParams }: NewLoanPageProps) {
  const resolvedParams = await searchParams;
  const clientId = resolvedParams.client_id || "";

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center gap-3">
        <BackButton />
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            New Loan
          </h1>
          <p className="text-sm text-muted-foreground">
            Create a new loan for a client.
          </p>
        </div>
      </header>

      {/* Form */}
      <CreateLoanForm defaultClientId={clientId} />
    </div>
  );
}
