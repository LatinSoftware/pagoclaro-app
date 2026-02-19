import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="h-[400px] w-full animate-pulse rounded-xl bg-muted" />}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
