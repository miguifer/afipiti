interface DetailFieldProps {
  label: string;
  value: string;
  className?: string;
}

export default function DetailField({ label, value, className = "" }: DetailFieldProps) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`font-medium ${className}`}>{value}</p>
    </div>
  );
}
