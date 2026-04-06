import { notFound } from "next/navigation";
import { getObraById, getObrasRelacionadas } from "@/app/data/obras";
import { SITE } from "@/app/lib/constants";
import type { Metadata } from "next";
import {
  Navbar,
  Footer,
  Breadcrumb,
  ObraDetail,
  RelatedObras,
} from "@/app/components";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const obra = await getObraById(id);

  if (!obra) {
    return {
      title: "Obra no encontrada",
    };
  }

  const title = `${obra.titulo} | ${SITE.name}`;
  const description = obra.descripcion.substring(0, 160);
  const image = obra.imageUrl || SITE.image;
  const url = `${SITE.url}/obra/${obra._id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ObraPage({ params }: Props) {
  const { id } = await params;
  const obra = await getObraById(id);

  if (!obra) {
    notFound();
  }

  const obrasRelacionadas = await getObrasRelacionadas(obra._id);

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Galería", href: "/#galeria" },
    { label: obra.titulo },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": obra.titulo,
    "image": obra.imageUrl || SITE.image,
    "description": obra.descripcion,
    "creator": {
      "@type": "Person",
      "name": SITE.name,
    },
    "url": `${SITE.url}/obra/${obra._id}`,
  };

  return (
    <div className="min-h-screen bg-white font-lato">
      <Navbar isDetailPage />

      <main className="pt-24 pb-16" id="main-content" role="main">
        <Breadcrumb items={breadcrumbItems} />
        <article role="article">
          <ObraDetail obra={obra} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </article>
        <RelatedObras obras={obrasRelacionadas} />
      </main>

      <Footer />
    </div>
  );
}