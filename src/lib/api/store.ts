import { prodactType } from "@/app/page";

export interface StoreApiResponse {
  storeDetails: prodactType[];
}

/**
 * Fetch store products from the API
 * This is a server-side function that can be used in Server Components
 */
export async function getStoreProducts(): Promise<prodactType[]> {
  try {
    const res = await fetch(
      "https://back.talkstent.com/api/Home/GetHomePageData?ProductId=7e722b96-6e53-4860-39e5-08de155db96d",
      {
        method: "GET",
        headers: { accept: "text/plain" },
        // Revalidate every 5 minutes
        next: { revalidate: 300 },
      }
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
