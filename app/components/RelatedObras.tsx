import { Obra } from "@/app/data/obras";
import ObraCard from "./ObraCard";

interface RelatedObrasProps {
  obras: Obra[];
}

export default function RelatedObras({ obras }: RelatedObrasProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 mt-24">
      <div className="text-center mb-12">
        <p className="text-black uppercase tracking-[0.2em] text-sm mb-4">Descubre más</p>
        <h2 className="font-playfair text-3xl md:text-4xl font-semibold">
          Obras Relacionadas
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {obras.map((obra) => (
          <ObraCard key={obra._id} obra={obra} />
        ))}
      </div>
    </section>
  );
}
