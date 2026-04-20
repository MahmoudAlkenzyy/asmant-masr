"use client";
import React, { useEffect, useState } from "react";

import { fetchWithLanguage } from "@/lib/fetchWithLanguage";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import ImgSlider from "../Home/ImgSlider";

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
  const renderProducer = (pro: Producer) =>
    pro.websiteVisible ? (
      <Link href={pro.websiteUrl} key={pro.id} className=" px-4 py-2">
        <div className=" w-full h-full rounded-xl overflow-hidden border border-gray-300">
          <img
            src={pro.imagePath ? `${pro.imagePath}` : "/placeholder.png"}
            alt={pro.name || "Producer"}
            className="w-full h-full object-contain bg-gra"
          />
        </div>
      </Link>
    ) : (
      <div key={pro.id} className=" px-4 py-2">
        <div className=" w-full h-full rounded-xl overflow-hidden border border-gray-300">
          <img
            src={pro.imagePath ? `${pro.imagePath}` : "/placeholder.png"}
            alt={pro.name || "Producer"}
            className="w-full h-full object-contain bg-gra"
          />
        </div>
      </div>
    );

  return (
    <div className="p-4 py-8 pb-14">
      {producers?.producers?.length > 0 ? (
        <>
          {/* First 8 producers */}
          <div className="grid grid-cols-2 md:grid-cols-4">{producers.producers.slice(0, 8).map(renderProducer)}</div>

          {/* Two full-width ImgSliders */}
          <div className="grid grid-cols-2 md:grid-cols-4 my-4 gap-4">
            <ImgSlider className="col-span-2" />
            <ImgSlider className="col-span-2" />
          </div>

          {/* Remaining producers */}
          {producers.producers.length > 8 && (
            <div className="grid grid-cols-2 md:grid-cols-4">{producers.producers.slice(8).map(renderProducer)}</div>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-center">{t("common.no_producers")}</p>
      )}
    </div>
  );
};
