"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { useTraderCategories } from "@/contexts/TraderCategoriesContext";
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

  const traderCategories: NavItem = {
    link: "التجار",
    to: "",
    children:
      !loading && categories.length > 0
        ? categories.map((c) => ({
            link: c.name,
            to: `/traders/${c.id}`,
          }))
        : [
            { link: "السوق المحلي", to: "/local" },
            { link: "تصدير", to: "/export" },
          ],
  };

  const links: NavItem[] = [
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
        { link: "رؤيتنا", to: "/our-vision" },
        { link: "عن أسمنت مصر", to: "/about-us" },
        { link: "اخلاء المسئولية", to: "/our-responsibility" },
      ],
    },
    { link: "وظائف", to: "/jobs" },
    { link: "المتجر", to: "/store" },
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
          <ul className="hidden xl:flex items-center ms-auto font-semibold">
            {links.map((item) => (
              <li key={item.link}>
                {item.children ? (
                  <button
                    onClick={() => handleParentClick(item)}
                    className="py-6 px-3 text-xs flex items-center gap-2 hover:text-[#618FB5]"
                  >
                    {item.link}
                    <ChevronDown size={14} />
                  </button>
                ) : (
                  <Link href={item.to} className="py-6 px-3 text-xs hover:text-[#618FB5]">
                    {item.link}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <Link href="/login">
            <button className="hidden xl:block bg-primary py-3 px-6 rounded-lg text-white">تسجيل الدخول</button>
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
        </div>
      )}
    </div>
  );
}
