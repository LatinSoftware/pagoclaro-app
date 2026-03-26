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
  onBack: (data?: Partial<ClientBasicInfo>) => void;
}

export default function ClientBasicInfoStep({ defaultValues, onNext, onBack }: ClientBasicInfoStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<ClientBasicInfo>({
    resolver: zodResolver(clientBasicInfoSchema),
    defaultValues: defaultValues || {
      fullName: "",
      cedula: "",
      phone: "",
      email: "",
      secondaryPhone: "",
      birthDate: "",
    },
  });

  const cedulaField = register("cedula");
  const phoneField = register("phone");
  const secondaryPhoneField = register("secondaryPhone");

  const rawCedula = watch("cedula") || "";
  const rawPhone = watch("phone") || "";
  const rawSecondaryPhone = watch("secondaryPhone") || "";

  const formatCedula = (val: string) => {
    const d = val.replace(/\D/g, "");
    if (d.length <= 3) return d;
    if (d.length <= 10) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return `${d.slice(0, 3)}-${d.slice(3, 10)}-${d.slice(10, 11)}`;
  };

  const formatPhone = (val: string) => {
    const d = val.replace(/\D/g, "");
    if (d.length === 0) return "";
    if (d.length <= 3) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 10)}`;
  };

  const handleCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const unmasked = e.target.value.replace(/\D/g, "").slice(0, 11);
    setValue("cedula", unmasked, { shouldValidate: true, shouldDirty: true });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: "phone" | "secondaryPhone") => {
    const unmasked = e.target.value.replace(/\D/g, "").slice(0, 10);
    setValue(field, unmasked, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            name={cedulaField.name}
            ref={cedulaField.ref}
            onBlur={cedulaField.onBlur}
            value={formatCedula(rawCedula)}
            onChange={handleCedulaChange}
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
            name={phoneField.name}
            ref={phoneField.ref}
            onBlur={phoneField.onBlur}
            value={formatPhone(rawPhone)}
            onChange={(e) => handlePhoneChange(e, "phone")}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email (Optional)</Label>
          <Input
            id="email"
            type="email"
            placeholder="client@email.com"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondaryPhone">Secondary Phone (Optional)</Label>
          <Input
            id="secondaryPhone"
            placeholder="(555) 000-0000"
            name={secondaryPhoneField.name}
            ref={secondaryPhoneField.ref}
            onBlur={secondaryPhoneField.onBlur}
            value={formatPhone(rawSecondaryPhone)}
            onChange={(e) => handlePhoneChange(e, "secondaryPhone")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">Birth Date (Optional)</Label>
          <Input
            id="birthDate"
            type="date"
            {...register("birthDate")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender (Optional)</Label>
          <select
            id="gender"
            {...register("gender")}
            defaultValue=""
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maritalStatus">Marital Status (Optional)</Label>
          <select
            id="maritalStatus"
            {...register("maritalStatus")}
            defaultValue=""
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>Select status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="union">Union</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between pt-4 gap-4">
        <Button type="button" variant="outline" className="w-full md:w-auto" onClick={() => onBack(getValues())}>
          Back to List
        </Button>
        <Button type="submit" size="lg" className="w-full md:w-auto">
          <span className="hidden sm:inline">Continue to Financial Info</span>
          <span className="sm:hidden">Next Step</span>
        </Button>
      </div>
    </form>
  );
}
