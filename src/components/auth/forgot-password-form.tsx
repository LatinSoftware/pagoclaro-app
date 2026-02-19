"use client";

import { useTransition, useState } from "react";
import { forgotPassword } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await forgotPassword(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.success);
      }
    });
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-foreground">Forgot Password?</h2>
            <p className="text-sm text-muted-foreground">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground/80 ml-1">
                Email Address
              </Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                  className="pl-11 h-14 bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all rounded-xl"
                  disabled={isPending}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive animate-in shake duration-300">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-lg bg-primary/10 p-3 text-sm font-medium text-primary animate-in fade-in duration-300">
                {success}
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-14 text-lg font-bold rounded-xl shadow-[0_8px_16px_-4px_rgba(var(--primary),0.3)] hover:shadow-[0_12px_20px_-4px_rgba(var(--primary),0.4)] active:scale-[0.98] transition-all group"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
