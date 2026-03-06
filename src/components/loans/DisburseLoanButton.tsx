"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { disburseLoanAction } from "@/actions/loans";
import { toast } from "sonner";
import { Wallet, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface DisburseLoanButtonProps {
  loanId: string;
  className?: string;
}

export function DisburseLoanButton({
  loanId,
  className,
}: DisburseLoanButtonProps) {
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

    setIsLoading(false);
  };

  return (
    <Button
      size="sm"
      variant="default"
      className={cn(
        "h-8 gap-1.5 font-bold text-[11px] rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-emerald-500/30 transition-all duration-300 active:scale-95 group/disburse",
        className,
      )}
      disabled={isLoading}
      onClick={handleDisburse}
    >
      {isLoading ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Wallet className="size-3.5 group-hover/disburse:scale-110 transition-transform" />
      )}
      Disburse
    </Button>
  );
}
