"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

export interface pricesType {
  id: string;
  name: string;
  productId: string;
  productName: string;
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
}

export const PricesTable = ({ prices }: { prices: pricesType[] }) => {
  const items = [...prices, ...prices];

  return (
    <section className="py-8 overflow-hidden rounded-xl">
      <h2 className="text-2xl font-semibold pb-5 text-start">أسعار المواد</h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex flex-nowrap gap-20 w-max"
          animate={{ x: ["0%", "49%"] }}
          transition={{
            repeat: Infinity,
            duration: 22,
            ease: "linear",
          }}
        >
          {items.map((item, index) => {
            const isUp = item.averagePrice >= item.lowestPrice + (item.highestPrice - item.lowestPrice) / 2;

            return (
              <div
                key={index}
                className="flex gap-10 items-center justify-between bg-gray-50 px-7 py-5 rounded-2xl shadow-md whitespace-nowrap"
              >
                <p className="font-semibold text-lg">{item.name}</p>

                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">{item.averagePrice}</span>

                  {isUp ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
                        fill="#51E482"
                      />
                    </svg>
                  ) : (
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14 12L16.29 9.71L11.41 4.83L7.41 8.83L0 1.41L1.41 0L7.41 6L11.41 2L17.71 8.29L20 6V12H14Z"
                        fill="#EF3826"
                      />
                    </svg>
                  )}

                  <span className={`text-xs ${isUp ? "text-green-600" : "text-red-600"}`}>
                    {isUp ? "ارتفاع" : "انخفاض"}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
