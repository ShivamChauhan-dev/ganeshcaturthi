import type { Metadata } from "next";
import { Poppins, Rozha_One, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { seoKeywords } from "./seo-keywords";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const rozhaOne = Rozha_One({
  weight: "400",
  subsets: ["devanagari", "latin"],
  variable: "--font-rozha",
});

const tiroHindi = Tiro_Devanagari_Hindi({
  weight: "400",
  subsets: ["devanagari", "latin"],
  variable: "--font-tiro-hindi",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ganeshcaturthi.dev"),
  title: "Shree Ganesh Murti Bhandar | Ganesh Chaturthi 2026 | Eco-Friendly Clay Idols",
  description: "Book beautiful, 100% Eco-Friendly Ganesha Idols (Shadu Mati/Clay) online for Ganesh Chaturthi 2026. Safe home delivery in Mumbai/Maharashtra. | बप्पा की भक्ति, हमारी परंपरा। सुंदर, पर्यावरण के अनुकूल मिट्टी से बनी गणेश मूर्तियों की ऑनलाइन बुकिंग प्रारंभ।",
  keywords: seoKeywords,
  openGraph: {
    title: "Shree Ganesh Murti Bhandar | Ganesh Chaturthi 2026 | Eco-Friendly Clay Idols",
    description: "Book beautiful, 100% Eco-Friendly Shadu Mati Ganesha Idols online. Safe delivery to your home or pandal in Mumbai.",
    url: "https://ganeshcaturthi.dev",
    siteName: "Shree Ganesh Murti Bhandar",
    images: [
      {
        url: "/about_ganesha.png",
        width: 800,
        height: 600,
        alt: "Shree Ganesha Clay Idol"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Ganesh Murti Bhandar | Ganesh Chaturthi 2026",
    description: "100% Eco-Friendly Ganesha Idols online booking. Safe delivery.",
    images: ["/about_ganesha.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${rozhaOne.variable} ${tiroHindi.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
