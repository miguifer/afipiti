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
    title: `${obra.titulo} | Alejandro Vega`,
    description: obra.descripcion.substring(0, 160),
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

  return (
    <div className="min-h-screen bg-white font-lato">
      <Navbar isDetailPage />

      <main className="pt-24 pb-16">
        <Breadcrumb items={breadcrumbItems} />
        <ObraDetail obra={obra} />
        <RelatedObras obras={obrasRelacionadas} />
      </main>

      <Footer />
    </div>
  );
}