"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClientFinancialInfo, clientFinancialInfoSchema } from "@/lib/schemas/client-wizard";

interface ClientFinancialInfoStepProps {
  defaultValues?: Partial<ClientFinancialInfo>;
  onNext: (data: ClientFinancialInfo) => void;
  onBack: (data?: Partial<ClientFinancialInfo>) => void;
}

export default function ClientFinancialInfoStep({ defaultValues, onNext, onBack }: ClientFinancialInfoStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
  } = useForm<ClientFinancialInfo>({
    resolver: zodResolver(clientFinancialInfoSchema),
    defaultValues: defaultValues || {},
  });

  // Ensure the field is registered even though we set it via the custom Select.
  register("incomeSource");

  const incomeSource = watch("incomeSource");

  const monthlyIncomeField = register("monthlyIncome", {
    setValueAs: (value) => (value === "" || value === undefined ? undefined : Number(value)),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input id="occupation" placeholder="e.g. Software Developer" {...register("occupation")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" placeholder="e.g. Tech Corp" {...register("companyName")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">Monthly Income</Label>
          <Input id="monthlyIncome" type="number" placeholder="0.00" {...monthlyIncomeField} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="incomeSource">Income Source</Label>
          <Select
            value={incomeSource || ""}
            onValueChange={(value) =>
              setValue("incomeSource", value as ClientFinancialInfo["incomeSource"], {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an income source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employed">Employed</SelectItem>
              <SelectItem value="independent">Independent</SelectItem>
              <SelectItem value="business_owner">Business Owner</SelectItem>
              <SelectItem value="informal">Informal</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between pt-4 gap-4 mt-8">
        <Button type="button" variant="outline" className="w-full md:w-auto" onClick={() => onBack(getValues())}>
          Back
        </Button>
        <Button type="submit" size="lg" className="w-full md:w-auto">
          <span className="hidden sm:inline">Continue to References</span>
          <span className="sm:hidden">Next Step</span>
        </Button>
      </div>
    </form>
  );
}
