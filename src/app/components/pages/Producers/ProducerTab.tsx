"use client";
import React, { useEffect, useState } from "react";

import { fetchWithLanguage } from "@/lib/fetchWithLanguage";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProducerTabProps {
  id?: string;
}

export const ProducerTab = ({ id = "" }: ProducerTabProps) => {
  const [producers, setProducers] = useState({ producers: [] });
  const { t } = useLanguage();

  const getProducers = async () => {
    const res = await fetchWithLanguage(
      `https://cement.northeurope.cloudapp.azure.com:5000/api/Producer/GetAllProducerList?CategoryId=${id}`,
      {
        cache: "no-store",
      },
    );

    const producers = await res.json();
    setProducers(producers);
  };
  useEffect(() => {
    getProducers();
  }, []);
  return (
    <div className="flex flex-wrap  p-4 py-8 pb-14">
      {producers?.producers?.length > 0 ? (
        producers.producers.map((pro: any) => (
          <div key={pro.id} className=" px-4 py-2 w-[45%] md:w-[25%]">
            <div className=" w-full h-full rounded-xl overflow-hidden border border-gray-300">
              <img
                src={pro.imagePath ? `${pro.imagePath}` : "/placeholder.png"}
                alt={pro.name || "Producer"}
                className="w-full h-full object-contain bg-gra"
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">{t("common.no_producers")}</p>
      )}
    </div>
  );
};
