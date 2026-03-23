import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
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
  metadataBase: new URL("https://afipiti.com"),
  title: "Ángel Fernández | Artista & Pintor",
  description: "Artista profesional especializado en pintura al óleo, acuarela y técnicas mixtas. Retratos personalizados, murales y obras de arte únicas.",
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
        <meta property="og:title" content="Ángel Fernández | Artista & Pintor" />
        <meta property="og:description" content="Artista profesional especializado en pintura al óleo, acuarela y técnicas mixtas. Retratos personalizados, murales y obras de arte únicas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://afipiti.com/" />
        <meta property="og:image" content="/logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ángel Fernández | Artista & Pintor" />
        <meta name="twitter:description" content="Artista profesional especializado en pintura al óleo, acuarela y técnicas mixtas. Retratos personalizados, murales y obras de arte únicas." />
        <meta name="twitter:image" content="/logo.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="canonical" href="https://afipiti.com/" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ángel Fernández",
            "jobTitle": "Artista y Pintor",
            "url": "https://afipiti.com/",
            "image": "https://afipiti.com/logo.jpg",
            "description": "Artista profesional especializado en pintura al óleo, acuarela y técnicas mixtas. Retratos personalizados, murales y obras de arte únicas.",
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
