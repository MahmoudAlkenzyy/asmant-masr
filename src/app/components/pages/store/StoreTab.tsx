"use client";
import React, { useEffect, useState } from "react";
import { StoreCard } from "../Home/StoreCard";
import { fetchWithLanguage } from "@/lib/fetchWithLanguage";
import { useLanguage } from "@/contexts/LanguageContext";

interface StoreTabProps {
  id?: string;
}

export const StoreTab = ({ id = "" }: StoreTabProps) => {
  const [prodact, setProdact] = useState([]);
  const { t, language } = useLanguage();

  const getProdact = async () => {
    const res = await fetchWithLanguage(
      `https://cement.northeurope.cloudapp.azure.com:5000/api/Store/GetProductStoreDetails?ProductId=${id}`,
      {
        cache: "no-store",
      },
    );

    const data = await res.json();
    setProdact(data.items || []);
  };
  useEffect(() => {
    getProdact();
  }, [id, language]);
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-8 p-4 py-8 pb-14">
      {prodact?.length > 0 ? (
        prodact.map((pro: any, idx) => <StoreCard key={idx} idx={idx} isHome={false} cardInfo={pro} />)
      ) : (
        <p className="text-gray-500 text-center col-span-full">{t("store.no_products")}</p>
      )}
    </div>
  );
};
