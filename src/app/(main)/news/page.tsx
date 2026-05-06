import { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/app/components/pages/News/Hero";
import Tabs from "../../components/pages/News/Tabs";

export const metadata: Metadata = {
  title: "News | الأخبار",
  description: "Stay informed with the latest news, market reports, and industry updates from the construction and cement sector in Egypt.",
};
export default function Page() {
  return (
    <div className="bg-[#FFFFFF]">
      <Hero src="/images/News/HeroNews.png" />
      <div className="containerr py-10">
        <h1 className="text-4xl font-bold text-primary mb-2 text-right">أحدث الأخبار</h1>
        <p className="text-gray-500 text-right">تابع آخر تطورات سوق الأسمنت والبناء في مصر</p>
      </div>
      <Tabs />
    </div>
  );
}
