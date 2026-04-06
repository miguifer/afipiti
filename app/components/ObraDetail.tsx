"use client";

import { useState } from "react";
import Link from "next/link";
import { Obra } from "@/app/data/obras";
import { SITE } from "@/app/lib/constants";
import { DetailField } from "@/app/components/ui";
import ZoomableImage from "./ZoomableImage";
import ImageModal from "./ImageModal";

interface ObraDetailProps {
  obra: Obra;
}

export default function ObraDetail({ obra }: ObraDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <ZoomableImage
            src={obra.imageUrl}
            alt={`Obra: ${obra.titulo} de ${SITE.name}`}
            onClickExpand={() => setIsModalOpen(true)}
          />

          {/* Información */}
          <div className="flex flex-col justify-center">
            <p className="text-black uppercase tracking-[0.2em] text-sm mb-4">{obra.tecnica}</p>
            <h1 className="font-playfair text-4xl md:text-5xl font-semibold mb-6">
              {obra.titulo}
            </h1>

            <div className="space-y-4 mb-8">
              <p className="text-gray-600 leading-relaxed">
                {obra.descripcion}
              </p>
            </div>

            {/* Detalles técnicos */}
            <div className="border-t border-b border-gray-200 py-6 mb-8">
              <div className="grid grid-cols-2 gap-6">
                <DetailField label="Técnica" value={obra.tecnica} />
                <DetailField label="Dimensiones" value={obra.dimensiones} />
                <DetailField label="Año" value={obra.año} />
                <DetailField
                  label="Estado"
                  value={obra.disponible ? "Disponible" : "No disponible"}
                  className={obra.disponible ? "text-green-600" : "text-red-500"}
                />
              </div>
            </div>

            {/* Precio y CTA */}
            {obra.disponible && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {obra.precio && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Precio</p>
                    <p className="font-playfair text-3xl text-black">{obra.precio}</p>
                  </div>
                )}
                <Link
                  href="/#contacto"
                  className="px-8 py-4 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  Consultar disponibilidad
                </Link>
              </div>
            )}

            {!obra.disponible && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <p className="text-gray-600">Esta obra pertenece a una colección particular.</p>
                <Link
                  href="/#contacto"
                  className="px-8 py-4 border border-black hover:bg-black hover:text-white transition-colors"
                >
                  Contacta
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ImageModal
          src={obra.imageUrl}
          alt={obra.titulo}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
