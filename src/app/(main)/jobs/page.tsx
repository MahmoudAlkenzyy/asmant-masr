import { Jobs } from "../../components/pages/Jobs/Jobs";
import { Hero } from "../../components/pages/News/Hero";

export default function Page() {
  return (
    <div>
      <Hero src="/images/Home/HeroJobs.png" />
      <Jobs />
    </div>
  );
}
