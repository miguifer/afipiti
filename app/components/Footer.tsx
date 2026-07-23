import Image from "next/image";
import { SITE } from "@/app/lib/constants";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-gray-800 bg-black text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt=""
            width={1024}
            height={1024}
            className="h-11 w-auto"
          />
          <p className="font-playfair text-lg">{SITE.name}</p>
        </div>
        <div className="text-gray-400 text-sm text-center md:text-right">
          <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}
