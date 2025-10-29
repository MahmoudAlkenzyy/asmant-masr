"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";

export default function PriceAccordion() {
  const headers = ["الشركة", "المنتج", "التاريخ", "أعلى سعر", "أدنى سعر", "متوسط اليوم", "متوسط الأمس", "التغيير"];
  const defaultData = [
    {
      company: "شركة الأسمنت الوطنية",
      product: "أسمنت بورتلاندي عادي",
      date: "2025-10-22",
      high: "1700",
      low: "1650",
      avgToday: "1675",
      avgYesterday: "1680",
      change: "-5",
    },
    {
      company: "شركة السويس للأسمنت",
      product: "أسمنت مقاوم للكبريتات",
      date: "2025-10-22",
      high: "1750",
      low: "1700",
      avgToday: "1725",
      avgYesterday: "1720",
      change: "+5",
    },
    {
      company: "شركة مصر بني سويف",
      product: "أسمنت فائق النعومة",
      date: "2025-10-22",
      high: "1800",
      low: "1750",
      avgToday: "1775",
      avgYesterday: "1760",
      change: "+15",
    },
  ];
  const [prodactType, setProdactType] = useState<{ id: string; name: string }[]>([
    { id: "7e722b96-6e53-4860-39e5-08de155db96d", name: "اسمنت" },
    { id: "c452e6e3-dece-4f6d-39e6-08de155db96d", name: "حديد" },
    { id: "4fbf4456-9a19-4ff0-39e7-08de155db96d", name: "جبس" },
  ]);

  const [priceData, setPriceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchData = async (id: string) => {
    const res = await fetch(
      `https://48.221.114.44/api/PricePage/GetPricePageData?ProductId=${id}&StartDate=2025%2F10%2F27&EndDate=2025%2F10%2F27`
    );
    const data = await res.json();
    return data.productTypes || [];
  };
  const keyMap: Record<string, keyof (typeof defaultData)[0]> = {
    الشركة: "company",
    المنتج: "product",
    التاريخ: "date",
    "أعلى سعر": "high",
    "أدنى سعر": "low",
  };
  const filterableHeaders = headers.filter((h) => h !== "التغيير" && h !== "متوسط اليوم" && h !== "متوسط الأمس");
  const uniqueValues = useMemo(() => {
    const values: Record<string, string[]> = {};
    filterableHeaders.forEach((header) => {
      const key = keyMap[header];
      const unique = Array.from(new Set(defaultData.map((d) => String(d[key]))));
      values[header] = unique;
    });
    return values;
  }, []);
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      const allItems: any[] = [];

      for (const { id, name } of prodactType) {
        try {
          const productGroups = await fetchData(id);

          // Flatten each productType into its own accordion item
          for (const group of productGroups) {
            allItems.push({
              parentName: name, // e.g. اسمنت
              productTypeId: group.productTypeId,
              productTypeName: group.productTypeName, // e.g. أسمنت بورتلاندي عادي
              productName: group.productName,
              companies: group.companies,
            });
          }
        } catch (err) {
          console.error("Error fetching:", id, err);
        }
      }

      setPriceData(allItems);
      setLoading(false);
    };

    loadAll();
  }, [prodactType]);

  return (
    <div className="w-full container mx-auto p-4" dir="rtl">
      {loading ? (
        <div className="text-center py-6 text-gray-500">جاري تحميل البيانات...</div>
      ) : priceData.length === 0 ? (
        <div className="text-center py-6 text-gray-500">لا توجد بيانات متاحة</div>
      ) : (
        <>
          <div className="grid md:grid-cols-5 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-xl">
            {filterableHeaders.map((header) => (
              <select
                key={header}
                className="border border-gray-300 rounded-lg px-3 py-4 text-sm focus:ring-2 bg-[#E5FBFF] focus:ring-blue-400 focus:outline-none"
                value={filters[header] || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    [header]: e.target.value,
                  }))
                }
              >
                <option value="" disabled hidden>
                  {header}
                </option>
                <option value="">الكل</option>
                {uniqueValues[header]?.map((val, i) => (
                  <option key={i} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            ))}
          </div>
          <Accordion variant="splitted" selectionMode="multiple" className="w-full flex ">
            {priceData.map((item, index) => (
              <AccordionItem
                key={index}
                title={`${item.parentName} - ${item.productTypeName}`}
                className="bg-[#E5FBFF] rounded-xl w-full shadow-sm"
                classNames={{
                  base: "flex flex-col w-full",
                  titleWrapper: "flex flex-row-reverse justify-end items-center w-full",
                  indicator: "order-last ml-2 transition-transform duration-300 data-[state=open]:rotate-180",
                }}
              >
                <div className="overflow-x-auto">
                  <table className="min-w-full text-center text-sm md:text-base bg-[#E5FBFF] border-separate border-spacing-y-1">
                    <thead>
                      <tr>
                        {headers.map((header, i) => (
                          <th key={i} className="p-2 font-semibold border-b border-gray-200">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {item.companies?.length > 0 ? (
                        item.companies.map((company: any, j: number) => (
                          <tr key={j} className="hover:bg-gray-50 transition-colors rounded-lg">
                            <td className="py-3 p-2">{company.companyName}</td>
                            <td className="py-3 p-2">{item.productTypeName}</td>
                            <td className="py-3 p-2">{company.date?.split("T")[0]}</td>
                            <td className="py-3 p-2 text-green-600">{company.maxPrice}</td>
                            <td className="py-3 p-2 text-red-600">{company.lowestPrice}</td>
                            <td className="py-3 p-2">{company.todayAvg}</td>
                            <td className="py-3 p-2">{company.yesterdayAvg}</td>
                            <td
                              className={`py-3 p-2 font-semibold ${
                                company.difference >= 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {company.difference}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="py-3 text-gray-500">
                            لا توجد بيانات للشركات
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </div>
  );
}
