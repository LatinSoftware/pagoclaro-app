import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description: "Accede a tu cuenta de Pago Claro para gestionar tus préstamos.",
};


export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="h-[400px] w-full animate-pulse rounded-xl bg-muted" />}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
