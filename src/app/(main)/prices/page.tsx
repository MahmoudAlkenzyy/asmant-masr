import { Metadata } from "next";
import { Hero } from "../../components/pages/News/Hero";
import PriceAccordion from "../../components/pages/Prices/PriceAccordion";

export const metadata: Metadata = {
  title: "Cement Prices | أسعار الأسمنت",
  description: "Check the latest cement prices in Egypt. Compare prices from different producers and stay updated with daily market changes.",
};

export default function Page() {
  return (
    <div className="bg-white">
      <Hero />
      <div className="containerr py-10 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">أسعار الأسمنت اليوم</h1>
        <p className="text-gray-500">متابعة يومية لأحدث أسعار الأسمنت في السوق المصري</p>
      </div>
      <PriceAccordion />
    </div>
  );
}
