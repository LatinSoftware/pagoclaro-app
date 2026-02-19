"use client";

import { useTransition, useState } from "react";
import { login } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, ArrowRight, User, Lock } from "lucide-react";
import Link from "next/link";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        if (typeof result.error === "string") {
          setError(result.error);
        } else {
          setError("Invalid email or password");
        }
      }
    });
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-8 space-y-6">
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground/80 ml-1">
                Email or Phone
              </Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <User size={18} />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email or phone"
                  required
                  className="pl-11 h-14 bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all rounded-xl"
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" title="Password" className="text-sm font-semibold text-foreground/80">
                   Password
                </Label>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="pl-11 pr-12 h-14 bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all rounded-xl"
                  disabled={isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="size-4 rounded border-muted-foreground/30 accent-primary"
                />
                <label htmlFor="remember" className="text-sm font-medium text-muted-foreground/80">
                  Remember session
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-primary hover:underline underline-offset-4"
              >
                Forgot Password?
              </Link>
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive animate-in shake duration-300">
                {error}
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
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
