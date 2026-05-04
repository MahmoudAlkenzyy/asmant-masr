"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface LoadingContextType {
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType>({
  setIsLoading: () => {},
  isLoading: false,
});

export const useLoading = () => useContext(LoadingContext);

const LoadingHandler = () => {
  const { setNavigating } = useContext(InternalLoadingContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setNavigating(true);
    const timer = setTimeout(() => setNavigating(false), 800);
    return () => clearTimeout(timer);
  }, [pathname, searchParams, setNavigating]);

  return null;
};

const InternalLoadingContext = createContext<{
  setNavigating: (val: boolean) => void;
}>({ setNavigating: () => {} });

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const value = {
    isLoading: isLoading || isNavigating,
    setIsLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      <InternalLoadingContext.Provider value={{ setNavigating: setIsNavigating }}>
        <React.Suspense fallback={null}>
          <LoadingHandler />
        </React.Suspense>
        {children}
      </InternalLoadingContext.Provider>
    </LoadingContext.Provider>
  );
};

