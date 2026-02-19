import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ShieldCheck, Lock, Shield } from "lucide-react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-8 transition-colors duration-500">
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <ThemeToggle />
      </div>
      
      <div className="flex w-full flex-col items-center space-y-8 max-w-[440px]">
        <header className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="rounded-[2.5rem] bg-card border border-primary/20 p-6 text-primary shadow-[0_0_50px_-12px_rgba(var(--primary),0.2)]">
              <ShieldCheck size={48} strokeWidth={1.5} className="text-primary" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-background p-1 rounded-full">
               <div className="bg-primary size-4 rounded-full" />
            </div>
          </div>
          
          <div className="text-center space-y-1">
            <h1 className="text-5xl font-black tracking-tight text-foreground drop-shadow-sm">
              PagoClaro
            </h1>
            <div className="flex items-center justify-center space-x-2 text-sm font-bold uppercase tracking-[0.2em] text-primary/80">
              <Shield size={14} className="fill-primary/20" />
              <span>Secure Access</span>
            </div>
          </div>
        </header>

        <main className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {children}
        </main>

        <div className="text-center space-y-8 w-full">
          <p className="text-sm font-medium text-muted-foreground/60">
            New to PagoClaro?{" "}
            <Link
              href="#"
              className="font-bold text-primary hover:underline underline-offset-4 decoration-2 decoration-primary/30 transition-all"
            >
              Register Business
            </Link>
          </p>

          <footer className="flex items-center justify-center gap-6 pt-4 border-t border-border/10">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 whitespace-nowrap hover:text-muted-foreground/60 transition-colors cursor-default">
              <Shield size={14} />
              256-BIT SSL
            </div>
            <div className="h-4 w-px bg-border/20" />
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 whitespace-nowrap hover:text-muted-foreground/60 transition-colors cursor-default">
              <Lock size={14} />
              PCI-DSS LEVEL 1
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
