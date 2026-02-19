import { prodactType } from "@/app/page";
import { fetchWithLanguage } from "../fetchWithLanguage";
import { cookies } from "next/headers";

export interface StoreApiResponse {
  storeDetails: prodactType[];
}

export async function getStoreProducts(): Promise<prodactType[]> {
  // Read language from cookie on the server side
  const cookieStore = await cookies();
  const language = cookieStore.get("language")?.value || "ar";

  try {
    const res = await fetchWithLanguage(
      "https://cement.northeurope.cloudapp.azure.com:5000/api/Home/GetHomePageData?ProductId=7e722b96-6e53-4860-39e5-08de155db96d",
      {
        method: "GET",
        headers: {
          accept: "text/plain",
          "Accept-Language": language,
        },
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: Failed to fetch store products`);
    }

    const json: StoreApiResponse = await res.json();
    console.log({ language });

    return json.storeDetails || [];
  } catch (error) {
    console.error("Failed to fetch store products:", error);
    return [];
  }
}
