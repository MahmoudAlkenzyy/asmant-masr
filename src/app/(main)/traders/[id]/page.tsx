"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTraderCategories } from "@/contexts/TraderCategoriesContext";
import { TraderCategoryDetails } from "@/lib/api/traderCategories";
import { Hero } from "../../../components/pages/News/Hero";

export default function TraderCategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const { getCategoryDetails, categories } = useTraderCategories();
  const [categoryData, setCategoryData] = useState<TraderCategoryDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Find the category name from the categories list
  const categoryName = categories.find((cat) => cat.id === categoryId)?.name;

  useEffect(() => {
    async function loadCategoryData() {
      if (categoryId) {
        setLoading(true);
        const data = await getCategoryDetails(categoryId);
        setCategoryData(data);
        setLoading(false);
      }
    }

    loadCategoryData();
  }, [categoryId, getCategoryDetails]);
  console.log({ categories });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">لم يتم العثور على البيانات</h1>
          <p className="mt-2 text-gray-600">عذراً، لم نتمكن من تحميل بيانات هذه الفئة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <div className="w-[90%] mx-auto py-12">
        {/* Traders Grid */}
        <div dir="rtl" className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 p-4 py-8 pb-14">
          {categoryData.traders && categoryData.traders.length > 0 ? (
            categoryData.traders.map((trader: any) => (
              <div key={trader.id} className="rounded-xl overflow-hidden border border-gray-300">
                <img
                  src={
                    trader.imagePath
                      ? `https://cement.northeurope.cloudapp.azure.com:5000${trader.imagePath}`
                      : "/placeholder.png"
                  }
                  alt={trader.name || "Trader"}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">لا يوجد تجار في هذه الفئة.</p>
          )}
        </div>
      </div>
    </div>
  );
}
