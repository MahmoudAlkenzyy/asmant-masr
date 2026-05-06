import { Metadata } from "next";
import PartnerClient from "./PartnerClient";

export const metadata: Metadata = {
  title: "Partners | شركاؤنا",
  description: "Meet our partners at Asmant Masr. We collaborate with the best in the industry to provide top-notch services and products.",
};

export default function Page() {
  return <PartnerClient />;
}
