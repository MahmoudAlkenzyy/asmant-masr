"use client";
import React, { useEffect, useState } from "react";
import { StoreSlider } from "./StoreSlider";
import { prodactType } from "../../../page";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProductTypes, getStoreProducts, ProductStoreType } from "@/lib/api/store";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { LockKeyhole, ShieldOff } from "lucide-react";

interface StoreContentProps {
  // products property is no longer passed from parent
}

export const StoreContent: React.FC<StoreContentProps> = () => {
  const { t, language } = useLanguage();
  const { user, isLoading: authLoading, isAuth } = useAuth();
  const [products, setProducts] = useState<ProductStoreType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
