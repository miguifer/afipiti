import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SITE } from "@/app/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="Sqw-eDS4sWjm9dwfjq2uICNP8e_bQ07Z5sDOx6yui0w" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="arte, pintura, artista, óleo, acuarela, murales, retratos, Ángel Fernández, afipiti, Afipiti" />
        <meta property="og:title" content={SITE.title} />
        <meta property="og:description" content={SITE.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE.url}/`} />
        <meta property="og:image" content={SITE.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE.title} />
        <meta name="twitter:description" content={SITE.description} />
        <meta name="twitter:image" content={SITE.image} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="canonical" href={`${SITE.url}/`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": SITE.name,
            "jobTitle": "Artista y Pintor",
            "url": `${SITE.url}/`,
            "image": `${SITE.url}${SITE.image}`,
            "description": SITE.description,
            "sameAs": [
              "https://www.instagram.com/afipiti/"
            ]
          })
        }} />
      </head>
      <body
        className={`${playfair.variable} ${lato.variable} antialiased`}
      >
        <main id="main-content" role="main">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
