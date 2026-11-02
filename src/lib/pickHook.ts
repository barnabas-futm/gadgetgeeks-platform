// Picks a random homepage hook, avoiding the one shown last time.
// Self-contained on purpose: Hook.tsx also inlines it (via toString) to run before the page paints.
export function pickHook(count: number) {
  const el = document.getElementById("hook");
  if (!el || el.getAttribute("data-picked")) return;
  let last = -1;
  try {
    last = parseInt(localStorage.getItem("gg-hook") ?? "", 10);
  } catch {}
  let i = Math.floor(Math.random() * count);
  if (count > 1 && i === last) i = (i + 1) % count;
  el.setAttribute("data-hook", String(i));
  el.setAttribute("data-picked", "1");
  try {
    localStorage.setItem("gg-hook", String(i));
  } catch {}
}
