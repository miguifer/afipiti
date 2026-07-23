"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE, NAV_ITEMS } from "@/app/lib/constants";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  isDetailPage?: boolean;
}

export default function Navbar({ isDetailPage = false }: NavbarProps) {
  const linkPrefix = isDetailPage ? "/" : "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(isDetailPage);

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

  useEffect(() => {
    if (isDetailPage) return;

    const getThreshold = () => Math.max(window.innerHeight - 96, 0);
    const onScroll = () => setScrolled(window.scrollY > getThreshold());

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDetailPage]);

  const isCompact = scrolled;
  const isWhiteNav = scrolled && !isMenuOpen;
  const isDark = !isWhiteNav;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isMenuOpen
            ? "bg-black"
            : isWhiteNav
            ? "bg-white/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div
          className={`max-w-6xl mx-auto px-6 flex justify-between items-center transition-all duration-300 ${
            isCompact ? "py-2" : "py-4"
          }`}
        >
          <Link href="/" className="z-50 relative flex items-center" aria-label={SITE.name}>
            <Image
              src={isWhiteNav ? "/logo-transparent.png" : "/logo.png"}
              alt={SITE.name}
              width={1024}
              height={1024}
              priority
              className={`w-auto drop-shadow-md transition-all duration-300 ${
                isCompact ? "h-10" : "h-16"
              }`}
            />
          </Link>

          {/* Desktop menu */}
          <div
            className={`hidden md:flex gap-8 text-sm transition-colors duration-300 ${
              isDark ? "text-white drop-shadow-md" : "text-black"
            }`}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={`${linkPrefix}${item.href}`}
                className="hover:opacity-70 transition-opacity"
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
                className={`block h-0.5 w-full rounded-full transform transition-all duration-300 ease-out origin-center ${
                  isDark ? "bg-white" : "bg-black"
                } ${isMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
              />
              <span
                className={`block h-0.5 w-full rounded-full transition-all duration-300 ease-out ${
                  isDark ? "bg-white" : "bg-black"
                } ${isMenuOpen ? "opacity-0 scale-0" : "opacity-100"}`}
              />
              <span
                className={`block h-0.5 w-full rounded-full transform transition-all duration-300 ease-out origin-center ${
                  isDark ? "bg-white" : "bg-black"
                } ${isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
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
