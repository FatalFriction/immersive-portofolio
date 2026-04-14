import type { Metadata } from "next";
import { Bebas_Neue, Noto_Sans_JP, Space_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-noto-jp",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Michael Florentio - Portfolio",
  description:
    "A streetwear × anime × sneaker culture portfolio theme by Michael Florentio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${notoSansJP.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
