"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
export interface PricesType {
  productTypes: ProductType[];
}

export interface ProductType {
  productTypeId: string;
  productName: string;
  productTypeName: string;
  companies: Company[];
}

export interface Company {
  companyName: string;
  tradeName: string;
  cityName: string;
  date: Date;
  maxPrice: number;
  lowestPrice: number;
  todayAvg: number;
  yesterdayAvg: number;
  difference: number;
}

export default function PriceAccordion() {
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

  const headers = ["الشركة", "المنتج", "التاريخ", "أعلى سعر", "أدنى سعر", "متوسط اليوم", "متوسط الأمس", "التغيير"];
  const filterableHeaders = headers.filter((h) => h !== "التغيير" && h !== "متوسط اليوم" && h !== "متوسط الأمس");

  const [filters, setFilters] = useState<Record<string, string>>({});

  const keyMap: Record<string, keyof (typeof defaultData)[0]> = {
    الشركة: "company",
    المنتج: "product",
    التاريخ: "date",
    "أعلى سعر": "high",
    "أدنى سعر": "low",
  };

  const uniqueValues = useMemo(() => {
    const values: Record<string, string[]> = {};
    filterableHeaders.forEach((header) => {
      const key = keyMap[header];
      const unique = Array.from(new Set(defaultData.map((d) => String(d[key]))));
      values[header] = unique;
    });
    return values;
  }, []);

  const filteredData = defaultData.filter((item) =>
    filterableHeaders.every((header) => {
      const key = keyMap[header];
      const filterValue = filters[header];
      if (!filterValue) return true;
      return String(item[key]) === filterValue;
    })
  );
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
    const res = await fetch("https://48.221.114.44/api/Product/GetAllProductsList");
    const data = await res.json();

    setProdactType(data.products);
  };
  const fetchData = async ({ id }: { id: string }) => {
    const res = await fetch(
      `https://48.221.114.44/api/PricePage/GetPricePageData?ProductId=${id}&StartDate=2025%2F10%2F27&EndDate=2025%2F10%2F27`
    );
    const data = await res.json();

    return data.productTypes;
  };

  useEffect(() => {
    fetchProdact();
  }, []);

  return (
    <div className="w-full containerr mx-auto p-4" dir="rtl">
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

      <Accordion variant="splitted" selectionMode="multiple" className="w-full">
        {prodactType.map(({ id, name }) => {
          const data = fetchData({ id });

          return (
            <AccordionItem
              key={id}
              aria-label={`Accordion ${id}`}
              title={`${name}`}
              textValue={`Accordion ${id}`}
              className="bg-[#E5FBFF] rounded-xl w-full shadow-sm"
              classNames={{
                base: "flex flex-col w-full",
                titleWrapper: "flex flex-row-reverse justify-between items-center w-full",
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
                    {filteredData.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors rounded-lg">
                        <td className="py-3 p-2">{data.company}</td>
                        <td className="py-3 p-2">{item.product}</td>
                        <td className="py-3 p-2">{item.date}</td>
                        <td className="py-3 p-2 text-green-600">{item.high}</td>
                        <td className="py-3 p-2 text-red-600">{item.low}</td>
                        <td className="py-3 p-2">{item.avgToday}</td>
                        <td className="py-3 p-2">{item.avgYesterday}</td>
                        <td
                          className={`py-3 p-2 ${
                            item.change.startsWith("+") ? "text-green-600" : "text-red-600"
                          } font-semibold`}
                        >
                          {item.change}
                        </td>
                      </tr>
                    ))}
                    {filteredData.length === 0 && (
                      <tr>
                        <td colSpan={8} className="text-gray-500 py-4">
                          لا توجد نتائج مطابقة للبحث
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
