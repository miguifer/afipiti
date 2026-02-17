"use client";

import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  isDetailPage?: boolean;
}

export default function Navbar({ isDetailPage = false }: NavbarProps) {
  const linkPrefix = isDetailPage ? "/" : "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-playfair text-2xl font-semibold text-black">
            Alejandro Vega
          </Link>
          <div className="hidden md:flex gap-8 text-sm">
            <Link href={`${linkPrefix}#inicio`} className="hover:text-gray-600 transition-colors">Inicio</Link>
            <Link href={`${linkPrefix}#galeria`} className="hover:text-gray-600 transition-colors">Galería</Link>
            <Link href={`${linkPrefix}#sobre-mi`} className="hover:text-gray-600 transition-colors">Sobre Mí</Link>
            <Link href={`${linkPrefix}#servicios`} className="hover:text-gray-600 transition-colors">Servicios</Link>
            <Link href={`${linkPrefix}#contacto`} className="hover:text-gray-600 transition-colors">Contacto</Link>
          </div>
          {/* Botón hamburguesa móvil */}
          <button
            onClick={toggleMenu}
            className="md:hidden w-10 h-10 flex items-center justify-center"
            aria-label="Abrir menú"
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Offcanvas Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="font-playfair text-xl font-semibold">Menú</span>
            <button
              onClick={closeMenu}
              className="w-10 h-10 flex items-center justify-center"
              aria-label="Cerrar menú"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
          <div className="flex flex-col gap-6 text-lg">
            <Link href={`${linkPrefix}#inicio`} onClick={closeMenu} className="hover:text-gray-600 transition-colors py-2 border-b border-gray-100">
              <i className="fa-solid fa-home w-6 mr-3"></i>Inicio
            </Link>
            <Link href={`${linkPrefix}#galeria`} onClick={closeMenu} className="hover:text-gray-600 transition-colors py-2 border-b border-gray-100">
              <i className="fa-solid fa-images w-6 mr-3"></i>Galería
            </Link>
            <Link href={`${linkPrefix}#sobre-mi`} onClick={closeMenu} className="hover:text-gray-600 transition-colors py-2 border-b border-gray-100">
              <i className="fa-solid fa-user w-6 mr-3"></i>Sobre Mí
            </Link>
            <Link href={`${linkPrefix}#servicios`} onClick={closeMenu} className="hover:text-gray-600 transition-colors py-2 border-b border-gray-100">
              <i className="fa-solid fa-palette w-6 mr-3"></i>Servicios
            </Link>
            <Link href={`${linkPrefix}#contacto`} onClick={closeMenu} className="hover:text-gray-600 transition-colors py-2 border-b border-gray-100">
              <i className="fa-solid fa-envelope w-6 mr-3"></i>Contacto
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
