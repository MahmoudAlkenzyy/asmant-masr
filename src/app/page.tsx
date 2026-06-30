import { Metadata } from "next";
import HomeClient from "./HomeClient";
import { pricesType } from "./components/pages/Home/PricesTable";
import { Item } from "./components/pages/News/NewsTab";

export interface HomeType {
  latestNews: Item[];
  latestEvents: unknown[];
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
  images: unknown[];
  videos: unknown[];
}

export interface Partner {
  id: string;
  name: string;
  categoryName: string;
  imagePath: string;
}

export const metadata: Metadata = {
  title: "Home | أسمنت مصر",
  description: "Welcome to Asmant Masr, your number one source for all things construction. We're dedicated to giving you the very best of cement prices and news.",
};

export default function Home() {
  return <HomeClient />;
}
