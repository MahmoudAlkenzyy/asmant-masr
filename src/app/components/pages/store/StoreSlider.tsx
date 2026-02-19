"use client";
import React, { useState, useEffect } from "react";
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

export const StoreSlider: React.FC<StoreSliderProps> = ({ prodacts }) => {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<prodactType | null>(null);
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    category: "",
    quantity: 60,
    unit: "ton",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpenForm = (product: prodactType) => {
    setSelectedProduct(product);
    setFormData({
      type: product.productTypeName || "",
      location: product.cityName || "",
      category: product.tradeName || "",
      quantity: product.quantity || 60,
      unit: "ton",
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  const calculateTotal = () => {
    const pricePerTon = 5000;
    return (formData.quantity * pricePerTon).toLocaleString("en-US");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    toast.success(t("store.order_success"));
    handleCloseForm();
  };

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
        <h2 className="text-4xl font-bold mb-8 text-center ">{t("store.title")}</h2>

        <div className="flex justify-between items-center mb-6 relative">
          <h3 className="text-2xl font-semibold  text-nowrap">{t("store.subtitle")}</h3>
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
          className="mt-4 store-slider-equal-height"
        >
          {prodacts.map((cardInfo, i) => (
            <SwiperSlide key={i} className="flex">
              <StoreCard idx={i} cardInfo={cardInfo} onClick={() => handleOpenForm(cardInfo)} isHome={false} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Order Form */}
        {isFormOpen && (
          <div className="mt-8 max-w-4xl  mx-auto shadow-lg relative animate-slideDown">
            <form onSubmit={handleSubmit} className="space-y-6 text-[#618FB5]">
              <div className="bg-[#D6EFF8] rounded-2xl  p-8 pb-3 mb-0 rounded-b-none ">
                <div className="grid  gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">{t("store.order_type")}</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 bg-[#ECF5F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#618FB5]"
                    >
                      <option value="أسمنت بوزلاندي">أسمنت بوزلاندي</option>
                      <option value="أسمنت مقاوم">أسمنت مقاوم</option>
                      <option value="أسمنت أبيض">أسمنت أبيض</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {t("store.order_location")}
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 bg-[#ECF5F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#618FB5]"
                    >
                      <option value="القاهرة">القاهرة</option>
                      <option value="الإسكندرية">الإسكندرية</option>
                      <option value="الجيزة">الجيزة</option>
                      <option value="الدقهلية">الدقهلية</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {t("store.order_category")}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 bg-[#ECF5F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#618FB5]"
                    >
                      <option value="مقاوم المسلح">مقاوم المسلح</option>
                      <option value="عادي">عادي</option>
                      <option value="سريع الشك">سريع الشك</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {t("store.order_quantity")}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                        className="flex-1 px-4 py-3 border border-gray-300 bg-[#ECF5F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#618FB5]"
                        min="1"
                      />
                      <div className="px-4 py-3 border border-gray-300 bg-[#ECF5F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#618FB5]">
                        {t("store.order_unit")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#618FB5] text-white  p-6 rounded-lg rounded-t-none">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">{t("store.order_total")}</span>
                  <span className="text-xl font-bold text-white">
                    {calculateTotal()} {t("store.currency")}
                  </span>
                </div>
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

      <style jsx global>{`
        .store-slider-equal-height .swiper-wrapper {
          align-items: stretch !important;
        }
        .store-slider-equal-height .swiper-slide {
          height: auto !important;
          display: flex !important;
        }
        .store-slider-equal-height .swiper-slide > div {
          width: 100%;
          height: 100%;
          display: flex !important;
          flex-direction: column !important;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};
