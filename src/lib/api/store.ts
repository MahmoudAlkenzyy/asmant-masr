import { prodactType } from "@/app/page";

export interface StoreApiResponse {
  storeDetails: prodactType[];
}

export async function getStoreProducts(): Promise<prodactType[]> {
  try {
    const res = await fetch(
      "https://cement.runasp.net/api/Home/GetHomePageData?ProductId=7e722b96-6e53-4860-39e5-08de155db96d",
      {
        method: "GET",
        headers: { accept: "text/plain" },
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: Failed to fetch store products`);
    }

    const json: StoreApiResponse = await res.json();
    console.log({ json });

    return json.storeDetails || [];
  } catch (error) {
    console.error("Failed to fetch store products:", error);
    return [];
  }
}
