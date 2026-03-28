import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const headingFont = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const bodyFont = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auto-Restro — Gestiona tu Restaurante desde el Celular",
  description: "Sistema de gestión para restaurantes con pedidos QR, cocina en tiempo real y pagos Transbank. Confiado por restaurantes en Iquique.",
  metadataBase: new URL("https://autorestro.cl"),
  openGraph: {
    title: "Auto-Restro — Gestiona tu Restaurante desde el Celular",
    description: "Sistema de gestión para restaurantes con pedidos QR, cocina en tiempo real y pagos Transbank. Confiado por restaurantes en Iquique.",
    url: "https://autorestro.cl",
    siteName: "Auto-Restro",
    locale: "es_CL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${headingFont.variable} ${bodyFont.variable} font-sans min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Auto-Restro",
                "operatingSystem": "Android, iOS, Web",
                "applicationCategory": "BusinessApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "CLP"
                },
                "description": "Sistema de gestión para restaurantes con pedidos QR, cocina en tiempo real y pagos Transbank."
              }),
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
