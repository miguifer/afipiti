import { fetchObras } from "@/app/data/obras";
import {
  Navbar,
  Footer,
  Hero,
  GalleryGrid,
  AboutSection,
  ContactSection,
} from "@/app/components";

export default async function Home() {
  const obras = await fetchObras(12);

  return (
    <div className="min-h-screen bg-white font-lato">
      <Navbar />
      <Hero />
      <GalleryGrid obras={obras} />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
