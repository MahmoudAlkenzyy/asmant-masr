"use client";

import React, { useEffect, useState } from "react";
import { NewsTab } from "./NewsTab";
import { fetchWithLanguage } from "@/lib/fetchWithLanguage";
import { useLanguage } from "@/contexts/LanguageContext";

const TABS = [
  { id: "all", label: "كل الاخبار", labelEn: "All News" },
  { id: "general", label: "اخبار عامة", labelEn: "General News" },
  { id: "cement", label: "اخبار الاسمنت", labelEn: "Cement News" },
  { id: "world", label: "اخبار الاسمنت حول العالم", labelEn: "Global News" },
];

export const Tabs: React.FC<{
  defaultTab?: string;
  onChange?: (id: string) => void;
}> = ({ defaultTab = "all", onChange }) => {
  const [active, setActive] = useState<string>(defaultTab);
  const { t, language } = useLanguage();
  const [categories, setCategories] = useState([{ id: "0a4b3d2d-2e28-4308-0e4a-08de14636697", name: "اخبار الاسمنت" }]);

  const fetchNewsCategory = async () => {
    const res = await fetchWithLanguage(
      "https://cement.northeurope.cloudapp.azure.com:5000/api/NewsCategory/GetAllNewsCategoryList",
    );
    const data = await res.json();
    setCategories(data.categories || []);
  };
  const handleClick = (id: string) => {
    setActive(id);
    onChange?.(id);
  };
  useEffect(() => {
    fetchNewsCategory();
  }, [language]);

  return (
    <nav aria-label="أقسام الأخبار" dir={language === "ar" ? "rtl" : "ltr"} className="w-full bg-white">
      <h2 className="text-4xl font-bold mb-8 text-center pt-14">{t("nav.news")}</h2>

      <ul role="tablist" className="flex gap-4 pb-6 overflow-auto containerr ">
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <li key={tab.id} role="presentation">
              <button
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => handleClick(tab.id)}
                className={`relative px-2 py-1 text-sm md:text-lg font-medium transition-colors outline-none
                  ${isActive ? "text-[#618FB5]" : "text-gray-700 hover:text-[#618FB5]"}
                `}
              >
                {language === "ar" ? tab.label : tab.labelEn}

                <span
                  className={`absolute left-0 right-0 -bottom-2 h-[2px] transition-all duration-200 ${
                    isActive ? "bg-[#618FB5] scale-x-100" : "bg-transparent scale-x-0"
                  }`}
                  style={{ transformOrigin: language === "ar" ? "right" : "left" }}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 containerr">
        {TABS.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={tab.id !== active}
          >
            <NewsTab id={categories.find((cat) => cat.name == tab.label)?.id || ""} />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Tabs;
