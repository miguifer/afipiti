"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  isDetailPage?: boolean;
}

const navItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#galeria", label: "Galería" },
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar({ isDetailPage = false }: NavbarProps) {
  const linkPrefix = isDetailPage ? "/" : "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-playfair text-2xl font-semibold text-black z-50 relative">
            Ángel Fernández
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`${linkPrefix}${item.href}`}
                className="hover:text-gray-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Botón hamburguesa */}
          <button
            onClick={toggleMenu}
            className="md:hidden w-10 h-10 flex items-center justify-center z-50 relative"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-black rounded-full transform transition-all duration-300 ease-out origin-center ${
                  isMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-black rounded-full transition-all duration-300 ease-out ${
                  isMenuOpen ? "opacity-0 scale-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-black rounded-full transform transition-all duration-300 ease-out origin-center ${
                  isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Background overlay con blur */}
        <div
          className={`absolute inset-0 bg-white/95 backdrop-blur-lg transition-opacity duration-500 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        {/* Menu content */}
        <div className="relative h-full flex flex-col justify-center items-center">
          <nav className="flex flex-col items-center gap-2">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={`${linkPrefix}${item.href}`}
                onClick={closeMenu}
                className={`text-4xl font-medium text-black hover:text-gray-500 transition-all duration-300 py-3 px-6 transform ${
                  isMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 75 + 100}ms` : "0ms",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div
            className={`absolute bottom-24 left-1/2 -translate-x-1/2 transition-all duration-700 delay-300 ${
              isMenuOpen ? "w-16 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <div className="h-px bg-gray-300" />
          </div>

          {/* Additional info */}
          <div
            className={`absolute bottom-12 flex gap-8 transition-all duration-500 ${
              isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMenuOpen ? "400ms" : "0ms" }}
          >
            <span className="text-sm text-gray-500">Arte & Pintura</span>
          </div>
        </div>
      </div>
    </>
  );
}
