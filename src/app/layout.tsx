import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Libre de Piojos | Eliminación Definitiva de Piojos y Liendres",
  description:
    "Expertos erradicando piojos y liendres de manera segura, efectiva y sin tóxicos. Tratamientos profesionales y productos naturales en Bogotá, Medellín, Barranquilla, Cali y más.",
  keywords: [
    "piojos",
    "liendres",
    "tratamiento piojos",
    "eliminar piojos",
    "antipiojos",
    "Cabellos Sanos",
    "Libre de Piojos",
    "pediculosis",
    "tratamiento natural piojos",
  ],
  authors: [{ name: "Libre de Piojos - Cabellos Sanos" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Libre de Piojos | Eliminación Definitiva",
    description:
      "Expertos erradicando piojos y liendres sin tóxicos. Productos naturales y tratamientos profesionales.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
