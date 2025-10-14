import { Hero } from "./components/pages/Home/Hero";
import { Partenar } from "./components/pages/Home/Partenar";
import { Prices } from "./components/pages/Home/Prices";
import { HeroAds } from "./components/pages/Home/HeroAds";
import { News } from "./components/pages/Home/News";
import { Podcasts } from "./components/pages/Home/Podcasts";
import { Store } from "./components/pages/Home/Store";
import { Producers } from "./components/pages/Home/Producers";
import { Academy } from "./components/pages/Home/Academy";

export default function Home() {
  return (
    <div>
      <Hero />
      <Partenar />
      <Prices />
      <HeroAds />
      <News />
      <Podcasts />
      <Store />
      <Producers />
      <Academy />
    </div>
  );
}
