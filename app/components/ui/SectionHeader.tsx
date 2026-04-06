interface SectionHeaderProps {
  subtitle: string;
  title: string;
}

export default function SectionHeader({ subtitle, title }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <p className="text-black uppercase tracking-[0.2em] text-sm mb-4">{subtitle}</p>
      <h2 className="font-playfair text-4xl md:text-5xl font-semibold">{title}</h2>
    </div>
  );
}
