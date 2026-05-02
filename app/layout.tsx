import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Train With Yosef",
  description:
    "High-performance coaching by Yosef. 1-to-1 plans, online programs, and private consultations.",
  icons: {
    icon: "/yosef-logo-rounded.png",
    shortcut: "/yosef-logo-rounded.png",
    apple: "/yosef-logo-rounded.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
