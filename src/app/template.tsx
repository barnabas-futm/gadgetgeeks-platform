// A template re-mounts on every page change (unlike layout.tsx). The wrapper is what fades out
// when you leave a page (see PageTransitions.tsx); each page's .stagger blocks handle the way in.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
