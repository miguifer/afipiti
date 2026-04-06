"use client";

import Link from "next/link";

interface NavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  items: NavItem[];
  linkPrefix: string;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, items, linkPrefix, onClose }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        className={`absolute inset-0 bg-white/95 backdrop-blur-lg transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div className="relative h-full flex flex-col justify-center items-center">
        <nav className="flex flex-col items-center gap-2">
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={`${linkPrefix}${item.href}`}
              onClick={onClose}
              className={`text-4xl font-medium text-black hover:text-gray-500 transition-all duration-300 py-3 px-6 transform ${
                isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: isOpen ? `${index * 75 + 100}ms` : "0ms",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          className={`absolute bottom-24 left-1/2 -translate-x-1/2 transition-all duration-700 delay-300 ${
            isOpen ? "w-16 opacity-100" : "w-0 opacity-0"
          }`}
        >
          <div className="h-px bg-gray-300" />
        </div>

        <div
          className={`absolute bottom-12 flex gap-8 transition-all duration-500 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isOpen ? "400ms" : "0ms" }}
        >
          <span className="text-sm text-gray-500">Arte & Pintura</span>
        </div>
      </div>
    </div>
  );
}
