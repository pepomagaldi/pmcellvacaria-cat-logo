import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/catalog";
export default function sitemap(): MetadataRoute.Sitemap {
  return siteUrl
    ? [{ url: siteUrl, changeFrequency: "weekly", priority: 1 }]
    : [];
}
