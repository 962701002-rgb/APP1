export type TagVariant = "default" | "popular" | "top-rated" | "exclusive" | "new" | "budget";

interface TagProps {
  label: string;
  variant?: TagVariant;
  className?: string;
}

const VARIANT_STYLES: Record<TagVariant, { bg: string; text: string }> = {
  default:    { bg: "#6B4EFF", text: "#FFFFFF" },
  popular:    { bg: "#6B4EFF", text: "#FFFFFF" },
  "top-rated":{ bg: "#1A1A2E", text: "#FFFFFF" },
  exclusive:  { bg: "#2D1F6E", text: "#E8E2FF" },
  new:        { bg: "#10B981", text: "#FFFFFF" },
  budget:     { bg: "#F59E0B", text: "#FFFFFF" },
};

export default function Tag({ label, variant = "default", className = "" }: TagProps) {
  const styles = VARIANT_STYLES[variant];
  return (
    <span
      className={`inline-flex items-center text-[9px] font-semibold px-2 py-0.5 rounded-full leading-tight ${className}`}
      style={{ background: styles.bg, color: styles.text, letterSpacing: "0.02em" }}
    >
      {label}
    </span>
  );
}
