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
            duration: 10,
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
                    <ArrowUp className="text-green-600" size={22} />
                  ) : (
                    <ArrowDown className="text-red-600" size={22} />
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
