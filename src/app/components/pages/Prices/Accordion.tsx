import { AccordionItem } from "@heroui/accordion";
import React from "react";

export const Accordion = ({ num }) => {
  return (
    <AccordionItem
      aria-label={`Accordion ${num}`}
      title={`سعر الأسمنت في المنطقة ${num}`}
      textValue={`Accordion ${num}`}
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
                <td className="py-3 p-2">{item.company}</td>
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
};
