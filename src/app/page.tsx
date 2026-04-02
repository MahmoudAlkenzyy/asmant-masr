"use client";
import React, { useEffect, useState } from "react";
import NavBar from "./components/shared/NavBar";
import { Hero } from "./components/pages/Home/Hero";
import { Partenar } from "./components/pages/Home/Partenar";
import { Prices } from "./components/pages/Home/Prices";
import { HeroAds } from "./components/pages/Home/HeroAds";
import { News } from "./components/pages/Home/News";
// import { Podcasts } from "./components/pages/Home/Podcasts";
import { Store } from "./components/pages/Home/Store";
import { Producers } from "./components/pages/Home/Producers";
// import { Academy } from "./components/pages/Home/Academy";
import { Footer } from "./components/shared/Footer";
import { pricesType } from "./components/pages/Home/PricesTable";
import { Item } from "./components/pages/News/NewsTab";
import { fetchWithLanguage } from "@/lib/fetchWithLanguage";

export interface HomeType {
  latestNews: Item[];
  latestEvents: any[];
  productTypePriceStatistics: pricesType[];
  producers: Partner[];
  partners: Partner[];
  advertisements: {
    topBanner: advertisementType;
    secondSectionLeft: advertisementType;
    secondSectionRight: advertisementType;
  };
  storeDetails: prodactType[];
}
export interface advertisementType {
  id: string;
  page: string;
  section: string;
  items: advertisementItem[];
}
export interface advertisementItem {
  id: string;
  groupId: string;
  order: number;
  imagePath: string;
  fileName: string;
  createdAt: string;
}
export interface prodactType {
  productName: string;
  productTypeName: string;
  productTypeId?: string;
  companyName?: string;
  cityName?: string;
  tradeName?: string;
  storeImageFilePath: string | null;
  quantity?: number;

  id?: string;
  productId?: string;
}

export interface LatestNew {
  id: string;
  title: string;
  description: string;
  content: string;
  categoryName: string;
  publishAt: Date;
  images: any[];
  videos: any[];
}

export interface Partner {
  id: string;
  name: string;
  categoryName: string;
  imagePath: string;
}

export default function Home() {
  const [data, setData] = useState<HomeType | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetchWithLanguage(
          "https://cement.northeurope.cloudapp.azure.com:5000/api/Home/GetHomePageData",
          {
            method: "GET",
            headers: { accept: "text/plain" },
            // signal: controller.signal,
          },
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch data:", err);
          setError(err.message);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  if (error) return <div>Error: {error}</div>;

  if (!data) return <div></div>;
  //   console.log({ data });

  return (
    <div className="bg-secoundry">
      <NavBar />
      <Hero />
      <Partenar partenars={data.advertisements.topBanner.items} />
      <Prices prices={data.productTypePriceStatistics} />
      <HeroAds
        rightAds={data.advertisements.secondSectionRight.items}
        leftAds={data.advertisements.secondSectionLeft.items}
      />
      <News news={data.latestNews} />
      {/* <Podcasts /> */}
      <Store isStore={true} prodacts={data.storeDetails} />
      <Producers isTrue={false} isPartner={false} producers={data.producers} />
      {/* <Academy /> */}
      {/* <Producers isTrue={true} isPartner={true} producers={data.partners} /> */}
      <Footer />
    </div>
  );
}
