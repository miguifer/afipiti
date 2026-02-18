export default function ContactSection() {
  return (
    <section id="contacto" className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-black uppercase tracking-[0.2em] text-sm mb-4">Hablemos</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold">
            Contacto
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="font-playfair text-2xl mb-6">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Estaré encantado de escuchar tus ideas y crear algo especial para ti.
              No dudes en contactarme para consultas, encargos o colaboraciones.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-envelope text-lg w-5"></i>
                <a href="mailto:contacto@alejandrovega.art" className="hover:text-gray-600 transition-colors">
                  contacto@alejandrovega.art
                </a>
              </div>
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-phone text-lg w-5"></i>
                <a href="tel:+34600123456" className="hover:text-gray-600 transition-colors">
                  +34 600 123 456
                </a>
              </div>
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-location-dot text-lg w-5"></i>
                <span>Madrid, España</span>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <a href="#" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-colors">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-colors">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-colors">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm mb-2">Nombre</label>
              <input
                type="text"
                id="nombre"
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black outline-none transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black outline-none transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label htmlFor="mensaje" className="block text-sm mb-2">Mensaje</label>
              <textarea
                id="mensaje"
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black outline-none transition-colors resize-none"
                placeholder="Cuéntame sobre tu proyecto..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-black text-white hover:bg-gray-800 hover:cursor-pointer transition-colors"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
