import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://asmantmasr.com";

  const staticPages = [
    "",
    "/about-us",
    "/jobs",
    "/news",
    "/prices",
    "/store",
    "/our-responsibility",
    "/our-vision",
    "/partener",
    "/producers",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...staticPages];
}
