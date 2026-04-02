"use client";

import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { fetchWithLanguage } from "@/lib/fetchWithLanguage";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { LockKeyhole, ShieldOff } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface IdName {
  id: string;
  name: string;
}

interface Company {
  companyId: string;
  companyName: string;
  tradeNameId?: string;
  tradeName: string;
  cityName: string;
  lowestPrice: number;
  maxPrice: number;
  todayAvg: number;
  yesterdayAvg: number;
  difference: number;
}

interface ProductGroup {
  productTypeId: string;
  productTypeName: string;
  productName: string;
  companies: Company[];
}

interface PriceItem {
  parentName: string;
  productTypeId: string;
  productTypeName: string;
  productName: string;
  companies: Company[];
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PriceAccordion() {
  const { t, language } = useLanguage();
  const { user, isLoading: authLoading, isAuth } = useAuth();

  const headers = [
    language === "ar" ? "الشركة" : "Company",
    language === "ar" ? "المنتج" : "Product",
    language === "ar" ? "المحافظة" : "City",
    language === "ar" ? "أدنى سعر" : "Min Price",
    language === "ar" ? "أعلى سعر" : "Max Price",
    language === "ar" ? "متوسط اليوم" : "Today Avg",
    language === "ar" ? "متوسط الأمس" : "Yesterday Avg",
    language === "ar" ? "التغيير" : "Change",
  ];

  // ── Lookup lists ──────────────────────────────────────────────────────────
  const [productTypes, setProductTypes] = useState<IdName[]>([
    { id: "7e722b96-6e53-4860-39e5-08de155db96d", name: "اسمنت" },
    { id: "c452e6e3-dece-4f6d-39e6-08de155db96d", name: "حديد" },
    { id: "4fbf4456-9a19-4ff0-39e7-08de155db96d", name: "جبس" },
  ]);
  const [cities, setCities] = useState<IdName[]>([]);
  const [companies, setCompanies] = useState<IdName[]>([]);
  const [tradeNames, setTradeNames] = useState<IdName[]>([]);

  // ── Filter state (stores IDs, empty string = "All") ───────────────────────
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedTradeNameId, setSelectedTradeNameId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split("T")[0]);

  // ── Data ──────────────────────────────────────────────────────────────────
  const [priceData, setPriceData] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch lookup lists on mount ───────────────────────────────────────────
  const getProductTypes = async () => {
    try {
      const res = await fetchWithLanguage(
        "https://cement.northeurope.cloudapp.azure.com:5000/api/Product/GetAllProductsList",
      );
      const data = await res.json();
      if (data.products?.length) setProductTypes(data.products);
    } catch (err) {
      console.error("Failed to fetch product types:", err);
    }
  };

  const getCities = async () => {
    try {
      const res = await fetchWithLanguage(
        "https://cement.northeurope.cloudapp.azure.com:5000/api/PricePage/GetAllCitiesList",
      );
      const data = await res.json();
      setCities(data.cities || []);
    } catch (err) {
      console.error("Failed to fetch cities:", err);
    }
  };

  useEffect(() => {
    getProductTypes();
    getCities();
  }, []);

  // ── Main data fetch — triggered whenever any filter or date changes ────────
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const allItems: PriceItem[] = [];

      // Decide which product IDs to query
      const targets = selectedProductId ? productTypes.filter((p) => p.id === selectedProductId) : productTypes;

      for (const { id, name } of targets) {
        try {
          const params = new URLSearchParams({ ProductId: id });
          if (selectedCompanyId) params.set("CompanyId", selectedCompanyId);
          if (selectedTradeNameId) params.set("TradeNameId", selectedTradeNameId);
          if (selectedCityId) params.set("CityId", selectedCityId);
          if (startDate) params.set("StartDate", startDate.replaceAll("-", "-"));
          if (endDate) params.set("EndDate", endDate.replaceAll("-", "-"));

          const res = await fetchWithLanguage(
            `https://cement.northeurope.cloudapp.azure.com:5000/api/PricePage/GetPricePageData?${params.toString()}`,
          );
          const data = await res.json();
          const productGroups: ProductGroup[] = data.productTypes || [];

          for (const group of productGroups) {
            allItems.push({
              parentName: name,
              productTypeId: group.productTypeId,
              productTypeName: group.productTypeName,
              productName: group.productName,
              companies: group.companies,
            });
          }
        } catch (err) {
          console.error("Error fetching data for product:", id, err);
        }
      }

      setPriceData(allItems);

      // Derive company & trade-name lists from the fresh data
      const allCompanies: IdName[] = [];
      const allTradeNames: IdName[] = [];
      const seenCompanies = new Set<string>();
      const seenTrades = new Set<string>();

      for (const item of allItems) {
        for (const c of item.companies ?? []) {
          if (c.companyId && !seenCompanies.has(c.companyId)) {
            seenCompanies.add(c.companyId);
            allCompanies.push({ id: c.companyId, name: c.companyName });
          }
          if (c.tradeNameId && !seenTrades.has(c.tradeNameId)) {
            seenTrades.add(c.tradeNameId);
            allTradeNames.push({ id: c.tradeNameId, name: c.tradeName });
          }
        }
      }
      setCompanies(allCompanies);
      setTradeNames(allTradeNames);

      setLoading(false);
    };

    if (productTypes.length > 0) loadData();
  }, [productTypes, selectedProductId, selectedCompanyId, selectedTradeNameId, selectedCityId, startDate, endDate]);

  // ── Filter bar renderer ───────────────────────────────────────────────────
  const renderFilters = () => (
    <div className="grid md:grid-cols-5 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-xl">
      {/* Product type */}
      <select
        className="border border-gray-300 rounded-lg px-3 py-4 text-sm focus:ring-2 bg-[#E5FBFF] focus:ring-blue-400 focus:outline-none"
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
      >
        <option value="" disabled hidden>
          {language === "ar" ? "المنتج" : "Product"}
        </option>
        <option value="">{language === "ar" ? "الكل" : "All"}</option>
        {productTypes.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      {/* Company */}
      <select
        className="border border-gray-300 rounded-lg px-3 py-4 text-sm focus:ring-2 bg-[#E5FBFF] focus:ring-blue-400 focus:outline-none"
        value={selectedCompanyId}
        onChange={(e) => setSelectedCompanyId(e.target.value)}
      >
        <option value="" disabled hidden>
          {language === "ar" ? "الشركة" : "Company"}
        </option>
        <option value="">{language === "ar" ? "الكل" : "All"}</option>
        {companies.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {/* Trade name
      <select
        className="border border-gray-300 rounded-lg px-3 py-4 text-sm focus:ring-2 bg-[#E5FBFF] focus:ring-blue-400 focus:outline-none"
        value={selectedTradeNameId}
        onChange={(e) => setSelectedTradeNameId(e.target.value)}
      >
        <option value="" disabled hidden>
          {language === "ar" ? "الاسم التجاري" : "Trade Name"}
        </option>
        <option value="">{language === "ar" ? "الكل" : "All"}</option>
        {tradeNames.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select> */}
      {/* City */}
      <select
        className="border border-gray-300 rounded-lg px-3 py-4 text-sm focus:ring-2 bg-[#E5FBFF] focus:ring-blue-400 focus:outline-none"
        value={selectedCityId}
        onChange={(e) => setSelectedCityId(e.target.value)}
      >
        <option value="" disabled hidden>
          {language === "ar" ? "المحافظة" : "City"}
        </option>
        <option value="">{language === "ar" ? "الكل" : "All"}</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      {/* Start date */}
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-4 text-sm focus:ring-2 bg-[#E5FBFF] focus:ring-blue-400 focus:outline-none"
        title={language === "ar" ? "تاريخ البداية" : "Start Date"}
      />
      {/* End date */}
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-4 text-sm focus:ring-2 bg-[#E5FBFF] focus:ring-blue-400 focus:outline-none"
        title={language === "ar" ? "تاريخ النهاية" : "End Date"}
      />
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────

  // Auth loading guard
  if (authLoading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007b9e]"></div>
        <p className="mt-4 text-gray-500">{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <div className="w-full container mx-auto p-4 relative min-h-[80dvh]" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* ── Overlay 1: Not logged in ──────────────────────────────────────── */}
      {!user && (
        <div className="absolute inset-0 z-30 backdrop-blur-md bg-white/50 flex flex-col items-center justify-center gap-6 rounded-2xl min-h-[400px]">
          {/* Lock icon */}
          <div className="w-20 h-20 rounded-full bg-[#618FB5]/10 border-2 border-[#618FB5]/30 flex items-center justify-center">
            <LockKeyhole size={36} className="text-[#618FB5]" />
          </div>

          {/* Message */}
          <div className="text-center px-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {language === "ar" ? "تسجيل الدخول مطلوب" : "Login Required"}
            </h3>
            <p className="text-gray-500 text-base max-w-sm mx-auto">
              {language === "ar"
                ? "يجب عليك تسجيل الدخول أولاً للوصول إلى صفحة الأسعار"
                : "You must log in first to access the price list"}
            </p>
          </div>

          {/* CTA */}
          <Link href="/login">
            <button className="cursor-pointer bg-[#618FB5] hover:bg-[#507aa0] transition-colors text-white font-bold px-10 py-3 rounded-xl text-lg shadow-lg shadow-[#618FB5]/30">
              {language === "ar" ? "تسجيل الدخول" : "Login"}
            </button>
          </Link>
        </div>
      )}

      {/* ── Overlay 2: Logged in but no market access ─────────────────────── */}
      {user && isAuth && !isAuth.isSubscribed && (
        <div className="absolute inset-0 z-30 backdrop-blur-md bg-white/10 flex flex-col items-center justify-center gap-6 rounded-2xl min-h-[400px]">
          {/* Shield icon */}
          <div className="w-20 h-20 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center">
            <ShieldOff size={36} className="text-orange-500" />
          </div>

          {/* Message */}
          <div className="text-center px-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {language === "ar" ? "ليس لديك صلاحية الوصول" : "Access Not Granted"}
            </h3>
            <p className="text-gray-500 text-base max-w-sm mx-auto">
              {language === "ar"
                ? "يرجى التواصل مع مزود الخدمة للاشتراك والحصول على صلاحية الوصول إلى الأسعار"
                : "Please contact your service provider to subscribe and gain access to price data"}
            </p>
          </div>

          {/* CTA → WhatsApp */}
          <a href="https://wa.me/201110007733" target="_blank" rel="noopener noreferrer">
            <button className="cursor-pointer bg-[#25D366] hover:bg-[#1ebe5c] transition-colors text-white font-bold px-10 py-3 rounded-xl text-lg shadow-lg shadow-[#25D366]/30">
              {language === "ar" ? "تواصل مع مزود الخدمة" : "Contact Service Provider"}
            </button>
          </a>
        </div>
      )}

      {/* ── Main content ──────────────────────────────────────────────────── */}
      {loading ? (
        <div className="text-center py-6 text-gray-500">{t("common.loading")}</div>
      ) : (
        <>
          {renderFilters()}

          {priceData.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              {language === "ar" ? "لا توجد بيانات متاحة" : "No data available"}
            </div>
          ) : (
            <Accordion variant="splitted" selectionMode="multiple" className="w-full flex flex-col gap-3">
              {priceData.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={`${item.parentName} - ${item.productTypeName}`}
                  className="bg-[#E5FBFF] rounded-xl w-full shadow-sm"
                  classNames={{
                    base: "flex flex-col w-full",
                    titleWrapper: "flex flex-row-reverse justify-end items-center w-full",
                    indicator: "order-last ml-2 transition-transform duration-300 data-[state=open]:rotate-180",
                  }}
                >
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-center text-sm md:text-base bg-[#E5FBFF] border-separate border-spacing-y-1">
                      <thead>
                        <tr>
                          {headers.map((header, i) => (
                            <th key={i} className="p-2 font-semibold border-b border-gray-200">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {item.companies?.map((company, j) => (
                          <tr key={j} className="hover:bg-gray-50 transition-colors rounded-lg">
                            <td className="py-3 p-2">{company.companyName}</td>
                            <td className="py-3 p-2">{company.tradeName}</td>
                            <td className="py-3 p-2">{company.cityName || "-"}</td>
                            <td className="py-3 p-2">{company.lowestPrice}</td>
                            <td className="py-3 p-2">{company.maxPrice}</td>
                            <td className="py-3 p-2">{company.todayAvg}</td>
                            <td className="py-3 p-2">{company.yesterdayAvg}</td>
                            <td
                              className={`py-3 p-2 font-semibold ${
                                company.difference >= 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {company.difference}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </>
      )}
    </div>
  );
}
