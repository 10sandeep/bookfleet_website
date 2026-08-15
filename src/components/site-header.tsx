import { Link } from "@tanstack/react-router";
import { Menu, Package, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/services", label: "Services" },
  { to: "/packers-and-movers", label: "Packers & Movers" },
  { to: "/track", label: "Track order" },
  { to: "/partner", label: "Drive with us" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-lg bg-brand">
            <Package className="size-5 text-ink" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">Porter</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            hash="book"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Book a vehicle
          </Link>
          <button
            className="grid size-10 place-items-center rounded-lg border border-border md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="container-page flex flex-col gap-1 border-t border-border py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}