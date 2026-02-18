"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X, Languages } from "lucide-react";
import { motion } from "framer-motion";
import { useTraderCategories } from "@/contexts/TraderCategoriesContext";
import { useLanguage } from "@/contexts/LanguageContext";
export type NavChild = {
  link: string;
  to: string;
};

export type NavItem = {
  link: string;
  to: string;
  children?: NavChild[];
};
export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeParent, setActiveParent] = useState<string | null>(null);
  const { categories, loading } = useTraderCategories();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar";
    setLanguage(newLang);
    // Reload the page to fetch new data with the new language
    window.location.reload();
  };

  const traderCategories: NavItem = {
    link: t("nav.traders"),
    to: "",
    children:
      !loading && categories.length > 0
        ? categories.map((c) => ({
            link: c.name,
            to: `/traders/${c.id}`,
          }))
        : [
            { link: t("nav.local_market"), to: "/local" },
            { link: t("nav.export"), to: "/export" },
          ],
  };

  const links: NavItem[] = [
    { link: t("nav.home"), to: "/" },
    { link: t("nav.prices"), to: "/prices" },
    { link: t("nav.news"), to: "/news" },
    { link: t("nav.producers"), to: "/producers" },
    traderCategories,
    { link: t("nav.partners"), to: "/partener" },
    {
      link: t("nav.cement_egypt"),
      to: "/",
      children: [
        { link: t("nav.our_vision"), to: "/our-vision" },
        { link: t("nav.about_us"), to: "/about-us" },
        { link: t("nav.disclaimer"), to: "/our-responsibility" },
      ],
    },
    { link: t("nav.jobs"), to: "/jobs" },
    { link: t("nav.store"), to: "/store" },
  ];

  const handleParentClick = (item: NavItem) => {
    if (!item.children) return;
    setActiveParent(activeParent === item.link ? null : item.link);
  };

  return (
    <div className="relative">
      {/* Main Navbar */}
      <div className="bg-secoundry h-[90px]">
        <div className="w-[90%] mx-auto h-full flex items-center justify-between">
          <Image src="/images/Home/CementEgypt.png" alt="Cement Egypt" width={180} height={70} />

          {/* Desktop */}
          <ul dir="" className="hidden xl:flex flex-row-reverse  items-center ms-auto font-semibold">
            {links.map((item) => (
              <li key={item.link}>
                {item.children ? (
                  <button
                    onClick={() => handleParentClick(item)}
                    className="py-6 px-3 text-sm flex items-center gap-2 hover:text-[#618FB5]"
                  >
                    {item.link}
                    <ChevronDown size={14} />
                  </button>
                ) : (
                  <Link href={item.to} className={`py-6 px-3 text-sm hover:text-[#618FB5] `}>
                    <motion.span
                      className=""
                      initial={{
                        color: item.link === t("nav.store") ? "#000" : "#000",
                        textShadow: "0 0 10px #618FB500",
                      }}
                      //   whileHover={{ color: "#618FB5" }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                      animate={{
                        color: item.link === t("nav.store") ? "#618FB5" : "#000",
                        textShadow: item.link === t("nav.store") ? "0 0 10px #618FB5" : "0 0 10px #618FB500",
                      }}
                    >
                      {item.link}
                    </motion.span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="hidden xl:flex items-center gap-2 border-primary py-2 px-4 rounded-lg text-primary hover:bg-primary hover:text-white transition-colors duration-200 mx-3"
            title={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}
          >
            {/* <Languages size={20} /> */}
            <span className="font-semibold text-sm">{language === "ar" ? "EN" : "AR"}</span>
          </button>

          <Link href="/login">
            <button className="hidden xl:block bg-primary py-3 px-6 rounded-lg text-white">{t("nav.login")}</button>
          </Link>

          {/* Mobile Toggle */}
          <button className="xl:hidden" onClick={() => setMenuOpen((p) => !p)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Sub Menu */}
      {activeParent && (
        <div className="bg-[#618FB5] text-white py-3">
          <div className="w-[90%] mx-auto flex gap-6 justify-end">
            {links
              .find((l) => l.link === activeParent)
              ?.children?.map((child: NavChild) => (
                <Link key={child.to} href={child.to} className="text-sm font-semibold">
                  {child.link}
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="xl:hidden bg-white absolute top-[90px] w-full z-50">
          <ul className="flex flex-col text-right font-semibold">
            {links.map((item) => (
              <li key={item.link}>
                {item.children ? (
                  <>
                    <div onClick={() => handleParentClick(item)} className="py-3 px-6 border-b">
                      {item.link}
                    </div>

                    {activeParent === item.link && (
                      <div className="bg-gray-50 px-10 py-2">
                        {item.children.map((child) => (
                          <Link key={child.to} href={child.to} className="block py-1 text-sm">
                            {child.link}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.to} className="block py-3 px-6 border-b">
                    {item.link}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Language Switcher */}
          <div className="border-t p-4">
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-center gap-2 bg-primary py-3 px-6 rounded-lg"
            >
              <span className="font-semibold">{language === "ar" ? "Switch to English" : "التبديل إلى العربية"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
