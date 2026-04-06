"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SITE, NAV_ITEMS } from "@/app/lib/constants";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  isDetailPage?: boolean;
}

export default function Navbar({ isDetailPage = false }: NavbarProps) {
  const linkPrefix = isDetailPage ? "/" : "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

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
            {SITE.name}
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8 text-sm">
            {NAV_ITEMS.map((item) => (
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

      <MobileMenu
        isOpen={isMenuOpen}
        items={[...NAV_ITEMS]}
        linkPrefix={linkPrefix}
        onClose={closeMenu}
      />
    </>
  );
}
