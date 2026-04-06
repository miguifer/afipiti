"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ExpandIcon } from "@/app/components/icons";

interface ZoomableImageProps {
  src: string;
  alt: string;
  onClickExpand: () => void;
}

export default function ZoomableImage({ src, alt, onClickExpand }: ZoomableImageProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="aspect-4/5 bg-gray-100 relative cursor-zoom-in overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsZooming(true)}
      onMouseLeave={() => setIsZooming(false)}
      onClick={onClickExpand}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain transition-transform duration-200"
        style={{
          transform: isZooming ? "scale(2)" : "scale(1)",
          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
        }}
        sizes="(max-width: 1024px) 100vw, 50vw"
        loading="lazy"
        priority={false}
      />
      <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-sm flex items-center gap-2 opacity-70">
        <ExpandIcon className="w-4 h-4" />
        <span>Clic para ampliar</span>
      </div>
    </div>
  );
}
