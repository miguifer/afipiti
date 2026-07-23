"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Obra } from "@/app/data/obras";
import { ArrowLeftIcon, ArrowRightIcon } from "@/app/components/icons";

interface HeroSliderProps {
  obras: Obra[];
}

const AUTOPLAY_MS = 3000;
const FALLBACK_FECHA = "Fecha desconocida";
const FALLBACK_DIMENSIONES = "Dimensiones no especificadas";

export default function HeroSlider({ obras }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 28 }, [
    Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.plugins()?.autoplay?.reset();
    emblaApi?.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    emblaApi?.plugins()?.autoplay?.reset();
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden bg-black">
      <div className="h-full w-full overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex h-full">
          {obras.map((obra, i) => {
            const tieneFecha = obra.año && obra.año !== FALLBACK_FECHA;
            const tieneDimensiones =
              obra.dimensiones && obra.dimensiones !== FALLBACK_DIMENSIONES;
            const infoSecundaria = tieneFecha ? obra.año : obra.tecnica;
            const infoCard = [tieneFecha ? obra.tecnica : null, tieneDimensiones ? obra.dimensiones : null]
              .filter(Boolean)
              .join(" · ");
            const isActive = i === selectedIndex;

            return (
              <div key={obra._id} className="relative h-full w-full flex-[0_0_100%]">
                <Image
                  src={obra.imageUrl}
                  alt={obra.titulo}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="100vw"
                  draggable={false}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute inset-x-0 bottom-0 z-10 pb-12 md:pb-16 pointer-events-none">
                  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                    <div
                      className={`max-w-2xl transition-all duration-700 ease-out ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                    >
                      <h1 className="font-playfair text-white text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight drop-shadow-lg">
                        {obra.titulo}
                      </h1>
                      {infoSecundaria && (
                        <p className="text-white/80 mt-3 text-base md:text-lg tracking-wide">
                          {infoSecundaria}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-4 shrink-0 pointer-events-auto">
                      {/* invisible spacer: keeps the fixed arrow overlay aligned to this card's box */}
                      <div className="h-11 md:h-12 invisible" aria-hidden="true" />

                      <Link
                        href={`/obra/${obra._id}`}
                        className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-md p-3 w-full max-w-xs hover:bg-white/20 transition-colors"
                      >
                        <div className="relative w-12 h-12 shrink-0 rounded overflow-hidden bg-white/10">
                          <Image src={obra.imageUrl} alt="" fill className="object-cover" sizes="48px" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium truncate">{obra.titulo}</p>
                          <p className="text-white/70 text-xs truncate">
                            {infoCard || "Ver obra"}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* fixed arrow controls: stay in place, aligned above the card via the invisible spacer above */}
      <div className="absolute inset-x-0 bottom-0 z-20 pb-12 md:pb-16 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 md:flex md:justify-end">
          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="flex gap-3 pointer-events-auto">
              <button
                onClick={scrollPrev}
                aria-label="Obra anterior"
                className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                <ArrowLeftIcon className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Siguiente obra"
                className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
            <div
              className="flex items-center gap-3 border border-transparent rounded-md p-3 w-full max-w-xs invisible"
              aria-hidden="true"
            >
              <div className="w-12 h-12 shrink-0 rounded" />
              <div className="min-w-0">
                <p className="text-sm">&nbsp;</p>
                <p className="text-xs">&nbsp;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
