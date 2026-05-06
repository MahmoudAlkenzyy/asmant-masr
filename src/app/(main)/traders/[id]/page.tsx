import { Metadata } from "next";
import TraderClient from "./TraderClient";
import { getAllTraderCategories } from "@/lib/api/traderCategories";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const categories = await getAllTraderCategories();
    const category = categories.find((cat) => cat.id === id);
    
    if (!category) return { title: "Traders | أسمنت مصر" };

    return {
      title: `${category.name} | Traders | أسمنت مصر`,
      description: `Explore the best traders in the ${category.name} category on Asmant Masr.`,
    };
  } catch (error) {
    return { title: "Traders | أسمنت مصر" };
  }
}

export default async function TraderCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TraderClient categoryId={id} />;
}
