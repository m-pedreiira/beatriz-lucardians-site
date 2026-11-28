/** Large centered label with a short rule, used to open the wider sections. */
export default function SectionLabel({
  children,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  as?: "p" | "h2";
}) {
  return (
    <Tag className="flex items-center justify-center gap-3 font-sans text-sm leading-7 font-semibold tracking-[0.2em] text-ink-soft uppercase md:gap-4 md:text-lg">
      <span className="h-[1.8px] w-8 shrink-0 bg-ink-soft md:w-12" aria-hidden="true" />
      {children}
    </Tag>
  );
}
