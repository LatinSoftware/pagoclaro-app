import { AuthLayout } from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar Contraseña",
  description: "¿Olvidaste tu contraseña? Solicita un enlace de recuperación.",
};


export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
