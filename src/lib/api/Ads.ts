import { fetchWithLanguage } from "../fetchWithLanguage";

export interface AdvertisementItem {
  id: string;
  groupId: string;
  order: number;
  imagePath: string;
  fileName: string;
  createdAt: string;
}

export interface AdvertisementGroup {
  id: string;
  page: string;
  section: "SecondSectionLeft" | "SecondSectionRight";
  items: AdvertisementItem[];
}

interface Ads {
  groups: AdvertisementGroup[];
}

export async function fetchAds({ pageName }: { pageName: string }) {
  try {
    const res = await fetchWithLanguage(
      `https://cement.northeurope.cloudapp.azure.com:5000/api/Advertisments/GetAllAdvertisement?Page=${pageName}`,
      {
        method: "GET",
        headers: {
          accept: "text/plain",
        },
      },
    );
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: Failed to fetch ads`);
    }
    const json: Ads = await res.json();
    return json.groups;
  } catch (error) {
    console.error("Failed to fetch ads:", error);
    return [];
  }
}
