"use client";
import React, { useEffect, useState } from "react";
import { StoreSlider } from "./StoreSlider";
import { prodactType } from "../../../page";
import { useLanguage } from "@/contexts/LanguageContext";
import { getStoreProducts } from "@/lib/api/store";

interface StoreContentProps {
  // products property is no longer passed from parent
}

export const StoreContent: React.FC<StoreContentProps> = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<prodactType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCity, setSelectedCity] = React.useState<string>("all");
  const [selectedType, setSelectedType] = React.useState<string>("all");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getStoreProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Extract unique cities and types for filters
  const cities = [...new Set(products.map((p) => p.cityName).filter(Boolean))];
  const types = [...new Set(products.map((p) => p.productTypeName).filter(Boolean))];

  const filteredProducts = products.filter((p) => {
    const cityMatch = selectedCity === "all" || p.cityName === selectedCity;
    const typeMatch = selectedType === "all" || p.productTypeName === selectedType;
    return cityMatch && typeMatch;
  });

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007b9e]"></div>
        <p className="mt-4 text-gray-500">{t("common.loading") || "Loading..."}</p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div dir="rtl" className="containerr mb-10">
        <div className="grid grid-cols-1 w-1/2 md:grid-cols-2 gap-6 bg-white p-6 border-gray-100">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">{t("store.filter_by_city")}</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 bg-[#ECF5F9] border border-[#618FB5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007b9e] transition-all"
            >
              <option value="all">{t("store.choose_city")}</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">{t("store.filter_by_type")}</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 bg-[#ECF5F9] border border-[#618FB5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007b9e] transition-all"
            >
              <option value="all">{t("store.choose_type")}</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
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
