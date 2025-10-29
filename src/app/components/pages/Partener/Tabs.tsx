"use client";
import React, { useEffect, useState } from "react";
import { PartenerTab } from "./PartenerTab";

const TABS = [
  { id: "tecnecal", label: "التقنيين" },
  { id: "tog", label: "تجاريين" },
  { id: "ex", label: "موردين" },
];

export const Tabs: React.FC<{
  defaultTab?: string;
  onChange?: (id: string) => void;
}> = ({ defaultTab = "tecnecal", onChange }) => {
  const [active, setActive] = useState<string>(defaultTab);
  const [partenerType, setPartenerType] = useState([
    {
      id: "fa8ff85f-1976-4feb-0fbd-08de152d81c3",
      name: "التقنيين",
    },
    {
      id: "c07f75b1-c655-410d-0fbe-08de152d81c3",
      name: "تجاريين",
    },
    {
      id: "feecdd37-d7e8-42b8-0fbf-08de152d81c3",
      name: "موردين",
    },
  ]);

  const fetchPartenerCategory = async () => {
    const res = await fetch("https://48.221.114.44/api/PartnerCategory/GetAllPartnerCategoryList");
    const data = await res.json();
    setPartenerType(data.categories);
  };
  const handleClick = (id: string) => {
    setActive(id);
    onChange?.(id);
  };
  useEffect(() => {
    fetchPartenerCategory();
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
            <PartenerTab id={partenerType.find((cat) => cat.name == tab.label)?.id || ""} />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Tabs;
