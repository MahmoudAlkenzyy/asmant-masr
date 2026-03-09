"use client";
import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { TraderCategoriesProvider } from "@/contexts/TraderCategoriesContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <HeroUIProvider>
        <AuthProvider>
          <LanguageProvider>
            <TraderCategoriesProvider>
              {children}
              <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" />
            </TraderCategoriesProvider>
          </LanguageProvider>
        </AuthProvider>
      </HeroUIProvider>
    </section>
  );
}
