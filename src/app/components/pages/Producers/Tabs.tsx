"use client";
import React, { useEffect, useState } from "react";
import { ProducerTab } from "./ProducerTab";

const TABS = [
  { id: "cement", label: "أسمنت" },
  { id: "steel", label: "حديد" },
  { id: "gypsum", label: "جبس" },
];

export const Tabs: React.FC<{
  defaultTab?: string;
  onChange?: (id: string) => void;
}> = ({ defaultTab = "cement", onChange }) => {
  const [active, setActive] = useState<string>(defaultTab);
  const [producersType, setProducersType] = useState([
    {
      id: "21695a6d-d15e-4b89-6afa-08de148c2ffb",
      name: "جبس",
    },
    {
      id: "cda167cb-ac93-4a60-6afb-08de148c2ffb",
      name: "حديد",
    },
    {
      id: "072a4538-7b0e-4f16-6afc-08de148c2ffb",
      name: "أسمنت",
    },
  ]);

  const fetchNewsCategory = async () => {
    const res = await fetch("http://back.talkstent.com/api/ProducerCategory/GetAllProducerCategoryList");
    const data = await res.json();
    setProducersType(data.categories);
  };
  const handleClick = (id: string) => {
    setActive(id);
    onChange?.(id);
  };
  useEffect(() => {
    fetchNewsCategory();
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
            <ProducerTab id={producersType.find((cat) => cat.name == tab.label)?.id || ""} />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Tabs;
