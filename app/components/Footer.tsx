import { SITE } from "@/app/lib/constants";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-playfair text-lg">{SITE.name}</p>
        <div className="text-gray-500 text-sm text-center md:text-right">
          <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}
