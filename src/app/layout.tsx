import type { Metadata } from "next";
import { Poppins, Rozha_One, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

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
  title: "Shree Ganesh Murti Bhandar | Ganesh Chaturthi 2026",
  description: "बप्पा की भक्ति, हमारी परंपरा। सुंदर, पर्यावरण के अनुकूल (Eco-Friendly) गणेश मूर्तियों का निर्माण।",
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
