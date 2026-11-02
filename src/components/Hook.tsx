import { hooks } from "@/lib/hooks";
import { HookPicker } from "@/components/HookPicker";
import { pickHook } from "@/lib/pickHook";

// All hooks are in the HTML; a tiny inline script picks one before the page paints,
// so there's no flicker. Without JavaScript the first hook shows. HookPicker covers
// visits that arrive by clicking a link inside the site, where the inline script doesn't run.
const showRules = hooks.map((_, i) => `#hook[data-hook="${i}"] .hook-item[data-i="${i}"]{display:block}`).join("");

const pickScript = `(${pickHook.toString()})(${hooks.length});`;

export function Hook() {
  return (
    <>
      <style>{`.hook-item{display:none}${showRules}`}</style>
      <div id="hook" data-hook="0" suppressHydrationWarning>
        {hooks.map((h, i) => (
          <div key={i} data-i={i} className="hook-item">
            <h1 className="text-[2.6rem] sm:text-6xl">
              {h.lead} <em className="not-italic text-accent">{h.answer}</em>
            </h1>
            <p className="mt-6 text-lg text-muted max-w-xl">{h.sub}</p>
          </div>
        ))}
      </div>
      <script dangerouslySetInnerHTML={{ __html: pickScript }} />
      <HookPicker count={hooks.length} />
    </>
  );
}
