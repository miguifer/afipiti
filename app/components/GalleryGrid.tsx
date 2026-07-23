"use client";

import { useEffect, useState } from "react";
import { Obra } from "@/app/data/obras";
import { SectionHeader } from "@/app/components/ui";
import ObraCard from "./ObraCard";

interface GalleryGridProps {
  obras: Obra[];
  titulo?: string;
  subtitulo?: string;
}

const PAGE_SIZE_DESKTOP = 9; // multiple of 3 (lg:grid-cols-3)
const PAGE_SIZE_MOBILE = 10; // multiple of 2 (grid-cols-2)

export default function GalleryGrid({ obras, titulo = "Galería de Obras", subtitulo = "Colección" }: GalleryGridProps) {
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DESKTOP);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setPageSize(mql.matches ? PAGE_SIZE_DESKTOP : PAGE_SIZE_MOBILE);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const visibleCount = page * pageSize;
  const hasMore = visibleCount < obras.length;
  const isExpanded = page > 1;

  return (
    <section id="galeria" className="py-24 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <SectionHeader subtitle={subtitulo} title={titulo} />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {obras.slice(0, visibleCount).map((obra) => (
            <ObraCard key={obra._id} obra={obra} />
          ))}
        </div>

        {(hasMore || isExpanded) && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setPage(hasMore ? page + 1 : 1)}
              className="px-6 py-2.5 text-sm border border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              {hasMore ? "Ver más" : "Ver menos"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
