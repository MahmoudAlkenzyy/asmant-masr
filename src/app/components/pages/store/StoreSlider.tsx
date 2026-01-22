"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { StoreCard } from "../Home/StoreCard";
import { prodactType } from "../../../page";
import { toast } from "react-toastify";

interface StoreSliderProps {
  prodacts: prodactType[];
}

export const StoreSlider: React.FC<StoreSliderProps> = ({ prodacts }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<prodactType | null>(null);
  const [formData, setFormData] = useState({
    type: "أسمنت بوزلاندي",
    location: "القاهرة",
    category: "مقاوم المسلح",
    quantity: 60,
    unit: "طن",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpenForm = (product: prodactType) => {
    setSelectedProduct(product);
    setFormData({
      type: product.productTypeName || "أسمنت بوزلاندي",
      location: product.cityName || "القاهرة",
      category: product.tradeName || "مقاوم المسلح",
      quantity: product.quantity || 60,
      unit: "طن",
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  const calculateTotal = () => {
    const pricePerTon = 5000; // Example price
    return (formData.quantity * pricePerTon).toLocaleString("en-US");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Show toast notification
    toast.success("تم طلب الصفقة بنجاح");

    // Close form
    handleCloseForm();
  };

  if (!isMounted) {
    return (
      <section dir="rtl" className="bg-[#618FB5] py-9">
        <div className="containerr">
          <h2 className="text-4xl font-bold mb-8 text-center text-white">المتجر</h2>
          <div className="flex justify-center items-center py-20">
            <div className="text-white">جاري التحميل...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section dir="rtl" className="bg-[] py-9">
      <div className="containerr">
        <h2 className="text-4xl font-bold mb-8 text-center ">المتجر</h2>

        <div className="flex justify-between items-center mb-6 relative">
          <h3 className="text-2xl font-semibold  text-nowrap"> انواع الاسمنت</h3>
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
        >
          {prodacts.map((cardInfo, i) => (
            <SwiperSlide key={i}>
              <StoreCard idx={i} cardInfo={cardInfo} onClick={() => handleOpenForm(cardInfo)} isHome={false} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Order Form */}
        {isFormOpen && (
          <div className="mt-8 max-w-4xl  mx-auto shadow-lg relative animate-slideDown">
            {/* <button
              onClick={handleCloseForm}
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold mb-6 text-center">طلب صفقة</h3> */}

            <form onSubmit={handleSubmit} className="space-y-6 text-[#618FB5]">
              <div className="bg-[#D6EFF8] rounded-2xl  p-8 pb-3 mb-0 rounded-b-none ">
                <div className="grid  gap-6">
                  {/* النوع */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">النوع</label>
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

                  {/* المكان */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">إختر المكان</label>
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

                  {/* الصنف */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">إختر الصنف</label>
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

                  {/* الكمية */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">الكمية</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                        className="flex-1 px-4 py-3 border border-gray-300 bg-[#ECF5F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#618FB5]"
                        min="1"
                      />
                      <div
                        //   value={formData.unit}
                        //   onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        className="px-4 py-3 border border-gray-300 bg-[#ECF5F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#618FB5]"
                      >
                        طن
                        {/* <option value="كيس">كيس</option> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* إجمالي السعر */}
              </div>
              <div className="bg-[#618FB5] text-white  p-6 rounded-lg rounded-t-none">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">إجمالي السعر</span>
                  <span className="text-xl font-bold text-white">{calculateTotal()} جنيه</span>
                </div>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#51E482] text-black py-4 rounded-lg font-bold text-lg hover:bg-[#4a7a9a] transition"
              >
                طلب الصفقة
              </button>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
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
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -100%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </section>
  );
};
