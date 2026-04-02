"use client";
import React, { useEffect, useState } from "react";

import { fetchWithLanguage } from "@/lib/fetchWithLanguage";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

interface ProducerTabProps {
  id?: string;
}
interface Producer {
  id: string;
  name: string;
  categoryName: string;
  imagePath: string;
  websiteUrl: string;
  websiteVisible: boolean;
}
export const ProducerTab = ({ id = "" }: ProducerTabProps) => {
  const [producers, setProducers] = useState<{ producers: Producer[] }>({ producers: [] });
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
        producers.producers.map((pro) =>
          pro.websiteVisible ? (
            <Link href={pro.websiteUrl} key={pro.id} className=" px-4 py-2 w-[45%] md:w-[25%]">
              <div className=" w-full h-full rounded-xl overflow-hidden border border-gray-300">
                <img
                  src={pro.imagePath ? `${pro.imagePath}` : "/placeholder.png"}
                  alt={pro.name || "Producer"}
                  className="w-full h-full object-contain bg-gra"
                />
              </div>
            </Link>
          ) : (
            <div key={pro.id} className=" px-4 py-2 w-[45%] md:w-[25%]">
              <div className=" w-full h-full rounded-xl overflow-hidden border border-gray-300">
                <img
                  src={pro.imagePath ? `${pro.imagePath}` : "/placeholder.png"}
                  alt={pro.name || "Producer"}
                  className="w-full h-full object-contain bg-gra"
                />
              </div>
            </div>
          ),
        )
      ) : (
        <p className="text-gray-500 text-center">{t("common.no_producers")}</p>
      )}
    </div>
  );
};
