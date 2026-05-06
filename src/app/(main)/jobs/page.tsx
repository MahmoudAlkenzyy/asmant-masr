import { Metadata } from "next";
import { Jobs } from "../../components/pages/Jobs/Jobs";
import { Hero } from "../../components/pages/News/Hero";

export const metadata: Metadata = {
  title: "Jobs | الوظائف",
  description: "Join the Asmant Masr team. Explore career opportunities and job openings in the construction industry in Egypt.",
};

export default function Page() {
  return (
    <div>
      <Hero src="/images/Home/HeroJobs.png" />
      <Jobs />
    </div>
  );
}
