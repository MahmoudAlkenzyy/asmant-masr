"use client";
import React from "react";
import { StoreSlider } from "./StoreSlider";
import { prodactType } from "../../../page";

interface StoreContentProps {
  products: prodactType[];
}

export const StoreContent: React.FC<StoreContentProps> = ({ products }) => {
  const [selectedCity, setSelectedCity] = React.useState<string>("الكل");
  const [selectedType, setSelectedType] = React.useState<string>("الكل");

  if (!products || products.length === 0) {
    return null;
  }

  // Extract unique cities and types for filters
  const cities = ["أختر المدينة", ...new Set(products.map((p) => p.cityName).filter(Boolean))];
  const types = ["أختر النوع", ...new Set(products.map((p) => p.productTypeName).filter(Boolean))];

  const filteredProducts = products.filter((p) => {
    const cityMatch = selectedCity === "الكل" || p.cityName === selectedCity;
    const typeMatch = selectedType === "الكل" || p.productTypeName === selectedType;
    return cityMatch && typeMatch;
  });

  return (
    <div className="py-10">
      <div dir="rtl" className="containerr mb-10">
        <div className="grid grid-cols-1 w-1/2 md:grid-cols-2 gap-6 bg-white p-6 border-gray-100">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">تصفية حسب المدينة</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 bg-[#ECF5F9] border border-[#618FB5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007b9e] transition-all"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">تصفية حسب النوع</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 bg-[#ECF5F9] border border-[#618FB5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007b9e] transition-all"
            >
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
          <p className="text-xl text-gray-500 font-medium">لا توجد منتجات تطابق اختياراتك</p>
          <button
            onClick={() => {
              setSelectedCity("الكل");
              setSelectedType("الكل");
            }}
            className="mt-4 text-[#007b9e] font-semibold hover:underline"
          >
            إعادة تعيين المرشحات
          </button>
        </div>
      )}
    </div>
  );
};
