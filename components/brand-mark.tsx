import Link from "next/link";

type BrandMarkProps = {
  className?: string;
  onNavigate?: () => void;
};

/**
 * VERCUNO wordmark.
 *
 * The approved Hero V2 reference uses the heavy studio wordmark with an
 * orange terminal mark. The supplied PNG lockups are a light-weight
 * horizontal signature and a square app icon, so the navigation uses the
 * reference wordmark rendered in Manrope. The supplied icon remains the
 * favicon and the official brand asset.
 */
export function BrandMark({ className, onNavigate }: BrandMarkProps) {
  return (
    <Link
      aria-label="VERCUNO — home"
      className={`brand-mark ${className ?? ""}`}
      href="/"
      onClick={onNavigate}
    >
      <span className="brand-mark__word">VERCUNO</span>
      <span aria-hidden="true" className="brand-mark__dot" />
    </Link>
  );
}
