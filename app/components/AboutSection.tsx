import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square bg-gray-200 relative overflow-hidden">
            <Image
              src="/logo.jpg"
              alt="El artista en su estudio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-black uppercase tracking-[0.2em] text-sm mb-4">Sobre Mí</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold mb-6">
              Pasión por el Arte
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Soy Ángel Fernández, artista y pintor con más de 30 años de experiencia
                creando obras que capturan la belleza del mundo que nos rodea.
              </p>
              <p>
                Mi formación comenzó como autodidacta, donde descubrí
                mi pasión por las técnicas clásicas. Desde entonces, he explorado diversos
                estilos, desde el realismo hasta la abstracción.
              </p>
              <p>
                Cada pincelada es una expresión de mi alma, y mi objetivo es crear obras
                que no solo decoren espacios, sino que transformen emociones y cuenten historias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
