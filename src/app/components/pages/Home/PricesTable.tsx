"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

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
  const { t } = useLanguage();
  const items = [...prices, ...prices];

  return (
    <section className="py-8 overflow-hidden rounded-xl">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold pb-14 text-start">{t("home.prices.title")}</h2>
        <Link
          href="/prices"
          className="text-[#51E482] flex items-center gap-2 bg-white rounded-lg self-center py-3 px-5"
        >
          {t("home.prices.button")}
          <ArrowLeft />
        </Link>
      </div>

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
                className="flex gap-10 w-[400px] items-center justify-between bg-gray-50 px-7 py-5 rounded-2xl shadow-md whitespace-nowrap"
              >
                <p className="font-semibold text-lg text-wrap">{item.name}</p>

                <div className="flex flex-col items-center gap-2">
                  <span className={`text-xs ${isUp ? "text-green-600" : "text-red-600"}`}>{t("common.range")}</span>
                  <div className="flex items-center  gap-2">
                    <span className="text-xl font-bold ">{item.averagePrice}</span>

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
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
