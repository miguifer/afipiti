import { ReactNode } from "react";

interface StatusMessageProps {
  variant: "success" | "error";
  children: ReactNode;
}

const variantStyles = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
};

export default function StatusMessage({ variant, children }: StatusMessageProps) {
  return (
    <div className={`p-4 border ${variantStyles[variant]}`}>
      {children}
    </div>
  );
}
