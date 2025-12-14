"use client";
import { HeroUIProvider } from "@heroui/react";
import { TraderCategoriesProvider } from "@/contexts/TraderCategoriesContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <HeroUIProvider>
        <TraderCategoriesProvider>{children}</TraderCategoriesProvider>
      </HeroUIProvider>
    </section>
  );
}
