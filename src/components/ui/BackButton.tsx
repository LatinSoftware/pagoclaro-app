"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="group rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
    </Button>
  );
}
