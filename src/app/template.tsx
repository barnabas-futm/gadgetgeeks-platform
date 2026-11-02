// A template re-mounts on every page change (unlike layout.tsx), so each page eases in
// while the header and footer stay put.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
