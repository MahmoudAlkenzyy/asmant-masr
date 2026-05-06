import { Metadata } from "next";
import ResponsibilityClient from "./ResponsibilityClient";

export const metadata: Metadata = {
  title: "Our Responsibility | مسؤوليتنا",
  description: "Asmant Masr's commitment to social responsibility and sustainable development in the construction industry.",
};

export default function Page() {
  return <ResponsibilityClient />;
}
