import { Obra } from "@/app/data/obras";
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
        <div className="text-center mb-16">
          <p className="text-black uppercase tracking-[0.2em] text-sm mb-4">{subtitulo}</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold">
            {titulo}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {obras.map((obra) => (
            <ObraCard key={obra._id} obra={obra} />
          ))}
        </div>
      </div>
    </section>
  );
}
