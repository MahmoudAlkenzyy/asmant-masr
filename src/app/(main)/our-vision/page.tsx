"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Page() {
  const { t, language } = useLanguage();
  return (
    <div dir={language === "ar" ? "rtl" : "ltr"}>
      <section className="py-20 bg-white md:flex containerr">
        <div className="containerr md:w-1/2 mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">{t("vision.credibility_title")}</h2>
          <p className="text-[#292E2B] opacity-50 text-xl max-w-xl md:text-xl leading-relaxed font-normal">
            {t("vision.credibility_text1")}
          </p>
          <p className="text-[#292E2B] opacity-50 text-xl max-w-xl md:text-xl leading-relaxed mt-6 font-normal">
            {t("vision.credibility_text2")}
          </p>
        </div>
        <div className="md:w-1/2">
          <img src="/images/Community/Ellipse.png" className="mx-auto" alt="" />
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="containerr max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-2xl font-bold mb-10">{t("vision.about_title")}</h2>
          <p className="text-[#292E2B] opacity-50 text-xl md:text-2xl leading-relaxed mb-8">
            {t("vision.about_text1")}
          </p>
          <p className="text-[#292E2B] opacity-50 text-xl md:text-2xl leading-relaxed mb-8">
            {t("vision.about_text2")}
          </p>
          <p className="text-[#292E2B] opacity-50 text-xl md:text-2xl leading-relaxed text-center">
            {t("vision.about_text3")}
          </p>
        </div>
      </section>
    </div>
  );
}
