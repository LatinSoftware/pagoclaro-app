import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Settings, CreditCard } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.email?.split('@')[0]}!</h1>
        <p className="text-muted-foreground mt-1 text-lg">Here&apos;s what&apos;s happening with your account today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:border-primary/30 transition-colors">
          <CardHeader>
            <div className="bg-primary/10 w-fit p-2 rounded-lg text-primary mb-2">
              <User size={20} />
            </div>
            <CardTitle className="text-xl">Profile</CardTitle>
            <CardDescription>Manage your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">Email: <span className="text-muted-foreground">{user.email}</span></div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/30 transition-colors">
          <CardHeader>
            <div className="bg-primary/10 w-fit p-2 rounded-lg text-primary mb-2">
              <CreditCard size={20} />
            </div>
            <CardTitle className="text-xl">Wallet</CardTitle>
            <CardDescription>View your balance and transactions.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold text-primary">$12,450.00</div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/30 transition-colors">
          <CardHeader>
            <div className="bg-primary/10 w-fit p-2 rounded-lg text-primary mb-2">
              <Settings size={20} />
            </div>
            <CardTitle className="text-xl">Settings</CardTitle>
            <CardDescription>Configure your account preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Using a relative link or action would be better here */}
            <div className="text-sm text-muted-foreground">Manage your preferences in settings.</div>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
              <div className="divide-y">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted size-10 rounded-full flex items-center justify-center text-muted-foreground">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">Payment Received</p>
                        <p className="text-xs text-muted-foreground">Feb {19 - i}, 2026</p>
                      </div>
                    </div>
                    <span className="font-bold text-primary">+$450.00</span>
                  </div>
                ))}
              </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
