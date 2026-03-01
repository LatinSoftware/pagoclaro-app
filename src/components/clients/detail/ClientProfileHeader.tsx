import { Shield, Clock, Verified, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { ClientProfile } from "@/types/client";
import { EditClientBasicInfoDialog } from "./EditClientBasicInfoDialog";

interface ClientProfileHeaderProps {
  client: ClientProfile;
}

export function ClientProfileHeader({
  client,
}: ClientProfileHeaderProps) {
  // Placeholder image if no photoUrl
  const avatarUrl = client.photoUrl || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=256&auto=format&fit=crop";

  return (
    <div className="w-full">
      {/* Header Navigation embedded inside */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 border-b border-primary/10 bg-white/80 dark:bg-background/80 backdrop-blur-md">
        <Link 
          href="/clients"
          className="text-primary flex h-10 w-10 shrink-0 items-center justify-center cursor-pointer hover:bg-primary/10 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h2 className="text-black dark:text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Client Profile
        </h2>
        <div className="flex w-10 items-center justify-end">
          <EditClientBasicInfoDialog client={client} />
        </div>
      </div>

      {/* Profile Hero Section */}
      <div className="flex p-6 flex-col items-center md:flex-row md:items-center md:justify-between bg-linear-to-b from-primary/5 to-transparent gap-6">
        <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-6 text-center md:text-left">
          <div className="relative">
            <div 
              className="bg-primary/20 aspect-square rounded-full h-24 w-24 md:h-28 md:w-28 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-sm overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url('${avatarUrl}')` }}
            />
            <div className="absolute bottom-1 right-1 h-6 w-6 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full flex items-center justify-center shadow-sm">
              <Verified className="text-white h-3.5 w-3.5" />
            </div>
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl tracking-tight">{client.name}</h1>
            <p className="text-zinc-800 dark:text-primary font-bold text-sm">ID: {client.cedula}</p>
          </div>
        </div>

        {/* Stats Badges */}
        <div className="flex gap-3 w-full max-w-sm md:max-w-md md:w-auto">
          <div className="flex-1 md:w-32 flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50 dark:bg-primary/10 border border-emerald-100 dark:border-primary/20">
            <span className="text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold mb-1 whitespace-nowrap">
              Risk Score
            </span>
            <div className="flex items-center gap-1 text-emerald-800 dark:text-emerald-300 font-bold">
              <Shield className="h-[18px] w-[18px]" />
              <span>{client.riskScore || "Low"}</span>
            </div>
          </div>
          <div className="flex-1 md:w-32 flex flex-col items-center justify-center p-3 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/10">
            <span className="text-[10px] uppercase tracking-wider text-primary font-bold mb-1 whitespace-nowrap">
              Punctuality
            </span>
            <div className="flex items-center gap-1 text-primary font-bold">
              <Clock className="h-[18px] w-[18px]" />
              <span>{client.punctuality ?? 100}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
