import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, Truck, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/services", label: "Services" },
  { to: "/packers-and-movers", label: "Packers & Movers" },
  { to: "/track", label: "Track order" },
  { to: "/partner", label: "Drive with us" },
  { to: "/contact", label: "Contact" },
] as const;

interface SiteHeaderProps {
  /** When true the header is absolutely positioned so it overlays the hero below it */
  overlay?: boolean;
}

export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  return (
    <div className={overlay ? "fixed top-0 left-0 right-0 z-50 w-full" : "sticky top-0 z-50"}>
      {/* Announcement bar */}
      {!announcementDismissed && (
        <div className="relative border-b border-border bg-background py-2 text-center text-xs">
          <span className="font-medium text-foreground/70">
            <span className="font-bold text-brand">New:</span> Bookfleet now live Pan India —{" "}
            <Link
              to="/services"
              className="font-bold text-brand underline-offset-2 hover:underline"
            >
              Explore →
            </Link>
          </span>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            aria-label="Dismiss"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-foreground/35 transition-colors hover:text-foreground/60"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Floating pill navbar */}
      <div className="px-4 py-3">
        <div className="mx-auto max-w-[80rem]">
          <header className="flex items-center justify-between gap-6 rounded-2xl border border-white/30 bg-white/75 px-6 py-3 shadow-[0_2px_24px_-6px_rgba(0,0,0,0.12)] backdrop-blur-md">
            {/* Logo */}
            <Link to="/" className="flex shrink-0 items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-brand shadow-sm shadow-brand/30">
                <Truck className="size-5 text-white" />
              </span>
              <span className="font-display text-[1.1rem] font-extrabold tracking-tight">
                Bookfleet
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden flex-1 items-center justify-center gap-7 md:flex">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground"
                  activeProps={{ className: "!text-foreground" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex shrink-0 items-center gap-2">
              <Link
                to="/"
                hash="book"
                className="hidden items-center gap-2 rounded-full bg-brand py-2 pl-5 pr-2 text-sm font-bold text-white transition-opacity hover:opacity-90 sm:flex"
              >
                Book now
                <span className="grid size-7 place-items-center rounded-full bg-white">
                  <ArrowRight className="size-3.5 text-brand" />
                </span>
              </Link>

              <button
                className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </header>

          {/* Mobile nav */}
          {open && (
            <nav className="mt-1 flex flex-col gap-0.5 rounded-2xl border border-white/30 bg-white/85 px-3 py-3 shadow-[0_2px_24px_-6px_rgba(0,0,0,0.12)] backdrop-blur-md md:hidden">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "!bg-accent !text-accent-foreground !font-semibold" }}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-1 border-t border-border pt-2">
                <Link
                  to="/"
                  hash="book"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-2.5 text-sm font-bold text-white"
                >
                  Book now <ArrowRight className="size-4" />
                </Link>
              </div>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
