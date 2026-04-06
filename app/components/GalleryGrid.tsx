import { Obra } from "@/app/data/obras";
import { SectionHeader } from "@/app/components/ui";
import ObraCard from "./ObraCard";

interface GalleryGridProps {
  obras: Obra[];
  titulo?: string;
  subtitulo?: string;
}

export default function GalleryGrid({ obras, titulo = "Galería de Obras", subtitulo = "Colección" }: GalleryGridProps) {
  return (
    <section id="galeria" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader subtitle={subtitulo} title={titulo} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {obras.map((obra) => (
            <ObraCard key={obra._id} obra={obra} />
          ))}
        </div>
      </div>
    </section>
  );
}
