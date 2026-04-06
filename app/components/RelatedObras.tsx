import { Obra } from "@/app/data/obras";
import { SectionHeader } from "@/app/components/ui";
import ObraCard from "./ObraCard";

interface RelatedObrasProps {
  obras: Obra[];
}

export default function RelatedObras({ obras }: RelatedObrasProps) {
  if (!obras || obras.length === 0) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 mt-24">
      <SectionHeader subtitle="Descubre más" title="Obras Relacionadas" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {obras.map((obra) => (
          <ObraCard key={obra._id} obra={obra} />
        ))}
      </div>
    </section>
  );
}
