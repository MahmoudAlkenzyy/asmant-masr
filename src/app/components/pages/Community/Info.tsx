"use client";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Info = () => {
  const { t } = useLanguage();

  const companyInfoKeys = [
    "community.info1",
    "community.info2",
    "community.info3",
    "community.info4",
    "community.info5",
    "community.info6",
    "community.info7",
  ];

  const mainGoalsKeys = ["community.goal1", "community.goal2", "community.goal3", "community.goal4", "community.goal5"];

  return (
    <>
      <section dir="rtl" className="py-20 bg-[#F8F9FA]">
        <div className="containerr max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-2xl font-bold mb-10 ">{t("community.vision_title")}</h2>
          <p className="text-[#292E2B] opacity-50 text-xl md:text-2xl leading-relaxed">{t("community.vision_text")}</p>
        </div>
      </section>

      <section dir="rtl" className="py-20 bg-white">
        <div className="containerr max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-2xl font-bold mb-10 ">{t("community.mission_title")}</h2>
          <p className="text-[#292E2B] opacity-50 text-xl md:text-2xl leading-relaxed">{t("community.mission_text")}</p>
        </div>
      </section>

      <section dir="rtl" className="py-20 bg-[#F8F9FA]">
        <div className="containerr max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-2xl font-bold mb-14 ">{t("community.goals_title")}</h2>
          <div className="space-y-6">
            {mainGoalsKeys.map((key, idx) => (
              <div key={idx} className="  rounded-lg ">
                <div className="flex gap-4 items-start">
                  <span className="text-3xl md:text-xl text-[#292E2B] opacity-50 flex-shrink-0">
                    {["１", "２", "３", "４", "５"][idx]}-
                  </span>
                  <p className="text-[#292E2B] opacity-50 text-lg md:text-xl leading-relaxed flex-1">{t(key)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#E5FBFF] py-20">
        <h2 className="text-3xl md:text-2xl font-bold mb-14 text-center">{t("community.company_info_title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 containerr">
          {companyInfoKeys.map((key, idx) => (
            <p
              key={idx}
              className={`bg-white text-lg md:text-xl py-9 text-center text-[#292E2B] opacity-70  px-6 rounded-lg shadow-sm ${
                idx === 0 && "md:w-1/2 mx-auto md:col-span-2"
              }`}
            >
              {t(key)}
            </p>
          ))}
        </div>
      </section>
    </>
  );
};
