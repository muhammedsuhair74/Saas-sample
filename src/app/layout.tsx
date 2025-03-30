import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SaaS Platform | Next.js + Prisma",
  description:
    "Full-stack SaaS platform with authentication, payments, and admin dashboard.",
  keywords: ["SaaS", "Next.js", "Stripe", "Authentication", "Admin Dashboard"],
  openGraph: {
    title: "SaaS Platform",
    description: "Full-stack SaaS platform with Next.js 14+ and Prisma",
    url: "https://your-saas-platform.com",
    siteName: "SaaS Platform",
    images: [
      {
        url: "https://your-saas-platform.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "SaaS Platform",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
