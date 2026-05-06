import { Metadata } from "next";
import VisionClient from "./VisionClient";

export const metadata: Metadata = {
  title: "Our Vision | رؤيتنا",
  description: "Discover the vision and goals of Asmant Masr as we strive to lead and innovate in the Egyptian construction market.",
};

export default function Page() {
  return <VisionClient />;
}
