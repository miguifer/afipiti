import Link from "next/link";
import Image from "next/image";
import { Obra } from "@/app/data/obras";

interface ObraCardProps {
  obra: Obra;
}

export default function ObraCard({ obra }: ObraCardProps) {
  return (
    <Link href={`/obra/${obra._id}`} className="gallery-item group cursor-pointer block">
      <div className="aspect-4/5 bg-gray-100 relative">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={obra.imageUrl}
            alt={obra.titulo}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="pt-4">
        <h3 className="font-playfair text-lg">{obra.titulo}</h3>
        <p className="text-gray-500 text-sm">{obra.tecnica}</p>
      </div>
    </Link>
  );
}
