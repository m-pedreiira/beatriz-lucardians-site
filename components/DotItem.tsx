import type { Procedure } from "@/lib/content";
import Reveal from "./Reveal";

const dotColors: Record<Procedure["dot"], string> = {
  blush: "bg-blush",
  sage: "bg-sage",
  gold: "bg-gold",
  sky: "bg-sky",
};

/** List row with a colored dot, shared by the procedures list and the FAQ. */
export default function DotItem({
  dot,
  title,
  children,
}: {
  dot: Procedure["dot"];
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="border-t border-ink/10">
      <Reveal>
        <div className="flex gap-4 py-6">
          <span className={`mt-2.5 h-2 w-2 shrink-0 rounded-full ${dotColors[dot]}`} aria-hidden="true" />
          <div className="min-w-0">
            <h3 className="font-display text-xl leading-[1.4] text-ink md:text-[1.4rem]">{title}</h3>
            <div className="pt-2 font-sans text-base leading-[1.625] text-ink-soft">{children}</div>
          </div>
        </div>
      </Reveal>
    </li>
  );
}
