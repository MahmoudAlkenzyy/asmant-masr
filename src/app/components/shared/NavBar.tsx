"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { link: "الصفحة الرئيسية", to: "/" },
    { link: "الأسعار", to: "prices" },
    { link: "الأخبار", to: "/news" },
    { link: "المنتجين وشركاء النجاح", to: "/producers" },
    { link: "شركاء الصناعة", to: "/partener" },
    // { link: "النقل", to: "" },
    { link: "مجتمع أسمنت مصر", to: "/community" },
    // { link: "منتدى اسمنت مصر", to: "montada" },
    { link: "وظائف", to: "jobs" },
    { link: "المتجر", to: "/store" },
    // { link: "أكاديمية اسمنت مصر", to: "" },
  ];

  return (
    <div className="bg-secoundry h-[90px]">
      <div className="w-[90%] mx-auto h-full flex items-center justify-between ">
        <Image width={180} height={70} className="h-auto" src={"/images/home/CementEgypt.png"} alt="Cement Egypt" />

        <ul className="hidden xl:flex ms-auto font-semibold ">
          {links.reverse().map(({ link, to }, idx) => (
            <Link href={to} key={idx}>
              <li className="py-6 px-3 text-xs cursor-pointer hover:text-[#618FB5] transition">{link}</li>
            </Link>
          ))}
        </ul>

        <button className="hidden xl:block bg-primary py-3 px-6 mx-4 rounded-lg text-white cursor-pointer">
          تسجيل الدخول
        </button>

        <button className="xl:hidden p-2" onClick={() => setMenuOpen((prev) => !prev)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="xl:hidden bg-white shadow-md absolute top-[90px] left-0 w-full z-50">
          <ul className="flex flex-col font-semibold text-right">
            {links.map(({ link }, idx) => (
              <li key={idx} className="py-3 px-6 border-b cursor-pointer hover:bg-secoundry transition">
                {link}
              </li>
            ))}
            <li className="py-3 px-6">
              <button className="w-full bg-primary py-3 rounded-lg text-white cursor-pointer">تسجيل الدخول</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
