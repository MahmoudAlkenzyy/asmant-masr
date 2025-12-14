"use client";
import React, { useEffect, useState } from "react";
import { StoreTab } from "./StoreTab";

const TABS = [
  { id: "cement", label: "اسمنت" },
  { id: "steel", label: "حديد" },
  { id: "gypsum", label: "جبس" },
  { id: "cer", label: "سيراميك" },
  { id: "paint", label: "دهانات" },
  { id: "rock", label: "طوب" },
  { id: "sant", label: "رمل" },
  { id: "bozlandi", label: "بوزلاني" },
];

export const Tabs: React.FC<{
  defaultTab?: string;
  onChange?: (id: string) => void;
}> = ({ defaultTab = "cement", onChange }) => {
  const [active, setActive] = useState<string>(defaultTab);
  const [prodactType, setProdactType] = useState([
    {
      id: "7e722b96-6e53-4860-39e5-08de155db96d",
      name: "اسمنت",
    },
    {
      id: "c452e6e3-dece-4f6d-39e6-08de155db96d",
      name: "حديد",
    },
    {
      id: "4fbf4456-9a19-4ff0-39e7-08de155db96d",
      name: "جبس",
    },
    {
      id: "8baee569-260c-4d36-39e8-08de155db96d",
      name: "سيراميك",
    },
    {
      id: "9a0ac48f-1e1c-4a40-39e9-08de155db96d",
      name: "دهانات",
    },
    {
      id: "f00e60b1-1c0d-4561-39ea-08de155db96d",
      name: "طوب",
    },
    {
      id: "b8410a03-efd8-4e78-39eb-08de155db96d",
      name: "رمل",
    },
    {
      id: "773bb9cb-2ac9-4984-39ec-08de155db96d",
      name: "بوزلاني",
    },
  ]);

  const fetchProdact = async () => {
    const res = await fetch("https://cement.runasp.net/api/Product/GetAllProductsList");
    const data = await res.json();

    setProdactType(data.products);
  };
  const handleClick = (id: string) => {
    setActive(id);
    onChange?.(id);
  };
  useEffect(() => {
    fetchProdact();
  }, []);

  return (
    <nav aria-label="أقسام الأخبار" dir="rtl" className="w-full bg-white">
      <h2 className="text-4xl font-bold mb-8 text-center pt-14">شركاء الصناعة</h2>

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
                className={`relative px-2 py-1 text-lg font-medium transition-colors outline-none
                  ${isActive ? "text-[#618FB5]" : "text-gray-700 hover:text-[#618FB5]"}
                `}
              >
                {tab.label}

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

      <div className="mt-6 containerr">
        {TABS.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={tab.id !== active}
          >
            <StoreTab id={prodactType?.find((cat) => cat.name == tab.label)?.id || ""} />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Tabs;
