"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";

export default function PriceAccordion() {
  const headers = ["الشركة", "المنتج", "التاريخ", "أعلى سعر", "أدنى سعر", "متوسط اليوم", "متوسط الأمس", "التغيير"];

  const [prodactType, setProdactType] = useState([
    { id: "7e722b96-6e53-4860-39e5-08de155db96d", name: "اسمنت" },
    { id: "c452e6e3-dece-4f6d-39e6-08de155db96d", name: "حديد" },
    { id: "4fbf4456-9a19-4ff0-39e7-08de155db96d", name: "جبس" },
  ]);

  const [priceData, setPriceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split("T")[0]);

  const getProductType = async () => {
    const res = await fetch("https://cement.northeurope.cloudapp.azure.com:5000/api/Product/GetAllProductsList");
    const data = await res.json();
    setProdactType(data.products);
  };
  const fetchData = async (id: string, start: string, end: string) => {
    const res = await fetch(
      `https://cement.northeurope.cloudapp.azure.com:5000/api/PricePage/GetPricePageData?ProductId=${id}&StartDate=${start}&EndDate=${end}`,
    );
    const data = await res.json();
    return data.productTypes || [];
  };

  const keyMap: Record<string, string> = {
    الشركة: "companyName",
    المنتج: "productTypeName",
    التاريخ: "date",
    "أعلى سعر": "maxPrice",
    "أدنى سعر": "lowestPrice",
  };

  const filterableHeaders = headers.filter((h) => h !== "التغيير" && h !== "متوسط اليوم" && h !== "متوسط الأمس");

  // 🧩 Fetch all product data
  useEffect(() => {
    getProductType();
  }, []);
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      const allItems: any[] = [];

      for (const { id, name } of prodactType) {
        try {
          const productGroups = await fetchData(id, startDate.replaceAll("-", "%2F"), endDate.replaceAll("-", "%2F"));

          for (const group of productGroups) {
            allItems.push({
              parentName: name,
              productTypeId: group.productTypeId,
              productTypeName: group.productTypeName,
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
  }, [prodactType, startDate, endDate]);

  // 🔹 Extract unique filter values
  const uniqueValues = useMemo(() => {
    const values: Record<string, string[]> = {};
    const allCompanies = priceData.flatMap(
      (item) =>
        item.companies?.map((c: any) => ({
          companyName: c.companyName,
          productTypeName: item.productTypeName,
          date: c.date?.split("T")[0],
          maxPrice: c.maxPrice,
          lowestPrice: c.lowestPrice,
        })) || [],
    );

    filterableHeaders.forEach((header) => {
      const key = keyMap[header];
      const unique = Array.from(new Set(allCompanies.map((c) => String(c[key]))));
      values[header] = unique;
    });

    return values;
  }, [priceData]);

  // 🔹 Apply filters
  const filteredData = useMemo(() => {
    if (Object.values(filters).every((v) => v === "")) return priceData;

    return priceData
      .map((item) => ({
        ...item,
        companies: item.companies?.filter((c: any) =>
          Object.entries(filters).every(([header, value]) => {
            if (!value) return true;
            const key = keyMap[header];
            const actualValue = key === "productTypeName" ? item.productTypeName : c[key];
            return String(actualValue) === value;
          }),
        ),
      }))
      .filter((item) => item.companies && item.companies.length > 0); // ✅ hide empty accordions
  }, [priceData, filters]);

  return (
    <div className="w-full container mx-auto p-4" dir="rtl">
      {loading ? (
        <div className="text-center py-6 text-gray-500">جاري تحميل البيانات...</div>
      ) : priceData.length === 0 ? (
        <div className="">
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

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-4 text-sm focus:ring-2 bg-[#E5FBFF] focus:ring-blue-400 focus:outline-none"
              title="تاريخ البداية"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-4 text-sm focus:ring-2 bg-[#E5FBFF] focus:ring-blue-400 focus:outline-none"
              title="تاريخ النهاية"
            />
          </div>
          <div className="text-center py-6 text-gray-500">لا توجد بيانات متاحة</div>
        </div>
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

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-4 text-sm focus:ring-2 bg-[#E5FBFF] focus:ring-blue-400 focus:outline-none"
              title="تاريخ البداية"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-4 text-sm focus:ring-2 bg-[#E5FBFF] focus:ring-blue-400 focus:outline-none"
              title="تاريخ النهاية"
            />
          </div>

          <Accordion variant="splitted" selectionMode="multiple" className="w-full flex flex-col gap-3">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
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
                        {item.companies?.map((company: any, j: number) => (
                          <tr key={j} className="hover:bg-gray-50 transition-colors rounded-lg">
                            <td className="py-3 p-2">{company.companyName}</td>
                            <td className="py-3 p-2">{company.tradeName}</td>
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionItem>
              ))
            ) : (
              <div className="text-center text-gray-500 py-6">لا توجد بيانات مطابقة للبحث.</div>
            )}
          </Accordion>
        </>
      )}
    </div>
  );
}
