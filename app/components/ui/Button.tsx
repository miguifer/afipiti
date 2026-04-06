import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

interface BaseProps {
  variant?: ButtonVariant;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-black text-white hover:bg-gray-800",
  secondary: "border border-black hover:bg-black hover:text-white",
};

export default function Button(props: ButtonProps) {
  const { variant = "primary", className = "", ...rest } = props;
  const base = `px-8 py-4 transition-colors ${variantStyles[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    return <a href={href} className={base} {...anchorProps} />;
  }

  const buttonProps = rest as ButtonAsButton;
  return <button className={base} {...buttonProps} />;
}
