"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X, LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
import { useTraderCategories } from "@/contexts/TraderCategoriesContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
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
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const { categories, loading } = useTraderCategories();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  // Close avatar dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar";
    setLanguage(newLang);
    // Reload the page to fetch new data with the new language
    window.location.reload();
  };

  //   const traderCategories: NavItem = {
  //     link: t("nav.traders"),
  //     to: "",
  //     children:
  //       !loading && categories.length > 0
  //         ? categories.map((c) => ({
  //             link: c.name,
  //             to: `/traders/${c.id}`,
  //           }))
  //         : [
  //             { link: t("nav.local_market"), to: "/local" },
  //             { link: t("nav.export"), to: "/export" },
  //           ],
  //   };

  const links: NavItem[] = [
    { link: t("nav.home"), to: "/" },
    { link: t("nav.prices"), to: "/prices" },
    { link: t("nav.news"), to: "/news" },
    { link: t("nav.producers"), to: "/producers" },
    // traderCategories,
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
    <div dir="ltr" className="relative">
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

          {/* Auth: Avatar (logged in) or Login button */}
          {user ? (
            <div ref={avatarRef} className="relative hidden xl:block">
              <button
                onClick={() => setAvatarOpen((v) => !v)}
                className="flex items-center gap-2 cursor-pointer group"
                aria-label="User menu"
              >
                {/* Initials avatar */}
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm select-none shadow">
                  {user.name
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <ChevronDown
                  size={14}
                  className={`text-gray-600 transition-transform duration-200 ${avatarOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown */}
              {avatarOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800 text-sm truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    {user.roles.length > 0 && (
                      <span className="mt-1 inline-block text-[10px] bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">
                        {user.roles[0]}
                      </span>
                    )}
                  </div>
                  {/* Logout */}
                  <button
                    onClick={() => {
                      logout();
                      setAvatarOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut size={15} />
                    {t("nav.logout") || "تسجيل الخروج"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="hidden xl:block cursor-pointer bg-primary py-3 px-6 rounded-lg text-white">
                {t("nav.login")}
              </button>
            </Link>
          )}

          {/* Mobile Toggle */}
          <button className="xl:hidden cursor-pointer" onClick={() => setMenuOpen((p) => !p)}>
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

          {/* Mobile Auth */}
          <div className="border-t p-4 space-y-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {user.name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 border border-red-200 py-2 px-4 rounded-lg text-sm font-semibold"
                >
                  <LogOut size={15} />
                  {t("nav.logout") || "تسجيل الخروج"}
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <button className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold">
                  {t("nav.login")}
                </button>
              </Link>
            )}
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
