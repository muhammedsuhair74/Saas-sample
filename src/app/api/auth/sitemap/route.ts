import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://your-saas-platform.com";

  const urls = [
    { url: `${baseUrl}/`, changefreq: "daily", priority: 1.0 },
    { url: `${baseUrl}/dashboard`, changefreq: "weekly", priority: 0.8 },
    { url: `${baseUrl}/admin`, changefreq: "weekly", priority: 0.9 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        ({ url, changefreq, priority }) => `
      <url>
        <loc>${url}</loc>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>`
      )
      .join("")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
