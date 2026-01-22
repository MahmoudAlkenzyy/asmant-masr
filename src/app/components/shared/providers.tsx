"use client";
import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { TraderCategoriesProvider } from "@/contexts/TraderCategoriesContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <HeroUIProvider>
        <TraderCategoriesProvider>
          {children}
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" />
        </TraderCategoriesProvider>
      </HeroUIProvider>
    </section>
  );
}
