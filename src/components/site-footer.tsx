import { Link } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { CITIES } from "@/lib/porter-data";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-brand">
              <Truck className="size-5 text-ink-foreground" />
            </span>
            <span className="font-display text-xl font-extrabold">Bookfleet</span>
          </div>
          <p className="mt-4 max-w-xs text-sm opacity-70">
            India's largest intra-city logistics marketplace. Move anything, anywhere, in minutes.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <a
              href="#"
              aria-label="Download on the App Store"
              className="inline-flex w-fit items-center gap-2.5 rounded-lg border border-ink-foreground/20 px-4 py-2 text-ink-foreground transition-opacity hover:opacity-80"
            >
              <svg viewBox="0 0 24 24" className="size-5 shrink-0 fill-current" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left leading-tight">
                <p className="text-[9px] opacity-60">Download on the</p>
                <p className="text-xs font-bold">App Store</p>
              </div>
            </a>
            <a
              href="#"
              aria-label="Get it on Google Play"
              className="inline-flex w-fit items-center gap-2.5 rounded-lg border border-ink-foreground/20 px-4 py-2 text-ink-foreground transition-opacity hover:opacity-80"
            >
              <svg viewBox="0 0 24 24" className="size-5 shrink-0 fill-current" aria-hidden="true">
                <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85C3.34 21.61 3 21.09 3 20.5zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zM20.16 10.81c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
              </svg>
              <div className="text-left leading-tight">
                <p className="text-[9px] opacity-60">Get it on</p>
                <p className="text-xs font-bold">Google Play</p>
              </div>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">Services</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/services" as const, label: "Two wheelers" },
              { to: "/services" as const, label: "Trucks & tempos" },
              { to: "/packers-and-movers" as const, label: "Packers & movers" },
              { to: "/track" as const, label: "Track your order" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="opacity-70 transition-opacity hover:opacity-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/partner" as const, label: "Drive with Bookfleet" },
              { to: "/contact" as const, label: "Contact us" },
              { to: "/contact" as const, label: "Support" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="opacity-70 transition-opacity hover:opacity-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">Cities</h3>
          <p className="mt-4 text-sm leading-relaxed opacity-80">{CITIES.join(" · ")}</p>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Bookfleet — demo experience built for showcase purposes.
      </div>
    </footer>
  );
}