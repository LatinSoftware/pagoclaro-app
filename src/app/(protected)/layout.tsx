import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LayoutDashboard, Users, CreditCard, Settings, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/auth/actions";
import Link from "next/link";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex h-16 items-center">
          {/* Logo Area - Aligned with Sidebar */}
          <div className="lg:w-64 flex items-center gap-2 px-4 border-r lg:border-r-0 lg:h-full">
            <div className="bg-primary rounded-lg p-1.5 text-primary-foreground">
              <LayoutDashboard size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-primary">PagoClaro</span>
          </div>

          {/* Header content aligned with main container */}
          <div className="flex-1 flex items-center mx-auto justify-between px-4 md:px-6 lg:px-8 max-w-7xl">
            <div /> {/* Spacer or Breadcrumbs could go here */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <form action={logout}>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-destructive">
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 lg:pb-0 lg:pl-64">
        {/* Sidebar for Desktop */}
         <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-64 border-r bg-card/50 flex-col py-6 px-4 space-y-2">
            <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <NavItem href="/clients" icon={<Users size={20} />} label="Clients" />
            <NavItem href="/payments" icon={<CreditCard size={20} />} label="Payments" />
            <NavItem href="/settings" icon={<Settings size={20} />} label="Settings" />
         </aside>

        <div className="container max-w-10xl mx-auto px-4 py-6 md:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden flex h-16 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 items-center justify-around px-2">
        <MobileNavItem href="/dashboard" icon={<LayoutDashboard size={24} />} label="Dashboard" />
        <MobileNavItem href="/clients" icon={<Users size={24} />} label="Clients" />
        <MobileNavItem href="/payments" icon={<CreditCard size={24} />} label="Payments" />
        <MobileNavItem href="/settings" icon={<Settings size={24} />} label="Settings" />
      </nav>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors font-medium"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function MobileNavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors"
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
