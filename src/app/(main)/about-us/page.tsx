import { Metadata } from "next";
import { Ads } from "../../components/pages/Community/Ads";
import { Info } from "../../components/pages/Community/Info";
import { Intro } from "../../components/pages/Community/Intro";
import { Hero } from "../../components/pages/News/Hero";

export const metadata: Metadata = {
  title: "About Us | من نحن",
  description: "Learn more about Asmant Masr, our history, mission, and the team behind the leading construction platform in Egypt.",
};

export default function Page() {
  return (
    <div>
      <Hero />
      <Intro />
      {/* <Ads /> */}
      <Info />
    </div>
  );
}
