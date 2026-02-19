"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-primary  text-white text-end mt-auto">
      <div className="py-20 containerr w-[90%] mx-auto">
        <div className="bg-no-repeat w-fit mx-auto relative flex justify-center py-4 ">
          <img src="/images/Home/Footer.png" className="md:w-[1200] absolute inset-0 bottom-0 h-full " alt="" />
          <div className="relative  flex items-center gap-6 md:gap-10 text-white flex-col justify-center px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-medium">{t("footer.subscribe_title")}</h2>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
              <button className="bg-white text-black py-3 px-10 md:px-12 w-full rounded-lg cursor-pointer">
                {t("footer.subscribe_btn")}
              </button>
              <div className=" flex justify-between grow">
                <input
                  dir="rtl"
                  className="py-3 px-4 ps-6 md:ps-16 rounded-lg border border-white w-full grow md:w-auto"
                  placeholder={t("footer.email_placeholder")}
                />
                <input
                  dir="rtl"
                  className="py-3 px-4 ps-6 md:ps-16 rounded-lg border border-white w-full grow md:w-auto"
                  placeholder={t("footer.name_placeholder")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between mt-16 text-lg gap-10 md:gap-0">
          <ul className="w-full sm:w-1/2 md:w-1/6 space-y-2">
            <li className="font-bold">{t("footer.company")}</li>
            <li>
              <Link href="/">{t("footer.home")}</Link>
            </li>
            <li>
              <Link href="/pricing">{t("footer.prices")}</Link>
            </li>
            <li>
              <Link href="/news">{t("footer.news")}</Link>
            </li>
            <li>
              <Link href="/partners">{t("footer.partners_producers")}</Link>
            </li>
            <li>
              <Link href="/forum">{t("footer.forum")}</Link>
            </li>
            <li>
              <Link href="/store">{t("footer.store")}</Link>
            </li>
            <li>
              <Link href="/academy">{t("footer.academy")}</Link>
            </li>
          </ul>

          <ul className="w-full sm:w-1/2 md:w-1/6 space-y-2">
            <li className="font-bold">{t("footer.news_section")}</li>
            <li>
              <Link href="/news/general">{t("footer.general_news")}</Link>
            </li>
            <li>
              <Link href="/news/cement">{t("footer.cement_news")}</Link>
            </li>
            <li>
              <Link href="/news/egypt">{t("footer.egypt_news")}</Link>
            </li>
            <li>
              <Link href="/news/world">{t("footer.world_news")}</Link>
            </li>
            <li>
              <Link href="/forum">{t("footer.forum")}</Link>
            </li>
            <li>
              <Link href="/store">{t("footer.store")}</Link>
            </li>
            <li>
              <Link href="/academy">{t("footer.academy")}</Link>
            </li>
          </ul>

          <ul className="w-full sm:w-1/2 md:w-1/6 space-y-2">
            <li className="font-bold">{t("footer.material_prices")}</li>
            <li>
              <Link href="/prices/cement">{t("footer.cement")}</Link>
            </li>
            <li>
              <Link href="/prices/iron">{t("footer.iron")}</Link>
            </li>
            <li>
              <Link href="/prices/gypsum">{t("footer.gypsum")}</Link>
            </li>
          </ul>

          <ul className="w-full sm:w-1/2 md:w-1/6 space-y-2">
            <li className="font-bold">{t("footer.community")}</li>
            <li>
              <Link href="/jobs">{t("footer.jobs")}</Link>
            </li>
            <li>
              <Link href="/deals">{t("footer.deals")}</Link>
            </li>
            <li>
              <Link href="/academy">{t("footer.academy")}</Link>
            </li>
          </ul>

          <div className="w-full md:w-2/6 space-y-4 flex items-end justify-start flex-col text-center md:text-end">
            <Image
              width={180}
              height={70}
              className="h-auto mx-auto md:mx-0"
              src={"/images/Home/Cement-Egypt-footer.png"}
              alt="Cement Egypt"
            />
            <p className="max-w-[80%] leading-relaxed mx-auto md:mx-0">{t("footer.description")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
