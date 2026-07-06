import type { Metadata, Viewport } from "next";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Детейлинг Уфа | Выездной детейлинг авто | Сокольников Детейлинг",
    template: "%s | Сокольников Детейлинг"
  },
  description:
    "Выездной детейлинг авто в Уфе и пригороде: базовый комплекс, химчистка салона, мойка подкапотного пространства, керамика и антидождь.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Детейлинг Уфа | Выездной детейлинг авто",
    description:
      "Мобильный детейлинг у дома, офиса или в удобном месте. Уфа и пригород.",
    url: "/",
    siteName: "Сокольников Детейлинг",
    images: ["/images/before-after-car.png"],
    type: "website",
    locale: "ru_RU"
  },
  twitter: {
    card: "summary_large_image",
    title: "Детейлинг Уфа | Выездной детейлинг авто",
    description: "Аккуратный уход за автомобилем с выездом по Уфе и пригороде.",
    images: ["/images/before-after-car.png"]
  },
  robots: {
    index: true,
    follow: true
  },
  keywords: [
    "детейлинг Уфа",
    "выездной детейлинг",
    "мобильный детейлинг",
    "детейлинг авто Уфа",
    "химчистка салона Уфа",
    "мойка подкапотного пространства",
    "керамика антидождь",
    "Соколов детейлинг",
    "Соколов детейл",
    "Сокольников детейлинг"
  ]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050607"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
