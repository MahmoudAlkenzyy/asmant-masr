"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Facebook, LucideFacebook } from "lucide-react";

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer dir={t("common.dir")} className="bg-primary  text-white text-end mt-auto">
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

        <div className="flex flex-row-reverse text-start flex-wrap justify-between mt-16 text-lg gap-10 md:gap-0">
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

          <div className="w-full md:w-2/6 space-y-4 flex items-start justify-start flex-col text-center md:text-start">
            <Image
              width={180}
              height={70}
              className="h-auto mx-auto md:mx-0"
              src={"/images/Home/Cement-Egypt-footer.png"}
              alt="Cement Egypt"
            />
            <p className="max-w-[80%] leading-relaxed mx-auto md:mx-0">{t("footer.description")}</p>

            <div className="flex gap-3">
              <Link
                href="tel:+201110007733"
                className="border border-white rounded-full w-7 h-7 flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.1528 9.1875L10.2478 8.97C10.0238 8.94369 9.79671 8.96849 9.58367 9.04254C9.37064 9.11658 9.17715 9.23794 9.01775 9.3975L7.63775 10.7775C5.5088 9.69446 3.7783 7.96396 2.69525 5.835L4.08276 4.4475C4.40525 4.125 4.56275 3.675 4.51025 3.2175L4.29275 1.3275C4.25039 0.961569 4.07485 0.624019 3.7996 0.379197C3.52435 0.134374 3.16863 -0.000600053 2.80026 2.00547e-06H1.50276C0.655255 2.00547e-06 -0.0497449 0.705002 0.00275511 1.5525C0.400255 7.9575 5.52276 13.0725 11.9203 13.47C12.7678 13.5225 13.4728 12.8175 13.4728 11.97V10.6725C13.4803 9.915 12.9103 9.2775 12.1528 9.1875Z"
                    fill="white"
                  />
                </svg>
              </Link>
              <span className="border border-white rounded-full w-7 h-7 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.77419 1.22064C8.5829 1.22064 8.7971 1.22742 9.51161 1.26C9.94122 1.26526 10.3667 1.34414 10.7697 1.49323C11.0619 1.60592 11.3273 1.77855 11.5487 2C11.7702 2.22145 11.9428 2.48683 12.0555 2.77903C12.2046 3.18197 12.2835 3.60749 12.2887 4.0371C12.321 4.75161 12.3281 4.96581 12.3281 6.77452C12.3281 8.58322 12.3213 8.79742 12.2887 9.51193C12.2835 9.94154 12.2046 10.3671 12.0555 10.77C11.9428 11.0622 11.7702 11.3276 11.5487 11.549C11.3273 11.7705 11.0619 11.9431 10.7697 12.0558C10.3667 12.2049 9.94122 12.2838 9.51161 12.289C8.79742 12.3213 8.58323 12.3284 6.77419 12.3284C4.96516 12.3284 4.75097 12.3216 4.03677 12.289C3.60717 12.2838 3.18165 12.2049 2.77871 12.0558C2.4865 11.9431 2.22113 11.7705 1.99968 11.549C1.77822 11.3276 1.60559 11.0622 1.4929 10.77C1.34382 10.3671 1.26493 9.94154 1.25968 9.51193C1.22742 8.79742 1.22032 8.58322 1.22032 6.77452C1.22032 4.96581 1.2271 4.75161 1.25968 4.0371C1.26493 3.60749 1.34382 3.18197 1.4929 2.77903C1.60559 2.48683 1.77822 2.22145 1.99968 2C2.22113 1.77855 2.4865 1.60592 2.77871 1.49323C3.18165 1.34414 3.60717 1.26526 4.03677 1.26C4.75129 1.22774 4.96548 1.22064 6.77419 1.22064ZM6.77419 0C4.93548 0 4.70387 0.00774191 3.98129 0.0406451C3.41905 0.0518283 2.86277 0.158284 2.33613 0.355484C1.88435 0.525699 1.47516 0.79244 1.1371 1.1371C0.792129 1.47528 0.525159 1.88471 0.354839 2.33677C0.157639 2.86342 0.0511832 3.41969 0.04 3.98194C0.00774196 4.70387 0 4.93548 0 6.77419C0 8.6129 0.00774191 8.84452 0.0406451 9.5671C0.0518283 10.1293 0.158284 10.6856 0.355484 11.2123C0.525616 11.6643 0.792362 12.0737 1.1371 12.4119C1.47535 12.7567 1.88477 13.0234 2.33677 13.1935C2.86342 13.3907 3.41969 13.4972 3.98194 13.5084C4.70452 13.5406 4.93516 13.549 6.77484 13.549C8.61452 13.549 8.84516 13.5413 9.56774 13.5084C10.13 13.4972 10.6863 13.3907 11.2129 13.1935C11.6628 13.0192 12.0713 12.7528 12.4123 12.4116C12.7534 12.0703 13.0195 11.6616 13.1936 11.2116C13.3907 10.685 13.4972 10.1287 13.5084 9.56645C13.5406 8.84451 13.5484 8.6129 13.5484 6.77419C13.5484 4.93548 13.5406 4.70387 13.5077 3.98129C13.4966 3.41905 13.3901 2.86277 13.1929 2.33613C13.0228 1.88412 12.756 1.4747 12.4113 1.13645C12.073 0.791716 11.6636 0.52497 11.2116 0.354839C10.685 0.157639 10.1287 0.0511832 9.56645 0.04C8.84452 0.00774196 8.6129 0 6.77419 0Z"
                    fill="white"
                  />
                  <path
                    d="M6.77559 3.29688C6.08756 3.29688 5.41499 3.5009 4.84292 3.88314C4.27085 4.26539 3.82497 4.80869 3.56168 5.44434C3.29838 6.07999 3.22949 6.77944 3.36372 7.45425C3.49795 8.12905 3.82926 8.7489 4.31577 9.2354C4.80227 9.72191 5.42212 10.0532 6.09692 10.1875C6.77173 10.3217 7.47118 10.2528 8.10683 9.98949C8.74248 9.7262 9.28578 9.28032 9.66803 8.70825C10.0503 8.13618 10.2543 7.46361 10.2543 6.77558C10.2543 5.85297 9.88779 4.96815 9.2354 4.31577C8.58302 3.66338 7.6982 3.29688 6.77559 3.29688ZM6.77559 9.03365C6.32898 9.03365 5.89241 8.90122 5.52107 8.6531C5.14974 8.40498 4.86031 8.05232 4.68941 7.63971C4.5185 7.2271 4.47378 6.77308 4.56091 6.33506C4.64804 5.89704 4.8631 5.49469 5.17889 5.17889C5.49469 4.8631 5.89704 4.64804 6.33506 4.56091C6.77308 4.47378 7.2271 4.5185 7.63971 4.6894C8.05232 4.86031 8.40498 5.14973 8.6531 5.52107C8.90122 5.89241 9.03365 6.32898 9.03365 6.77558C9.03365 7.37446 8.79575 7.94881 8.37228 8.37228C7.94881 8.79575 7.37446 9.03365 6.77559 9.03365Z"
                    fill="white"
                  />
                  <path
                    d="M10.391 3.97151C10.84 3.97151 11.2039 3.60756 11.2039 3.15861C11.2039 2.70965 10.84 2.3457 10.391 2.3457C9.94207 2.3457 9.57812 2.70965 9.57812 3.15861C9.57812 3.60756 9.94207 3.97151 10.391 3.97151Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span className="border border-white rounded-full w-7 h-7 flex items-center justify-center bg-white">
                <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.86888 12.1749V6.62136H0V4.45703H1.86888V2.8609C1.86888 1.00861 3.0002 0 4.65258 0C5.44408 0 6.12434 0.0589293 6.32258 0.0852686V2.02102L5.17657 2.02154C4.27792 2.02154 4.10392 2.44857 4.10392 3.0752V4.45703H6.24712L5.96807 6.62136H4.10391V12.1749H1.86888Z"
                    fill="#618FB5"
                  />
                </svg>
              </span>
              <span className="border border-white rounded-full w-7 h-7 flex items-center justify-center">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.1739 1.04756C10.7549 1.23379 10.3126 1.35018 9.84702 1.42002C10.3126 1.14067 10.6851 0.698371 10.848 0.162953C10.4057 0.419022 9.91686 0.605254 9.38144 0.721649C8.96242 0.279348 8.35717 0 7.70535 0C6.44829 0 5.42401 1.02428 5.42401 2.28134C5.42401 2.46758 5.44729 2.63053 5.49385 2.79348C3.60825 2.70037 1.90888 1.79248 0.768207 0.395743C0.581975 0.744929 0.46558 1.11739 0.46558 1.53641C0.46558 2.3279 0.861323 3.02627 1.48986 3.44529C1.11739 3.42202 0.768207 3.3289 0.442301 3.16595V3.18922C0.442301 4.30662 1.23379 5.23778 2.28134 5.44729C2.09511 5.49385 1.8856 5.51713 1.67609 5.51713C1.53641 5.51713 1.37346 5.49385 1.23379 5.47057C1.53641 6.37845 2.37446 7.05354 3.37546 7.05354C2.58397 7.6588 1.60625 8.03126 0.535417 8.03126C0.349185 8.03126 0.162953 8.03126 0 8.00798C1.02428 8.65979 2.21151 9.03226 3.51513 9.03226C7.72863 9.03226 10.0333 5.54041 10.0333 2.51413C10.0333 2.42102 10.0333 2.30462 10.0333 2.21151C10.4756 1.90888 10.8713 1.51314 11.1739 1.04756Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
