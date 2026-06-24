import Link from "next/link";

// Typographic wordmark — the brand is set, not drawn.
export const Logo = () => (
  <Link href="/" className="group flex items-baseline gap-1.5">
    <span className="font-heading text-2xl leading-none tracking-tight text-primary">
      TypeGallery
    </span>
    <span className="font-heading text-2xl italic leading-none text-tertiary transition-opacity group-hover:opacity-60">
      .
    </span>
  </Link>
);
