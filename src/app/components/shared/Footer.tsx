import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-primary  text-white text-end mt-auto">
      <div className="py-20 containerr w-[90%] mx-auto">
        <div className="bg-no-repeat w-fit mx-auto relative flex justify-center py-4 ">
          <img src="/images/Home/Footer.png" className="md:w-[1200] absolute inset-0 bottom-0 h-full " alt="" />
          <div className="relative  flex items-center gap-6 md:gap-10 text-white flex-col justify-center px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-medium">إشترك لمعرفة التحديثات الجديدة</h2>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
              <button className="bg-white text-black py-3 px-10 md:px-12 w-full rounded-lg cursor-pointer">
                إشترك الأن
              </button>
              <div className=" flex justify-between grow">
                <input
                  dir="rtl"
                  className="py-3 px-4 ps-6 md:ps-16 rounded-lg border border-white w-full grow md:w-auto"
                  placeholder="البريد الإلكتروني"
                />
                <input
                  dir="rtl"
                  className="py-3 px-4 ps-6 md:ps-16 rounded-lg border border-white w-full grow md:w-auto"
                  placeholder="الإسم الأول"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between mt-16 text-lg gap-10 md:gap-0">
          <ul className="w-full sm:w-1/2 md:w-1/6 space-y-2">
            <li className="font-bold">الشركة</li>
            <li>
              <Link href="/">الصفحة الرئيسية</Link>
            </li>
            <li>
              <Link href="/pricing">الأسعار</Link>
            </li>
            <li>
              <Link href="/news">الأخبار</Link>
            </li>
            <li>
              <Link href="/partners">المنتجين وشركاء النجاح</Link>
            </li>
            <li>
              <Link href="/forum">منتدى اسمنت مصر</Link>
            </li>
            <li>
              <Link href="/store">المتجر</Link>
            </li>
            <li>
              <Link href="/academy">أكاديمية اسمنت مصر</Link>
            </li>
          </ul>

          <ul className="w-full sm:w-1/2 md:w-1/6 space-y-2">
            <li className="font-bold">الأخبار</li>
            <li>
              <Link href="/news/general">أخبار عامة</Link>
            </li>
            <li>
              <Link href="/news/cement">أخبار الأسمنت</Link>
            </li>
            <li>
              <Link href="/news/egypt">الأخبار</Link>
            </li>
            <li>
              <Link href="/news/world">أخبار الأسمنت حول العالم</Link>
            </li>
            <li>
              <Link href="/forum">منتدى اسمنت مصر</Link>
            </li>
            <li>
              <Link href="/store">المتجر</Link>
            </li>
            <li>
              <Link href="/academy">أكاديمية اسمنت مصر</Link>
            </li>
          </ul>

          <ul className="w-full sm:w-1/2 md:w-1/6 space-y-2">
            <li className="font-bold">أسعار المواد</li>
            <li>
              <Link href="/prices/cement">أسمنت</Link>
            </li>
            <li>
              <Link href="/prices/iron">حديد</Link>
            </li>
            <li>
              <Link href="/prices/gypsum">جبس</Link>
            </li>
          </ul>

          <ul className="w-full sm:w-1/2 md:w-1/6 space-y-2">
            <li className="font-bold">مجتمع أسمنت مصر</li>
            <li>
              <Link href="/jobs">وظائف أسمنت مصر</Link>
            </li>
            <li>
              <Link href="/deals">صفقات أسمنت مصر</Link>
            </li>
            <li>
              <Link href="/academy">أكاديمية اسمنت مصر</Link>
            </li>
          </ul>

          <div className="w-full md:w-2/6 space-y-4 flex items-end justify-start flex-col text-center md:text-end">
            <Image
              width={180}
              height={70}
              className="h-auto mx-auto md:mx-0"
              src={"/images/home/Cement-Egypt-footer.png"}
              alt="Cement Egypt"
            />
            <p className="max-w-[80%] leading-relaxed mx-auto md:mx-0">
              الموقع الأول المتخصص في صناعة <br />
              الأسمنت والصناعات الاقتصادية المختلفة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
