import type { Metadata, Viewport } from "next";
import { siteUrl } from "@/lib/catalog";
import "./globals.css";
const title = "PM Cell Vacaria | Smartphones e celulares em até 12x";
const description =
  "Comprar celular em Vacaria: compare smartphones Xiaomi, Motorola, Realme, Samsung e Honor. Preços à vista, parcelamento em até 12x e atendimento pelo WhatsApp.";
export const metadata: Metadata = {
  title,
  description,
  ...(siteUrl
    ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }
    : {}),
  keywords: [
    "Comprar celular em Vacaria",
    "Smartphones em Vacaria RS",
    "Xiaomi em Vacaria",
    "Motorola em Vacaria",
    "Celulares parcelados em Vacaria",
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
