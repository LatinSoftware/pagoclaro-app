"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClientBasicInfo, clientBasicInfoSchema } from "@/lib/schemas/client-wizard";

interface ClientBasicInfoStepProps {
  defaultValues?: Partial<ClientBasicInfo>;
  onNext: (data: ClientBasicInfo) => void;
  onBack: () => void;
}

export default function ClientBasicInfoStep({ defaultValues, onNext, onBack }: ClientBasicInfoStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientBasicInfo>({
    resolver: zodResolver(clientBasicInfoSchema),
    defaultValues: defaultValues || {
      fullName: "",
      cedula: "",
      phone: "",
      address: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          placeholder="Enter legal full name"
          {...register("fullName")}
          className={errors.fullName ? "border-red-500" : ""}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cedula">National ID Number (Cédula)</Label>
        <Input
          id="cedula"
          placeholder="000-0000000-0"
          {...register("cedula")}
          className={errors.cedula ? "border-red-500" : ""}
        />
        {errors.cedula && (
          <p className="text-sm text-red-500">{errors.cedula.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Mobile Phone</Label>
        <Input
          id="phone"
          placeholder="(555) 000-0000"
          {...register("phone")}
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Residential Address</Label>
        <Input
          id="address"
          placeholder="Enter street, city, state and zip"
          {...register("address")}
          className={errors.address ? "border-red-500" : ""}
        />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back to List
        </Button>
        <Button type="submit" size="lg">
          Continue to Documents
        </Button>
      </div>
    </form>
  );
}
