import { notFound } from "next/navigation";
import { getObraById, getObrasRelacionadas } from "@/app/data/obras";
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

  return {
    title: `${obra.titulo} | Ángel Fernández`,
    description: obra.descripcion.substring(0, 160),
    alternates: {
      canonical: `https://afipiti.com/obra/${obra._id}`,
    },
    openGraph: {
      title: `${obra.titulo} | Ángel Fernández`,
      description: obra.descripcion.substring(0, 160),
      url: `https://afipiti.com/obra/${obra._id}`,
      images: [
        obra.imagenDestacada ? obra.imagenDestacada : "/logo.jpg"
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${obra.titulo} | Ángel Fernández`,
      description: obra.descripcion.substring(0, 160),
      images: [obra.imagenDestacada ? obra.imagenDestacada : "/logo.jpg"],
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
    "image": obra.imagenDestacada ? obra.imagenDestacada : "/logo.jpg",
    "description": obra.descripcion,
    "creator": {
      "@type": "Person",
      "name": "Ángel Fernández"
    },
    "url": `https://afipiti.com/obra/${obra._id}`
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