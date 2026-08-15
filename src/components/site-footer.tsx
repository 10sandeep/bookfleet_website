import { Link } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { CITIES } from "@/lib/porter-data";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-brand">
              <Package className="size-5 text-ink" />
            </span>
            <span className="font-display text-xl font-extrabold">Porter</span>
          </div>
          <p className="mt-4 max-w-xs text-sm opacity-70">
            India's largest intra-city logistics marketplace. Move anything, anywhere, in minutes.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">Services</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>
              <Link to="/services">Two wheelers</Link>
            </li>
            <li>
              <Link to="/services">Trucks & tempos</Link>
            </li>
            <li>
              <Link to="/packers-and-movers">Packers & movers</Link>
            </li>
            <li>
              <Link to="/track">Track your order</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">Company</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>
              <Link to="/partner">Drive with Porter</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/contact">Support</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">Cities</h3>
          <p className="mt-4 text-sm leading-relaxed opacity-80">{CITIES.join(" · ")}</p>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Porter — demo experience built for showcase purposes.
      </div>
    </footer>
  );
}