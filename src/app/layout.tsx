import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pablo Diez | Full Stack Developer",
  description: "Desarrollo web profesional, sistemas de gestión, tiendas online y soluciones SaaS a medida para tu negocio.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Pablo Diez | Full Stack Developer",
    description: "Soluciones digitales a medida que impulsan tu negocio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
