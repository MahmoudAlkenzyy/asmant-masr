import { Hero } from "../../components/pages/News/Hero";
import Tabs from "../../components/pages/store/Tabs";
import { StoreContent } from "../../components/pages/store/StoreContent";
import { getStoreProducts } from "@/lib/api/store";

export default async function Page() {
  const products = await getStoreProducts();

  return (
    <div>
      <Hero src="/images/Home/herostore.png" />
      <StoreContent products={products} />
      {/* <Tabs /> */}
    </div>
  );
}
