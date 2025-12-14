import { Hero } from "../../components/pages/News/Hero";
import Tabs from "../../components/pages/Producers/Tabs";

export default function Page() {
  return (
    <div className="bg-[#FFFFFF]">
      <Hero />
      <Tabs defaultTab="99c886cc-c9c4-4919-345c-08de3affe443" />
    </div>
  );
}
