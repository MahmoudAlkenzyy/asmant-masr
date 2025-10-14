"use client";

import React, { useState } from "react";
import { NewsTab } from "./NewsTab";

const TABS = [
  { id: "all", label: "كل الأخبار" },
  { id: "general", label: "أخبار عامة" },
  { id: "cement", label: "أخبار الأسمنت" },
  { id: "world", label: "أخبار الأسمنت حول العالم" },
];

export const Tabs: React.FC<{
  defaultTab?: string;
  onChange?: (id: string) => void;
}> = ({ defaultTab = "all", onChange }) => {
  const [active, setActive] = useState<string>(defaultTab);

  const handleClick = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <nav aria-label="أقسام الأخبار" dir="rtl" className="w-full bg-secoundry">
      <h2 className="text-4xl font-bold mb-8 text-center pt-14">الأخبار</h2>

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
            <NewsTab />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Tabs;
