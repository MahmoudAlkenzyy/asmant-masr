"use client";
import { prodactType } from "@/app/page";
import { fetchWithLanguage } from "../fetchWithLanguage";

export interface StoreApiResponse {
  storeDetails: prodactType[];
}

export async function getStoreProducts(): Promise<prodactType[]> {
  try {
    const res = await fetchWithLanguage(
      "https://cement.northeurope.cloudapp.azure.com:5000/api/Home/GetHomePageData?ProductId=7e722b96-6e53-4860-39e5-08de155db96d",
      {
        method: "GET",
        headers: {
          accept: "text/plain",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: Failed to fetch store products`);
    }

    const json: StoreApiResponse = await res.json();
    return json.storeDetails || [];
  } catch (error) {
    console.error("Failed to fetch store products:", error);
    return [];
  }
}
