import CreateClientWizard from "@/components/clients/CreateClientWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuevo Cliente",
  description: "Registra un nuevo cliente en el sistema Pago Claro.",
};

export default function CreateClientPage() {
  return <CreateClientWizard />;
}
