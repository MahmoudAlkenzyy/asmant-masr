"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  TraderCategory,
  TraderCategoryDetails,
  getAllTraderCategories,
  getTraderCategoryById,
} from "@/lib/api/traderCategories";

interface TraderCategoriesContextType {
  categories: TraderCategory[];
  loading: boolean;
  getCategoryDetails: (id: string) => Promise<TraderCategoryDetails | null>;
  categoryDetailsCache: Record<string, TraderCategoryDetails>;
}

const TraderCategoriesContext = createContext<TraderCategoriesContextType | undefined>(undefined);

export function TraderCategoriesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<TraderCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryDetailsCache, setCategoryDetailsCache] = useState<Record<string, TraderCategoryDetails>>({});

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const data = await getAllTraderCategories();
      setCategories(data);
      setLoading(false);
    }

    fetchCategories();
  }, []);

  const getCategoryDetails = async (id: string): Promise<TraderCategoryDetails | null> => {
    // Check cache first
    if (categoryDetailsCache[id]) {
      return categoryDetailsCache[id];
    }

    // Fetch from API
    const details = await getTraderCategoryById(id);
    if (details) {
      setCategoryDetailsCache((prev) => ({
        ...prev,
        [id]: details,
      }));
    }
    return details;
  };

  return (
    <TraderCategoriesContext.Provider
      value={{
        categories,
        loading,
        getCategoryDetails,
        categoryDetailsCache,
      }}
    >
      {children}
    </TraderCategoriesContext.Provider>
  );
}

export function useTraderCategories() {
  const context = useContext(TraderCategoriesContext);
  if (context === undefined) {
    throw new Error("useTraderCategories must be used within a TraderCategoriesProvider");
  }
  return context;
}
