"use client";
import { Hero } from "../../components/pages/News/Hero";
import { StoreContent } from "../../components/pages/store/StoreContent";

export default function Page() {
  return (
    <div>
      <Hero src="/images/Home/herostore.png" />
      <StoreContent />
    </div>
  );
}
