"use client";
import React, { useEffect, useState } from "react";
import { ProducerTab } from "./ProducerTab";
import { fetchWithLanguage } from "@/lib/fetchWithLanguage";
import { useLanguage } from "@/contexts/LanguageContext";

export const Tabs: React.FC<{
  defaultTab?: string;
  onChange?: (id: string) => void;
}> = ({ defaultTab = "cement", onChange }) => {
  const [active, setActive] = useState<string>(defaultTab);
  const [producersType, setProducersType] = useState<{ id: string; name: string }[]>([]);
  const { t, language } = useLanguage();

  const fetchNewsCategory = async () => {
    const res = await fetchWithLanguage(
      "https://cement.northeurope.cloudapp.azure.com:5000/api/ProducerCategory/GetAllProducerCategoryList",
    );
    const data = await res.json();
    setProducersType(data.categories);
  };
  const handleClick = (id: string) => {
    setActive(id);
    onChange?.(id);
  };
  useEffect(() => {
    fetchNewsCategory();
  }, [language]);

  return (
    <nav aria-label="producer tabs" dir={language === "ar" ? "rtl" : "ltr"} className="w-full bg-white">
      <h2 className="text-4xl font-bold mb-8 text-center pt-14">{t("nav.producers")}</h2>

      <ul role="tablist" className="flex gap-4 pb-6 overflow-auto containerr ">
        {producersType.map(({ id, name }: any) => {
          const isActive = id === active;
          return (
            <li key={id} role="presentation">
              <button
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${id}`}
                id={`tab-${id}`}
                onClick={() => handleClick(id)}
                className={`relative px-2 py-1 text-lg font-medium transition-colors outline-none
                  ${isActive ? "text-[#618FB5]" : "text-gray-700 hover:text-[#618FB5]"}
                `}
              >
                {name}

                <span
                  className={`absolute left-0 right-0 -bottom-2 h-[2px] transition-all duration-200 ${
                    isActive ? "bg-[#618FB5] scale-x-100" : "bg-transparent scale-x-0"
                  }`}
                  style={{ transformOrigin: "left" }}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 containerr min-h-[600px] ">
        {producersType.map(({ id, name }: any) => (
          <div key={id} id={`panel-${id}`} role="tabpanel" aria-labelledby={`tab-${id}`} hidden={id !== active}>
            <ProducerTab id={producersType.find((cat: any) => cat.name == name)?.id || ""} />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Tabs;
