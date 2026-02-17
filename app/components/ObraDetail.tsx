"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Obra } from "@/app/data/obras";

interface ObraDetailProps {
  obra: Obra;
}

export default function ObraDetail({ obra }: ObraDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZooming(true);
  const handleMouseLeave = () => setIsZooming(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Imagen con zoom interactivo */}
          <div 
            ref={imageContainerRef}
            className="aspect-4/5 bg-gray-100 relative cursor-zoom-in overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={openModal}
          >
            <Image
              src={obra.imageUrl}
              alt={obra.titulo}
              fill
              className="object-contain transition-transform duration-200"
              style={{
                transform: isZooming ? 'scale(2)' : 'scale(1)',
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              }}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Indicador de clic */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-sm flex items-center gap-2 opacity-70">
              <i className="fa-solid fa-expand"></i>
              <span>Clic para ampliar</span>
            </div>
          </div>

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
                <div>
                  <p className="text-sm text-gray-500 mb-1">Técnica</p>
                  <p className="font-medium">{obra.tecnica}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Dimensiones</p>
                  <p className="font-medium">{obra.dimensiones}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Año</p>
                  <p className="font-medium">{obra.año}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Estado</p>
                  <p className={`font-medium ${obra.disponible ? 'text-green-600' : 'text-red-500'}`}>
                    {obra.disponible ? 'Disponible' : 'Vendida'}
                  </p>
                </div>
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
                <p className="text-gray-600">Esta obra ya ha sido vendida. Contacta conmigo para encargos similares.</p>
                <Link
                  href="/#contacto"
                  className="px-8 py-4 border border-black hover:bg-black hover:text-white transition-colors"
                >
                  Encargar obra similar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para ver imagen completa */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Cerrar"
          >
            <i className="fa-solid fa-xmark text-3xl"></i>
          </button>

          <div 
            className="relative w-full h-full max-w-6xl max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={obra.imageUrl}
              alt={obra.titulo}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
