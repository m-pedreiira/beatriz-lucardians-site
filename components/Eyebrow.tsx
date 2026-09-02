export default function Eyebrow({
  children,
  tone = "accent",
}: {
  children: React.ReactNode;
  tone?: "accent" | "cream";
}) {
  return (
    <p
      className={`mb-4 flex items-center gap-3 font-sans text-sm tracking-[0.2em] uppercase ${
        tone === "cream" ? "text-cream/70" : "text-accent"
      }`}
    >
      <span
        className={`h-px w-8 ${tone === "cream" ? "bg-cream/40" : "bg-accent/45"}`}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}
