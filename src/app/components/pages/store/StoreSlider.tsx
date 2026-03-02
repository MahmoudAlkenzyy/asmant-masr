"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StoreCard } from "../Home/StoreCard";
import { prodactType } from "../../../page";
import { toast } from "react-toastify";
import { useLanguage } from "@/contexts/LanguageContext";

interface StoreSliderProps {
  prodacts: prodactType[];
}

// ─── helper: unique non-empty values from an array ───────────────────────────
function uniq(arr: (string | undefined | null)[]): string[] {
  return [...new Set(arr.filter(Boolean) as string[])];
}

export const StoreSlider: React.FC<StoreSliderProps> = ({ prodacts }) => {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // ── 5 independent filter states (empty = "all") ───────────────────────────
  const [selProduct, setSelProduct] = useState("");
  const [selCompany, setSelCompany] = useState("");
  const [selType, setSelType] = useState("");
  const [selCity, setSelCity] = useState("");
  const [selTrade, setSelTrade] = useState("");
  const [quantity, setQuantity] = useState(60);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ── Rows that match ALL currently-set filters ─────────────────────────────
  const matched = useMemo(
    () =>
      prodacts.filter((p) => {
        if (selProduct && p.productName !== selProduct) return false;
        if (selCompany && p.companyName !== selCompany) return false;
        if (selType && p.productTypeName !== selType) return false;
        if (selCity && p.cityName !== selCity) return false;
        if (selTrade && p.tradeName !== selTrade) return false;
        return true;
      }),
    [prodacts, selProduct, selCompany, selType, selCity, selTrade],
  );

  // ── Options for each dropdown = unique values from the matched set ─────────
  const opts = useMemo(
    () => ({
      // For each field, unlock it from its own filter so the user can change it
      product: uniq(
        prodacts
          .filter((p) => {
            if (selCompany && p.companyName !== selCompany) return false;
            if (selType && p.productTypeName !== selType) return false;
            if (selCity && p.cityName !== selCity) return false;
            if (selTrade && p.tradeName !== selTrade) return false;
            return true;
          })
          .map((p) => p.productName),
      ),
      company: uniq(
        prodacts
          .filter((p) => {
            if (selProduct && p.productName !== selProduct) return false;
            if (selType && p.productTypeName !== selType) return false;
            if (selCity && p.cityName !== selCity) return false;
            if (selTrade && p.tradeName !== selTrade) return false;
            return true;
          })
          .map((p) => p.companyName),
      ),
      type: uniq(
        prodacts
          .filter((p) => {
            if (selProduct && p.productName !== selProduct) return false;
            if (selCompany && p.companyName !== selCompany) return false;
            if (selCity && p.cityName !== selCity) return false;
            if (selTrade && p.tradeName !== selTrade) return false;
            return true;
          })
          .map((p) => p.productTypeName),
      ),
      city: uniq(
        prodacts
          .filter((p) => {
            if (selProduct && p.productName !== selProduct) return false;
            if (selCompany && p.companyName !== selCompany) return false;
            if (selType && p.productTypeName !== selType) return false;
            if (selTrade && p.tradeName !== selTrade) return false;
            return true;
          })
          .map((p) => p.cityName),
      ),
      trade: uniq(
        prodacts
          .filter((p) => {
            if (selProduct && p.productName !== selProduct) return false;
            if (selCompany && p.companyName !== selCompany) return false;
            if (selType && p.productTypeName !== selType) return false;
            if (selCity && p.cityName !== selCity) return false;
            return true;
          })
          .map((p) => p.tradeName),
      ),
    }),
    [prodacts, selProduct, selCompany, selType, selCity, selTrade],
  );

  // ── When a card is clicked: pre-fill all dropdowns from that card ──────────
  const handleOpenForm = (product: prodactType) => {
    setSelProduct(product.productName || "");
    setSelCompany(product.companyName || "");
    setSelType(product.productTypeName || "");
    setSelCity(product.cityName || "");
    setSelTrade(product.tradeName || "");
    setQuantity(product.quantity || 60);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => setIsFormOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("store.order_success"));
    handleCloseForm();
  };

  // ── Reusable select renderer ───────────────────────────────────────────────
  const Dropdown = ({
    label,
    value,
    options,
    onChange,
  }: {
    label: string;
    value: string;
    options: string[];
    onChange: (v: string) => void;
  }) => (
    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 bg-[#ECF5F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#618FB5]"
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  if (!isMounted) {
    return (
      <section dir="rtl" className="bg-[#618FB5] py-9">
        <div className="containerr">
          <h2 className="text-4xl font-bold mb-8 text-center text-white">{t("store.title")}</h2>
          <div className="flex justify-center items-center py-20">
            <div className="text-white">{t("common.loading")}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section dir="rtl" className="bg-[] py-9">
      <div className="containerr">
        <h2 className="text-4xl font-bold mb-8 text-center">{t("store.title")}</h2>

        <div className="flex justify-between items-center mb-6 relative">
          <h3 className="text-2xl font-semibold text-nowrap">{t("store.subtitle")}</h3>
          <div className="flex gap-2 containerr justify-end">
            <button className="swiper-button-prev-store bg-[#A6C7E0] text-black p-2 rounded-full hover:bg-primary transition">
              <ArrowRight size={16} />
            </button>
            <button className="swiper-button-next-store bg-[#A6C7E0] text-black p-2 rounded-full hover:bg-primary transition">
              <ArrowLeft size={16} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".swiper-button-next-store",
            prevEl: ".swiper-button-prev-store",
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          loop={true}
          className="mt-4"
          style={{ alignItems: "stretch" }}
        >
          {prodacts.map((cardInfo, i) => (
            <SwiperSlide key={i} className="h-full">
              <StoreCard idx={i} cardInfo={cardInfo} onClick={() => handleOpenForm(cardInfo)} isHome={false} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ── Order Form ── */}
        {isFormOpen && (
          <div className="mt-8 max-w-4xl mx-auto shadow-lg relative animate-slideDown">
            <form onSubmit={handleSubmit} className="space-y-6 text-[#618FB5]">
              <div className="bg-[#D6EFF8] rounded-2xl p-8 pb-3 mb-0 rounded-b-none">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  {/* 1. المنتج */}
                  <Dropdown
                    label={t("storecard.product")}
                    value={selProduct}
                    options={opts.product}
                    onChange={(v) => setSelProduct(v)}
                  />

                  {/* 2. الشركة */}
                  <Dropdown
                    label={t("storecard.company")}
                    value={selCompany}
                    options={opts.company}
                    onChange={(v) => setSelCompany(v)}
                  />

                  {/* 3. النوع */}
                  <Dropdown
                    label={t("store.order_type")}
                    value={selType}
                    options={opts.type}
                    onChange={(v) => setSelType(v)}
                  />

                  {/* 4. الموقع */}
                  <Dropdown
                    label={t("store.order_location")}
                    value={selCity}
                    options={opts.city}
                    onChange={(v) => setSelCity(v)}
                  />

                  {/* 5. الفئة */}
                  <Dropdown
                    label={t("store.order_category")}
                    value={selTrade}
                    options={opts.trade}
                    onChange={(v) => setSelTrade(v)}
                  />

                  {/* 6. الكمية */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {t("store.order_quantity")}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border border-gray-300 bg-[#ECF5F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#618FB5]"
                        min="1"
                      />
                      <div className="px-4 py-3 border border-gray-300 bg-[#ECF5F9] rounded-lg">
                        {t("store.order_unit")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Matching count hint */}
                {matched.length > 0 && (
                  <p className="text-xs text-gray-500 mt-4">
                    {matched.length}{" "}
                    {matched.length === 1 ? t("store.result_singular") || "نتيجة" : t("store.result_plural") || "نتائج"}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-[#51E482] text-black py-4 rounded-lg font-bold text-lg hover:bg-[#4a7a9a] transition"
              >
                {t("store.order_btn")}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
