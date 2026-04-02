"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft, ArrowRight, User, Phone, MapPin, Package, AlertCircle } from "lucide-react";
import { StoreCard } from "../Home/StoreCard";
import { prodactType } from "../../../page";
import { toast } from "react-toastify";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { fetchWithLanguage } from "../../../../lib/fetchWithLanguage";
import {
  CompanyOption,
  TradeNameOption,
  getCompanies,
  getTradeNames,
  getAccountMe,
  requestDeal,
} from "@/lib/api/store";
import { isValidPhone, isNonEmpty } from "@/lib/validation";

interface StoreSliderProps {
  prodacts: prodactType[];
}

export const StoreSlider: React.FC<StoreSliderProps> = ({ prodacts }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  // ── Static city list ──────────────────────────────────────────────────────
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);

  // ── Form open/close ───────────────────────────────────────────────────────
  const [isFormOpen, setIsFormOpen] = useState(false);

  // ── Selected product (from card click) ───────────────────────────────────
  const [selProductId, setSelProductId] = useState("");
  const [selProductTypeId, setSelProductTypeId] = useState("");
  const [selProductName, setSelProductName] = useState("");
  const [selProductTypeName, setSelProductTypeName] = useState("");

  // ── City ─────────────────────────────────────────────────────────────────
  const [selCityId, setSelCityId] = useState("");
  const [selCityName, setSelCityName] = useState("");

  // ── Companies ─────────────────────────────────────────────────────────────
  const [companies, setCompanies] = useState<CompanyOption[]>([]);
  const [selCompanyId, setSelCompanyId] = useState("");
  const [selCompanyName, setSelCompanyName] = useState("");
  const [loadingCompanies, setLoadingCompanies] = useState(false);

  // ── Trade names ───────────────────────────────────────────────────────────
  const [tradeNames, setTradeNames] = useState<TradeNameOption[]>([]);
  const [selTradeId, setSelTradeId] = useState("");
  const [selTradeName, setSelTradeName] = useState("");
  const [loadingTrades, setLoadingTrades] = useState(false);

  // ── Avg price ─────────────────────────────────────────────────────────────
  const [avgPrice, setAvgPrice] = useState<number | null>(null);
  const [loadingAvgPrice, setLoadingAvgPrice] = useState(false);

  // ── Quantity ─────────────────────────────────────────────────────────────
  const [quantity, setQuantity] = useState(60);

  // ── Customer info (pre-filled from /api/Account/me) ───────────────────────
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);

  // ── Submitting ────────────────────────────────────────────────────────────
  const [submitting, setSubmitting] = useState(false);

  // ── Form validation errors ────────────────────────────────────────────────
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const clearFormError = (field: string) =>
    setFormErrors((prev) => {
      const n = { ...prev };
      delete n[field];
      return n;
    });

  // ── On mount: fetch cities ────────────────────────────────────────────────
  useEffect(() => {
    setIsMounted(true);
    fetchWithLanguage("https://cement.northeurope.cloudapp.azure.com:5000/api/Store/GetCities")
      .then((res) => res.json())
      .then((json) => setCities(json.cities || []))
      .catch((err) => console.error("Failed to fetch cities:", err));
  }, []);

  // ── When city changes → fetch companies ──────────────────────────────────
  useEffect(() => {
    if (!selCityId || !selProductTypeId) {
      setCompanies([]);
      setSelCompanyId("");
      setSelCompanyName("");
      setTradeNames([]);
      setSelTradeId("");
      setSelTradeName("");
      return;
    }
    setLoadingCompanies(true);
    setSelCompanyId("");
    setSelCompanyName("");
    setTradeNames([]);
    setSelTradeId("");
    setSelTradeName("");
    getCompanies(selProductTypeId, selCityId)
      .then((data) => setCompanies(data))
      .finally(() => setLoadingCompanies(false));
  }, [selCityId, selProductTypeId]);

  // ── When company changes → fetch trade names ──────────────────────────────
  useEffect(() => {
    if (!selCompanyId || !selProductTypeId) {
      setTradeNames([]);
      setSelTradeId("");
      setSelTradeName("");
      return;
    }
    setLoadingTrades(true);
    setSelTradeId("");
    setSelTradeName("");
    console.log({ selCompanyId, selProductTypeId });

    getTradeNames(selCompanyId, selProductTypeId)
      .then((data) => setTradeNames(data))
      .finally(() => setLoadingTrades(false));
  }, [selCompanyId, selProductTypeId]);

  const getAvgPrice = async (tradeId: string, cityId: string) => {
    setLoadingAvgPrice(true);
    setAvgPrice(null);
    try {
      const res = await fetchWithLanguage(
        `https://cement.northeurope.cloudapp.azure.com:5000/api/Store/GetAvgPrice?TradeNameId=${tradeId}&CityId=${cityId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await res.json();
      setAvgPrice(data.avgPrice ?? null);
    } catch (err) {
      console.error("Failed to fetch avg price:", err);
    } finally {
      setLoadingAvgPrice(false);
    }
  };

  // ── When trade name + city are both selected → fetch avg price ────────────
  useEffect(() => {
    if (selTradeId && selCityId) {
      getAvgPrice(selTradeId, selCityId);
    } else {
      setAvgPrice(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selTradeId, selCityId]);
  // ── Card click: open form & pre-fill customer data ────────────────────────
  const handleOpenForm = async (product: prodactType) => {
    console.log({ product });

    setSelProductId(product.productId || "");
    setSelProductTypeId(product.productTypeId || product.id || "");
    setSelProductName(product.productName || "");
    setSelProductTypeName(product.productTypeName || "");
    // Reset dependent fields
    setSelCityId("");
    setSelCityName("");
    setCompanies([]);
    setSelCompanyId("");
    setSelCompanyName("");
    setTradeNames([]);
    setSelTradeId("");
    setSelTradeName("");
    setQuantity(product.quantity || 60);
    setIsFormOpen(true);

    // Pre-fill customer info from API
    if (user?.token) {
      setLoadingProfile(true);
      const me = await getAccountMe(user.token);
      if (me) {
        setCustomerName(me.name || "");
        setPhone(me.phoneNumber || "");
      }
      setLoadingProfile(false);
    }
  };

  const handleCloseForm = () => setIsFormOpen(false);

  // ── Submit → POST /api/Store/RequestDeal ─────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.token) {
      toast.error(t("store.login_required_title"));
      return;
    }

    // ── Validate all fields ────────────────────────────────────────────────────
    const errors: Record<string, string> = {};
    if (!selCityId) errors.city = t("store.select_city_first");
    if (!selCompanyId) errors.company = t("store.select_company_first");
    if (!selTradeId) errors.trade = t("store.order_category");
    if (!isNonEmpty(customerName)) errors.customerName = t("register.name_required") || "الاسم مطلوب";
    if (!isNonEmpty(phone)) errors.phone = t("register.phone_required") || "رقم الهاتف مطلوب";
    else if (!isValidPhone(phone))
      errors.phone = t("register.phone_invalid") || "رقم الهاتف غير صحيح (مثال: 01012345678)";
    if (!isNonEmpty(shippingAddress))
      errors.shippingAddress = t("store.shipping_address") + " " + (t("jobs.required") || "مطلوب");

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    setSubmitting(true);
    const success = await requestDeal(
      {
        productId: selProductId,
        productTypeId: selProductTypeId,
        cityId: selCityId,
        companyId: selCompanyId,
        tradeNameId: selTradeId,
        customerName,
        phone,
        shippingAddress,
        quantity,
        unit: t("store.order_unit"),
      },
      user.token,
    );

    setSubmitting(false);
    if (success) {
      toast.success(t("store.order_success"));
      handleCloseForm();
    } else {
      toast.error(t("store.order_failed") || "فشل إرسال الطلب، حاول مرة أخرى");
    }
  };

  // ── Reusable select renderer ──────────────────────────────────────────────
  const Dropdown = ({
    label,
    value,
    options,
    onChange,
    disabled,
    loading,
    placeholder,
  }: {
    label: string;
    value: string;
    options: { id: string; name: string }[];
    onChange: (id: string, name: string) => void;
    disabled?: boolean;
    loading?: boolean;
    placeholder?: string;
  }) => (
    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => {
            const selected = options.find((o) => o.id === e.target.value);
            onChange(e.target.value, selected?.name || "");
          }}
          disabled={disabled || loading}
          className={`w-full px-4 py-3 border border-gray-300 bg-[#ECF5F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#618FB5] transition ${
            disabled || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <option value="">{loading ? t("common.loading") : placeholder || label}</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
        {loading && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 border-2 border-[#618FB5] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
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
    <section dir="rtl" className="py-9">
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
          navigation={{ nextEl: ".swiper-button-next-store", prevEl: ".swiper-button-prev-store" }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
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

        {/* ══════════════════ ORDER FORM ══════════════════ */}
        {isFormOpen && (
          <div className="mt-8 max-w-4xl mx-auto  rounded-2xl overflow-hidden animate-slideDown">
            <form onSubmit={handleSubmit} className="text-[#618FB5]">
              {/* ── SECTION 1: Product Details ──────────────────────────── */}
              <div className="bg-[#D6EFF8] p-8 shadow-xl">
                {/* Section header */}
                {/* <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#618FB5] flex items-center justify-center">
                    <Package size={16} className="text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-[#618FB5]">{t("store.section_product") || "تفاصيل المنتج"}</h4>
                </div> */}

                <div className="grid grid-cols-1 gap-5">
                  {/* 1. المنتج */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">{t("storecard.product")}</label>
                    <input
                      readOnly
                      value={selProductName}
                      className="w-full px-4 py-3 border border-gray-300 bg-white/70 rounded-lg cursor-default select-none text-gray-700"
                    />
                  </div>

                  {/* 2. النوع */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">{t("store.order_type")}</label>
                    <input
                      readOnly
                      value={selProductTypeName}
                      className="w-full px-4 py-3 border border-gray-300 bg-white/70 rounded-lg cursor-default select-none text-gray-700"
                    />
                  </div>

                  {/* 3. المدينة */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {t("store.order_location")}
                    </label>
                    <select
                      value={selCityId}
                      onChange={(e) => {
                        const city = cities.find((c) => c.id === e.target.value);
                        setSelCityId(e.target.value);
                        setSelCityName(city?.name || "");
                      }}
                      className="w-full px-4 py-3 border border-gray-300 bg-[#ECF5F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#618FB5]"
                    >
                      <option value="">{t("store.order_location")}</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 4. الشركة */}
                  <Dropdown
                    label={t("storecard.company")}
                    value={selCompanyId}
                    options={companies}
                    onChange={(id, name) => {
                      setSelCompanyId(id);
                      setSelCompanyName(name);
                    }}
                    disabled={!selCityId}
                    loading={loadingCompanies}
                    placeholder={!selCityId ? t("store.select_city_first") : t("storecard.company")}
                  />

                  {/* 5. اسم التجارة */}
                  <Dropdown
                    label={t("store.order_category")}
                    value={selTradeId}
                    options={tradeNames}
                    onChange={(id, name) => {
                      setSelTradeId(id);
                      setSelTradeName(name);
                    }}
                    disabled={!selCompanyId}
                    loading={loadingTrades}
                    placeholder={!selCompanyId ? t("store.select_company_first") : t("store.order_category")}
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
                      <div className="px-4 py-3 border border-gray-300 bg-[#ECF5F9] rounded-lg font-semibold">
                        {t("store.order_unit")}
                      </div>
                    </div>
                  </div>
                  {/* 6. متوسط السعر */}
                </div>
              </div>
              {(loadingAvgPrice || avgPrice !== null) && (
                <div className="flex items-center text-white justify-between bg-[#618FB5] py-5 gap-3 px-4 rounded-b-lg">
                  <span className="text-sm font-semibold ">{t("store.avg_price") || "متوسط السعر"}:</span>
                  {loadingAvgPrice ? (
                    <div className="h-4 w-4 border-2 border-[#618FB5] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="text-lg font-bold te">
                      {avgPrice && avgPrice * quantity}{" "}
                      <span className="text-sm font-normal">{t("store.avg_price_unit") || "جنيه / طن"}</span>
                    </span>
                  )}
                </div>
              )}

              {/* ── DIVIDER ──────────────────────────────────────────────── */}
              {/* <div className="flex items-center gap-4 bg-[#618FB5]/10 px-8 py-3">
                <div className="flex-1 h-px bg-[#618FB5]/30" />
                <span className="text-xs font-semibold text-[#618FB5] tracking-widest uppercase">
                  {t("store.section_customer") || "بيانات العميل"}
                </span>
                <div className="flex-1 h-px bg-[#618FB5]/30" />
              </div> */}

              {/* ── SECTION 2: Customer Details ─────────────────────────── */}
              <div className="bg-[#D6EFF8] p-8 mt-10">
                {/* Section header */}
                {/* <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#618FB5] flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-[#618FB5]">{t("store.section_customer") || "بيانات العميل"}</h4>
                  {loadingProfile && (
                    <div className="h-4 w-4 border-2 border-[#618FB5] border-t-transparent rounded-full animate-spin" />
                  )}
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* الاسم */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      <span className="inline-flex items-center gap-1">
                        <User size={13} />
                        {t("store.customer_name")}
                      </span>
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        clearFormError("customerName");
                      }}
                      onBlur={(e) =>
                        !isNonEmpty(e.target.value) &&
                        setFormErrors((p) => ({ ...p, customerName: t("register.name_required") || "الاسم مطلوب" }))
                      }
                      required
                      placeholder={t("store.customer_name")}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-gray-50 transition-colors ${
                        formErrors.customerName
                          ? "border-red-400 focus:ring-red-300"
                          : "border-gray-300 focus:ring-[#618FB5]"
                      }`}
                    />
                    {formErrors.customerName && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        {formErrors.customerName}
                      </p>
                    )}
                  </div>

                  {/* رقم الهاتف */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      <span className="inline-flex items-center gap-1">
                        <Phone size={13} />
                        {t("store.customer_phone")}
                      </span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        clearFormError("phone");
                      }}
                      onBlur={(e) => {
                        if (!isNonEmpty(e.target.value))
                          setFormErrors((p) => ({ ...p, phone: t("register.phone_required") || "رقم الهاتف مطلوب" }));
                        else if (!isValidPhone(e.target.value))
                          setFormErrors((p) => ({ ...p, phone: t("register.phone_invalid") || "رقم الهاتف غير صحيح" }));
                        else clearFormError("phone");
                      }}
                      required
                      placeholder={t("store.customer_phone")}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-gray-50 transition-colors ${
                        formErrors.phone ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-[#618FB5]"
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* عنوان الشحن */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={13} />
                        {t("store.shipping_address")}
                      </span>
                    </label>
                    <textarea
                      value={shippingAddress}
                      onChange={(e) => {
                        setShippingAddress(e.target.value);
                        clearFormError("shippingAddress");
                      }}
                      onBlur={(e) =>
                        !isNonEmpty(e.target.value) &&
                        setFormErrors((p) => ({
                          ...p,
                          shippingAddress: t("store.shipping_address") + " " + (t("jobs.required") || "مطلوب"),
                        }))
                      }
                      required
                      rows={3}
                      placeholder={t("store.shipping_address")}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-gray-50 resize-none transition-colors ${
                        formErrors.shippingAddress
                          ? "border-red-400 focus:ring-red-300"
                          : "border-gray-300 focus:ring-[#618FB5]"
                      }`}
                    />
                    {formErrors.shippingAddress && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        {formErrors.shippingAddress}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-6 cursor-pointer bg-[#51E482] disabled:opacity-60 disabled:cursor-not-allowed text-black py-4 rounded-xl font-bold text-lg hover:bg-[#3ecf6e] transition flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      {t("common.loading")}
                    </>
                  ) : (
                    t("store.order_btn")
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
