"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { disburseLoanAction } from "@/actions/loans";
import { toast } from "sonner";
import { Wallet, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DisburseLoanButtonProps {
  loanId: string;
}

export function DisburseLoanButton({ loanId }: DisburseLoanButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDisburse = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);

    const result = await disburseLoanAction(loanId);

    if (result.success) {
      toast.success("Loan disbursed successfully");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to disburse loan");
    }

    toast.error("An unexpected error occurred");

    setIsLoading(false);
  };

  return (
    <Button
      size="sm"
      variant="default"
      className="h-8 gap-1.5 font-bold uppercase tracking-wider text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
      disabled={isLoading}
      onClick={handleDisburse}
    >
      {isLoading ? (
        <Loader2 className="size-3 animate-spin" />
      ) : (
        <Wallet className="size-3" />
      )}
      Disburse
    </Button>
  );
}
