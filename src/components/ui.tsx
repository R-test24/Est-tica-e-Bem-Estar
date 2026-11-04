import Link from "next/link";
import {
  ArrowUpRight,
  Flower2,
  Heart,
  Leaf,
  Sparkles,
  Sun,
} from "lucide-react";
import type { ReactNode } from "react";
export function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const Component =
    (
      {
        flower: Flower2,
        heart: Heart,
        leaf: Leaf,
        sparkles: Sparkles,
        sun: Sun,
      } as Record<string, typeof Leaf>
    )[name] ?? Leaf;
  return (
    <Component aria-hidden="true" className={className} strokeWidth={1.4} />
  );
}
export function ActionLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : "button-primary"}`}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="muted">{description}</p>}
    </div>
  );
}
