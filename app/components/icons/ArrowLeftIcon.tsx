interface IconProps {
  className?: string;
}

export default function ArrowLeftIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}
