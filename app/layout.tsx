import type { Metadata, Viewport } from "next";
import { siteUrl } from "@/lib/catalog";
import "./globals.css";
const title = "PM Cell Vacaria | Blindagem NanoTitanium";
const description =
  "Blindagem NanoTitanium e assistência técnica em Vacaria. Conheça a aplicação com cura UV e consulte pelo WhatsApp.";
export const metadata: Metadata = {
  title,
  description,
  ...(siteUrl
    ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }
    : {}),
  keywords: [
    "Blindagem em Vacaria",
    "NanoTitanium em Vacaria RS",
    "Blindagem para celular",
    "Cura UV",
    "PM Cell Vacaria",
  ],
  openGraph: {
    title,
    description,
    locale: "pt_BR",
    type: "website",
    siteName: "PM Cell Vacaria",
    ...(siteUrl
      ? {
          url: siteUrl,
          images: [
            {
              url: "/brand/logo.webp",
              width: 1024,
              height: 1536,
              alt: "PM Cell Vacaria",
            },
          ],
        }
      : {}),
  },
  twitter: { card: "summary", title, description },
  robots: siteUrl
    ? { index: true, follow: true }
    : { index: false, follow: true },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090b",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

