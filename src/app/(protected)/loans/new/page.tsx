import { CreateLoanForm } from "@/components/loans/CreateLoanForm";
import { BackButton } from "@/components/ui/BackButton";

export default function NewLoanPage() {
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
      <CreateLoanForm />
    </div>
  );
}
