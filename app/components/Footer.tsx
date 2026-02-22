export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-playfair text-lg">Ángel Fernández</p>
        <div className="text-gray-500 text-sm text-center md:text-right">
          <p>© 2026 Todos los derechos reservados</p>
          <p className="mt-1">Desarrollado por <a href="https://my-portfolio-omega-black-92.vercel.app/" className="font-bold hover:underline hover:text-red-600">miguifer</a></p>
        </div>
      </div>
    </footer>
  );
}
