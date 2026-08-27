import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Headphones, IndianRupee, Layers, ShieldCheck, TrendingUp, Users, Wallet } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CITIES, VEHICLES } from "@/lib/porter-data";
import truck from "@/assets/hero-truck.jpg";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Drive with Bookfleet — Attach Your Vehicle & Earn" },
      {
        name: "description",
        content:
          "Own a two wheeler, tempo or truck? Partner with Bookfleet, get daily orders in your city and receive weekly payouts.",
      },
      { property: "og:title", content: "Drive with Bookfleet — Attach Your Vehicle & Earn" },
      {
        property: "og:description",
        content: "Daily trips, weekly payouts, zero joining fee for driver partners.",
      },
    ],
  }),
  component: PartnerPage,
});

function PartnerPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(CITIES[0]!);
  const [vehicle, setVehicle] = useState(VEHICLES[2]!.name);

  return (
    <div className="min-h-screen">
      <SiteHeader overlay />
      <main>
        {/* ── Hero — full-screen with drive.png behind navbar ── */}
        <section className="relative overflow-hidden rounded-b-3xl text-ink-foreground">
          {/* Background image */}
          <img
            src="/assets/drive.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover object-center"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/70 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

          {/* Decorative floating icons */}
          <div className="absolute left-[28%] top-[22%] hidden md:block">
            <div className="grid size-12 place-items-center rounded-full border border-brand/40 bg-brand/20 backdrop-blur-sm">
              <IndianRupee className="size-5 text-brand" />
            </div>
          </div>
          <div className="absolute left-[48%] top-[18%] hidden md:block">
            <div className="grid size-11 place-items-center rounded-full border border-brand/40 bg-brand/20 backdrop-blur-sm">
              <ShieldCheck className="size-4 text-brand" />
            </div>
          </div>
          {/* Dashed arc between the two icons */}
          <svg
            className="absolute left-[28%] top-[18%] hidden md:block"
            width="220"
            height="60"
            viewBox="0 0 220 60"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 50 Q110 0 200 40"
              stroke="#3B82F6"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>

          {/* Main content */}
          <div className="container-page relative grid items-center gap-8 pb-12 pt-28 lg:grid-cols-[1fr_460px]">
            {/* Left — text */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Driver partners
              </p>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
                Earn up to ₹45,000 a month with your vehicle
              </h1>
              <p className="mt-4 max-w-md text-lg opacity-70">
                Zero joining fee, daily order flow, and weekly payouts straight to your bank
                account.
              </p>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap gap-6">
                {[
                  { icon: Users, val: "7.5 lakh+", label: "Partners onboarded" },
                  { icon: Wallet, val: "Weekly", label: "Guaranteed payouts" },
                  { icon: Headphones, val: "24x7", label: "Partner support" },
                ].map(({ icon: Icon, val, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-full border border-brand/30 bg-brand/15 backdrop-blur-sm">
                      <Icon className="size-4 text-brand" />
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-brand">{val}</p>
                      <p className="text-xs opacity-60">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form card */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Application received", {
                  description: `Thanks ${name}, our ${city} team will call you shortly.`,
                });
              }}
              className="h-fit rounded-2xl bg-card p-7 text-foreground shadow-[0_8px_48px_-12px_rgba(0,0,0,0.35)]"
            >
              <h2 className="text-2xl font-extrabold">Attach your vehicle</h2>
              <div className="mt-6 space-y-4">
                <div>
                  <Label>Full name</Label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
                  />
                </div>
                <div>
                  <Label>Mobile number</Label>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
                  >
                    {CITIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Vehicle type</Label>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
                  >
                    {VEHICLES.map((v) => (
                      <option key={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button className="mt-6 w-full rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-ink-foreground transition-opacity hover:opacity-90">
                Apply now
              </button>
            </form>
          </div>
        </section>

        {/* ── Why partners stay ── */}
        <section className="container-page grid items-center gap-10 py-16 md:grid-cols-2">
          <img
            src={truck}
            alt="Mini truck loaded with boxes on a city street"
            loading="lazy"
            width={1600}
            height={1104}
            className="rounded-2xl object-cover"
          />
          <div>
            <h2 className="text-3xl font-extrabold">Why partners stay with Bookfleet</h2>
            <ul className="mt-6 space-y-4 text-sm">
              {[
                { icon: TrendingUp, title: "Steady demand", copy: "Thousands of orders across your city every single day." },
                { icon: IndianRupee, title: "No commission surprises", copy: "Clear, predictable earnings on every completed trip." },
                { icon: ShieldCheck, title: "Fuel & insurance benefits", copy: "Partner offers on fuel, servicing and insurance." },
                { icon: Layers, title: "Grow your fleet", copy: "Attach multiple vehicles and manage them from one account." },
              ].map(({ icon: Icon, title, copy }) => (
                <li key={title} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
                    <Icon className="size-5 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
      {children}
    </label>
  );
}
