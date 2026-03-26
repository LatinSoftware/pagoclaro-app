"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClientReferences, clientReferencesSchema } from "@/lib/schemas/client-wizard";

interface ClientReferencesStepProps {
  defaultValues?: Partial<ClientReferences>;
  onNext: (data: ClientReferences) => void;
  onBack: (data?: Partial<ClientReferences>) => void;
}

export default function ClientReferencesStep({ defaultValues, onNext, onBack }: ClientReferencesStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
  } = useForm<ClientReferences>({
    resolver: zodResolver(clientReferencesSchema),
    defaultValues: defaultValues || {},
  });

  const referencePhoneField = register("referencePhone");

  const rawReferencePhone = watch("referencePhone") || "";

  const formatPhone = (val: string) => {
    const d = val.replace(/\D/g, "");
    if (d.length === 0) return "";
    if (d.length <= 3) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const unmasked = e.target.value.replace(/\D/g, "").slice(0, 10);
    setValue("referencePhone", unmasked, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="referenceName">Reference Name</Label>
          <Input id="referenceName" placeholder="e.g. Maria Lopez" {...register("referenceName")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="referencePhone">Reference Phone</Label>
          <Input 
            id="referencePhone" 
            placeholder="(555) 000-0000" 
            name={referencePhoneField.name}
            ref={referencePhoneField.ref}
            onBlur={referencePhoneField.onBlur}
            value={formatPhone(rawReferencePhone)}
            onChange={handlePhoneChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="referenceRelationship">Relationship</Label>
          <Input id="referenceRelationship" placeholder="e.g. Sister, Friend" {...register("referenceRelationship")} />
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between pt-4 gap-4 mt-8">
        <Button type="button" variant="outline" className="w-full md:w-auto" onClick={() => onBack(getValues())}>
          Back
        </Button>
        <Button type="submit" size="lg" className="w-full md:w-auto">
          <span className="hidden sm:inline">Continue to Documents</span>
          <span className="sm:hidden">Next Step</span>
        </Button>
      </div>
    </form>
  );
}
