"use client";

import { useState } from "react";
import { LoanDetailResponse } from "@/types/loan";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditLoanForm } from "@/components/loans/EditLoanForm";

interface EditLoanDialogProps {
  loan: LoanDetailResponse;
}

export function EditLoanDialog({ loan }: EditLoanDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-background hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold uppercase tracking-widest text-xs h-9 sm:h-10 px-4"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-0 shadow-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Edit Loan</DialogTitle>
        <div className="p-6">
          <EditLoanForm loan={loan} onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
