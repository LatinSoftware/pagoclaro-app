import { AuthLayout } from "@/components/auth/auth-layout";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restablecer Contraseña",
  description: "Crea una nueva contraseña segura para tu cuenta.",
};


export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}
