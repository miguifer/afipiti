import { fetchObras, Obra } from "@/app/data/obras";
import { SITE } from "@/app/lib/constants";
import { Button } from "@/app/components/ui";
import HeroSlider from "./HeroSlider";

function shuffle(obras: Obra[]): Obra[] {
  const result = [...obras];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default async function Hero() {
  const obras = await fetchObras(8);

  if (obras.length === 0) {
    return (
      <section id="inicio" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-black uppercase tracking-[0.3em] text-sm mb-6">Artista & Pintor</p>
          <h1 className="font-playfair text-5xl md:text-7xl font-semibold mb-6 leading-tight">
            {SITE.name}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Creando arte que emociona y transforma espacios. Especializado en pintura al óleo,
            acuarela y técnicas mixtas desde hace más de 30 años.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#galeria">Ver Galería</Button>
            <Button href="#contacto" variant="secondary">Contactar</Button>
          </div>
        </div>
      </section>
    );
  }

  return <HeroSlider obras={shuffle(obras)} />;
}
