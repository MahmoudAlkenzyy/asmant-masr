"use client";
import React, { useEffect, useState } from "react";
import { StoreSlider } from "./StoreSlider";
import { prodactType } from "../../../page";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProductTypes, getStoreProducts, ProductStoreType } from "@/lib/api/store";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";

interface StoreContentProps {
  // products property is no longer passed from parent
}

export const StoreContent: React.FC<StoreContentProps> = () => {
  const { t } = useLanguage();
  const { user, isLoading: authLoading, isAuth } = useAuth();
  const [products, setProducts] = useState<ProductStoreType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCity, setSelectedCity] = React.useState<string>("all");
  const [selectedType, setSelectedType] = React.useState<string>("all");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProductTypes();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const types = [...new Set(products.map((p) => p.productTypeName).filter(Boolean))];

  const filteredProducts = products.filter((p) => {
    const typeMatch = selectedType === "all" || p.productTypeName === selectedType;
    return typeMatch;
  });

  if (loading || authLoading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007b9e]"></div>
        <p className="mt-4 text-gray-500">{t("common.loading") || "Loading..."}</p>
      </div>
    );
  }

  return (
    <div className="py-10 relative">
      {/* ── Blur overlay when user is NOT logged in ────────────────────────── */}
      {!user && !isAuth?.hasMarketAccess && (
        <div className="absolute inset-0 z-20 backdrop-blur-md bg-white/40 flex flex-col items-center justify-center gap-6 rounded-2xl">
          {/* Lock icon */}
          <div className="w-20 h-20 rounded-full bg-[#618FB5]/10 border-2 border-[#618FB5]/30 flex items-center justify-center">
            <LockKeyhole size={36} className="text-[#618FB5]" />
          </div>

          {/* Message */}
          <div className="text-center px-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t("store.login_required_title")}</h3>
            <p className="text-gray-500 text-base max-w-sm mx-auto">{t("store.login_required_desc")}</p>
          </div>

          {/* CTA */}
          <Link href="/login">
            <button className="cursor-pointer bg-[#618FB5] hover:bg-[#507aa0] transition-colors text-white font-bold px-10 py-3 rounded-xl text-lg shadow-lg shadow-[#618FB5]/30">
              {t("nav.login")}
            </button>
          </Link>
        </div>
      )}

      <div dir="rtl" className="containerr mb-10">
        <div className="grid grid-cols-1 w-1/2 md:grid-cols-2 gap-6 bg-white p-6 border-gray-100"></div>
      </div>

      {filteredProducts.length > 0 ? (
        <StoreSlider prodacts={filteredProducts} />
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl containerr border-2 border-dashed border-gray-200">
          <p className="text-xl text-gray-500 font-medium">{t("store.no_products_match")}</p>
          <button
            onClick={() => {
              setSelectedCity("all");
              setSelectedType("all");
            }}
            className="mt-4 text-[#007b9e] font-semibold hover:underline"
          >
            {t("store.reset_filters")}
          </button>
        </div>
      )}
    </div>
  );
};
