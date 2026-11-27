/** Small label above a section heading. Color and size come from `className`. */
export default function Eyebrow({
  children,
  className = "",
  ruleClassName = "bg-accent/45",
}: {
  children: React.ReactNode;
  className?: string;
  ruleClassName?: string;
}) {
  return (
    <p className={`mb-4 flex items-center gap-3 font-sans leading-5 tracking-[0.18em] uppercase ${className}`}>
      <span className={`h-px w-8 shrink-0 ${ruleClassName}`} aria-hidden="true" />
      {children}
    </p>
  );
}
