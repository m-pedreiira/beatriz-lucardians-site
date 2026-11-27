/** Large centered label with a short rule, used to open the wider sections. */
export default function SectionLabel({
  children,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  as?: "p" | "h2";
}) {
  return (
    <Tag className="flex items-center justify-center gap-3 font-sans text-base leading-9 font-semibold tracking-[0.2em] text-ink-soft uppercase md:gap-[1.35rem] md:text-[1.575rem]">
      <span className="h-[1.8px] w-8 shrink-0 bg-ink-soft md:w-[3.6rem]" aria-hidden="true" />
      {children}
    </Tag>
  );
}
