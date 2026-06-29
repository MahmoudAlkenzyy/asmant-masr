"use client";
import React, { useEffect, useState } from "react";
import NavBar from "./components/shared/NavBar";
import { Hero } from "./components/pages/Home/Hero";
import { Partenar } from "./components/pages/Home/Partenar";
import { Prices } from "./components/pages/Home/Prices";
import { HeroAds } from "./components/pages/Home/HeroAds";
import { News } from "./components/pages/Home/News";
import { Store } from "./components/pages/Home/Store";
import { Producers } from "./components/pages/Home/Producers";
import { Footer } from "./components/shared/Footer";
import { fetchWithLanguage } from "@/lib/fetchWithLanguage";
import { HomeType } from "./page";

export default function HomeClient() {
  const [data, setData] = useState<HomeType | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetchWithLanguage(
          "https://cement.northeurope.cloudapp.azure.com:4433/api/Home/GetHomePageData",
          {
            method: "GET",
            headers: { accept: "text/plain" },
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
      <Store isStore={true} prodacts={data.storeDetails} />
      <Producers isTrue={false} isPartner={false} producers={data.producers} />
      <Footer />
    </div>
  );
}
