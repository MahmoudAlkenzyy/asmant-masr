import { Metadata } from "next";
import StoreClient from "./StoreClient";
import { Hero } from "../../components/pages/News/Hero";

export const metadata: Metadata = {
  title: "Store | المتجر",
  description:
    "Browse our store for the best construction materials and cement products in Egypt. High quality and competitive prices.",
};

export default function Page() {
  return (
    <div className="bg-white">
      <Hero src="/images/Home/herostore.png" />
      <div className="containerr py-10 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">متجر أسمنت مصر</h1>
        <p className="text-gray-500">أفضل منتجات الأسمنت ومواد البناء بأعلى جودة</p>
      </div>
      <StoreClient />
    </div>
  );
}
