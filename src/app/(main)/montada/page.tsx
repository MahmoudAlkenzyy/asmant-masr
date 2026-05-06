import { Metadata } from "next";
import { Content } from "../../components/pages/Montada/Content";
import { Hero } from "../../components/pages/News/Hero";

export const metadata: Metadata = {
  title: "Montada | المنتدى",
  description: "Join the Asmant Masr community. Discuss construction topics, share experiences, and connect with industry professionals.",
};

export default function Page() {
  return (
    <div>
      <Hero />
      <Content />
    </div>
  );
}
