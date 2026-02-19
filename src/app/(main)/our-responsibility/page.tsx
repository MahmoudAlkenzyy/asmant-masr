"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Page() {
  const { t, language } = useLanguage();

  const points = [
    { numKey: "disclaimer.first", textKey: "disclaimer.first_text" },
    { numKey: "disclaimer.second", textKey: "disclaimer.second_text" },
    { numKey: "disclaimer.third", textKey: "disclaimer.third_text" },
    { numKey: "disclaimer.fourth", textKey: "disclaimer.fourth_text" },
    { numKey: "disclaimer.fifth", textKey: "disclaimer.fifth_text" },
  ];

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"} className="containerr pt-20">
      <div>
        <h2 className="text-4xl md:text-2xl font-semibold mb-10 mt-10">{t("disclaimer.title")}</h2>
        <p className="text-[#292E2B] opacity-50 text-2xl md:text-xl leading-relaxed mb-12">{t("disclaimer.intro")}</p>
      </div>
      <section className="py-20 bg-[#F8F9FA]">
        <div className="mx-auto">
          <div className="space-y-8 flex flex-wrap">
            {points.map((point, idx) => (
              <div key={idx} className="md:w-1/2 p-2 rounded-lg">
                <h3 className="text-2xl md:text-2xl font-semibold mb-4 text-primary">{t(point.numKey)}</h3>
                <p className="text-[#292E2B] opacity-50 text-lg md:text-xl leading-relaxed">{t(point.textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
