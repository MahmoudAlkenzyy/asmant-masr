import React from "react";
import { NewsCard } from "../../../components/pages/Home/NewsCard";
import Image from "next/image";
import { Item } from "../../../components/pages/News/NewsTab";
import { RelatedNews } from "../../../components/pages/News/RelatedNews";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const res = await fetch(`https://cement.northeurope.cloudapp.azure.com:5000/api/News/GetNewsById?Id=${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: Item = await res.json();

    const getImageSrc = (item: Item) => {
      if (!item.images || item.images.length === 0) return "/images/Home/ads.webp";
      const firstImg = item.images[0];
      if (typeof firstImg === "string") return firstImg;
      return `https://cement.northeurope.cloudapp.azure.com:5000${firstImg.filePath}`;
    };

    return (
      <div className="bg-white">
        <div className="containerr">
          <div className="grid md:grid-cols-4 items-start gap-6 mt-6">
            <RelatedNews />

            <div className="md:col-span-3 md:order-6 flex flex-col justify-start items-end gap-6">
              <Image
                src={getImageSrc(data)}
                className="rounded-xl !w-full object-contain"
                alt={data.title || "News image"}
                height={500}
                width={1000}
              />
              <h3 className="text-2xl font-semibold text-right leading-relaxed">{data.title}</h3>
              <p className="text-xl font-normal text-right leading-relaxed whitespace-pre-line">{data.content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("❌ Fetch failed:", error);
    return (
      <div className="text-center py-10 text-red-500 text-xl">حدث خطأ أثناء تحميل الخبر، برجاء المحاولة لاحقًا.</div>
    );
  }
}
