import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "Lo sentimos, la página que buscas no existe o ha sido movida.",
};
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="space-y-4">
        <div className="relative">
          <h1 className="text-9xl font-extrabold tracking-tighter text-primary/10">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-2xl font-bold text-primary">PagoClaro</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Page Not Found</h2>
          <p className="mx-auto max-w-[400px] text-muted-foreground">
            Wait, did you get lost? The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center pt-4">
          <Button asChild variant="default" size="lg" className="rounded-full px-8">
            <Link href="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link href="/" className="flex items-center gap-2">
              <MoveLeft size={18} />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
