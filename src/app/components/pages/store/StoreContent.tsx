"use client";
import React, { useEffect, useState } from "react";
import { StoreSlider } from "./StoreSlider";
import { prodactType } from "../../../page";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProductTypes, getStoreProducts, ProductStoreType } from "@/lib/api/store";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { LockKeyhole, ShieldOff, X, ScrollText } from "lucide-react";

interface StoreContentProps {
  // products property is no longer passed from parent
}

export const StoreContent: React.FC<StoreContentProps> = () => {
  const { t, language } = useLanguage();
  const { user, isLoading: authLoading, isAuth } = useAuth();
  const [products, setProducts] = useState<ProductStoreType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPolitics, setShowPolitics] = useState<boolean>(false);

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

  if (loading || authLoading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007b9e]"></div>
        <p className="mt-4 text-gray-500">{t("common.loading") || "Loading..."}</p>
      </div>
    );
  }

  return (
    <div className="py-10 relative min-h-[600px]">
      {/* ── Overlay 1: Not logged in ─────────────────────────────────────────── */}
      {!user && (
        <div className="absolute inset-0 z-20 backdrop-blur-md bg-white/10 flex flex-col items-center justify-center gap-6 rounded-2xl">
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
          {/* Politics Button */}
          <button
            onClick={() => setShowPolitics(true)}
            className="cursor-pointer flex items-center gap-2  text-[#618FB5] hover:bg-[#618FB5]/10 transition-colors font-bold px-8 py-2.5 rounded-xl text-base"
          >
            {/* <ScrollText size={18} /> */}
            سياسة المتجر
          </button>

          <Link href="/login">
            <button className="cursor-pointer bg-[#618FB5] hover:bg-[#507aa0] transition-colors text-white font-bold px-10 py-3 rounded-xl text-lg shadow-lg shadow-[#618FB5]/30">
              {t("nav.login")}
            </button>
          </Link>
        </div>
      )}

      {/* ── Overlay 2: Logged in but no market access ─────────────────────────── */}
      {user && isAuth && !isAuth.hasMarketAccess && (
        <div className="absolute inset-0 z-20 backdrop-blur-md bg-white/40 flex flex-col items-center justify-center gap-6 rounded-2xl">
          {/* Shield-off icon */}
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
                ? "يرجى التواصل مع مزود الخدمة للاشتراك والحصول على صلاحية الوصول إلى المتجر"
                : "Please contact your service provider to subscribe and gain access to the store"}
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

      {/* ── Politics Popup Modal ─────────────────────────────────────────── */}
      {showPolitics && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={() => setShowPolitics(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <div className="flex items-center gap-2">
                {/* <ScrollText size={20} className="text-[#618FB5]" /> */}
                <h2 className="text-xl font-bold text-gray-800">سياسة المتجر</h2>
              </div>
              <button
                onClick={() => setShowPolitics(false)}
                className="cursor-pointer w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-6 text-right">
              {/* Steps */}
              <section>
                <h3 className="text-lg font-bold text-[#618FB5] mb-3 border-b border-[#618FB5]/20 pb-2">
                  خطوات وإجراءات المتجر
                </h3>
                <ul className="space-y-2.5 text-gray-700 text-sm leading-relaxed">
                  {[
                    "قم بتسجيل بياناتك المطلوبة بشكل صحيح",
                    "بعد التسجيل، يتم فتح حساب العميل وإتاحة التعامل على المتجر.",
                    "بعد ذلك قم بتحديد نوع الأسمنت المطلوب والكمية.",
                    "مع العلم ان الحد الأدنى للطلب هو 60 طن.",
                    "يتم التسليم من خلال الموقع إلى العنوان المحدد من قبل العميل.",
                    "يتم السداد نقدًا وفقًا للسياسة المتبعة.",
                    "سيتم التواصل مع العميل من خلال فريق خدمة العملاء لتأكيد التفاصيل وإتمام العملية.",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-[#618FB5]/15 text-[#618FB5] text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Policy */}
              <section>
                <h3 className="text-lg font-bold text-[#618FB5] mb-3 border-b border-[#618FB5]/20 pb-2">
                  📜 سياسة البيع في المتجر
                </h3>
                <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                  <p>
                    يُعد هذا المتجر أول متجر إلكتروني متخصص في بيع الأسمنت داخل نطاق القاهرة الكبرى (القاهرة – الجيزة –
                    القليوبية)، ويهدف إلى تسهيل عملية شراء الأسمنت لجميع الشركات والعملاء في مختلف المناطق.
                  </p>
                  <p>
                    يوفر المتجر مجموعة متنوعة من أنواع الأسمنت من كبرى الشركات، مع ضمان جودة المنتجات وسرعة إجراءات
                    الطلب والتواصل.
                  </p>
                  <p>
                    كما نسعى إلى تقديم تجربة شراء سهلة وآمنة، بداية من تسجيل الطلب وحتى إتمام عملية التسليم، مع دعم كامل
                    من فريق خدمة العملاء لضمان رضا العملاء.
                  </p>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-center">
              <button
                onClick={() => setShowPolitics(false)}
                className="cursor-pointer bg-[#618FB5] hover:bg-[#507aa0] transition-colors text-white font-bold px-10 py-2.5 rounded-xl"
              >
                حسناً
              </button>
            </div>
          </div>
        </div>
      )}

      {products.length > 0 ? (
        <StoreSlider prodacts={products} />
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl containerr border-2 border-dashed border-gray-200">
          <p className="text-xl text-gray-500 font-medium">
            {language === "ar" ? "لا توجد منتجات متاحة حالياً" : "No products available"}
          </p>
        </div>
      )}
    </div>
  );
};
