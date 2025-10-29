import { Ads } from "../../components/pages/Community/Ads";
import { Info } from "../../components/pages/Community/Info";
import { Intro } from "../../components/pages/Community/Intro";
import { Hero } from "../../components/pages/News/Hero";

export default function Page() {
  return (
    <div>
      <Hero />
      <Intro />
      <Ads />
      <Info />
    </div>
  );
}
