import { Metadata } from "next";
import { Hero } from "../../components/pages/News/Hero";
import Tabs from "../../components/pages/Producers/Tabs";

export const metadata: Metadata = {
  title: "Producers | المنتجون",
  description: "Browse the list of top cement producers in Egypt. Get details about their products, quality standards, and distribution networks.",
};

export default function Page() {
  return (
    <div className="bg-[#FFFFFF]">
      <Hero />
      <Tabs defaultTab="99c886cc-c9c4-4919-345c-08de3affe443" />
    </div>
  );
}
