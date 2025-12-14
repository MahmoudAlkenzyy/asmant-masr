"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useTraderCategories } from "@/contexts/TraderCategoriesContext";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeParent, setActiveParent] = useState<string | null>(null);
  const { categories, loading } = useTraderCategories();

  // Build trader categories dynamically from API
  const traderCategories =
    !loading && categories.length > 0
      ? {
          link: "التجار",
          to: "",
          children: categories.map((category) => ({
            link: category.name,
            to: `/traders/${category.id}`,
            categoryId: category.id,
          })),
        }
      : {
          link: "التجار",
          to: "",
          children: [
            { link: "السوق المحلي", to: "/local" },
            { link: "تصدير", to: "/export" },
          ],
        };

  const links = [
    { link: "الصفحة الرئيسية", to: "/" },
    { link: "الأسعار", to: "/prices" },
    { link: "الأخبار", to: "/news" },
    { link: "المنتجين", to: "/producers" },
    traderCategories,
    { link: "شركاء الصناعة", to: "/partener" },
    {
      link: "أسمنت مصر",
      to: "/",
      children: [
        { link: "رؤيتنا ", to: "/our-vision" },
        { link: "عن أسمنت مصر ", to: "/about-us" },
        { link: "اخلاء المسئولية", to: "/our-responsibility" },
      ],
    },
    { link: "وظائف", to: "/jobs" },
    { link: "المتجر", to: "/store" },
  ];

  const handleParentClick = (item: any) => {
    if (!item.children) return;
    setActiveParent(activeParent === item.link ? null : item.link);
  };

  return (
    <div className="relative">
      {/* Main Navbar */}
      <div className="bg-secoundry h-[90px]">
        <div className="w-[90%] mx-auto h-full flex items-center justify-between ">
          <Image width={180} height={70} className="h-auto" src={"/images/Home/CementEgypt.png"} alt="Cement Egypt" />

          {/* Desktop Menu */}
          <ul className="hidden xl:flex ms-auto font-semibold">
            {links.map((item, idx) => (
              <li key={idx}>
                {item.children ? (
                  <button
                    onClick={() => handleParentClick(item)}
                    className="py-6 px-3 text-xs flex items-center gap-2 text-black cursor-pointer hover:text-[#618FB5] transition"
                  >
                    {item.link}
                    <ChevronDown size={14} />
                  </button>
                ) : (
                  <Link href={item.to}>
                    <div className="py-6 px-3 text-xs cursor-pointer hover:text-[#618FB5] transition">{item.link}</div>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <Link href={"/login"}>
            <button className="hidden xl:block bg-primary py-3 px-6 mx-4 rounded-lg text-white cursor-pointer">
              تسجيل الدخول
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button className="xl:hidden p-2" onClick={() => setMenuOpen((prev) => !prev)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Sub Navbar (Desktop + Mobile) */}
      {activeParent && (
        <div className=" text-white shadow-md border-t w-full py-3 bg-[#618FB5]">
          <div className="w-[90%] mx-auto flex gap-6 justify-end ">
            {links
              .find((l) => l.link === activeParent)
              ?.children?.map((child, idx) => (
                <Link key={idx} href={child.to}>
                  <span className="cursor-pointer  text-sm font-semibold hover:text-primary">{child.link}</span>
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="xl:hidden bg-white shadow-md w-full absolute top-[90px] left-0 z-50">
          <ul className="flex flex-col font-semibold text-right">
            {links.map((item, idx) => (
              <div key={idx}>
                {item.children ? (
                  <>
                    <li
                      onClick={() => handleParentClick(item)}
                      className="py-3 px-6 border-b cursor-pointer hover:bg-secoundry transition"
                    >
                      {item.link}
                    </li>

                    {/* Show Sub-Navbar inside mobile menu */}
                    {activeParent === item.link && (
                      <div className="bg-gray-50 py-2 px-10 flex flex-col gap-3">
                        {item.children.map((child, cIdx) => (
                          <Link key={cIdx} href={child.to}>
                            <span className="text-sm cursor-pointer hover:text-primary">{child.link}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.to}>
                    <li className="py-3 px-6 border-b cursor-pointer hover:bg-secoundry transition">{item.link}</li>
                  </Link>
                )}
              </div>
            ))}

            <li className="py-3 px-6">
              <Link href={"/login"}>
                <button className="w-full bg-primary py-3 rounded-lg text-white cursor-pointer">تسجيل الدخول</button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
