import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://levin-mock-api.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/real-api", "/mock-api/*", "/settings", "/dashboard", "/stats"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
