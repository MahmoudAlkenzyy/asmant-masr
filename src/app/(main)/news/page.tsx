import Image from "next/image";
import { Hero } from "@/app/components/pages/News/Hero";
import Tabs from "../../components/pages/News/Tabs";
export default function Page() {
  return (
    <div className="bg-[#FFFFFF]">
      <Hero src="/images/News/HeroNews.png" />
      <Tabs />
    </div>
  );
}
