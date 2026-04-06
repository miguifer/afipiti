import { ReactNode } from "react";

interface ContactInfoItemProps {
  icon: ReactNode;
  children: ReactNode;
}

export default function ContactInfoItem({ icon, children }: ContactInfoItemProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-5 flex justify-center">{icon}</span>
      {children}
    </div>
  );
}
