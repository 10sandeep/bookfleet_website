import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CITIES, VEHICLES } from "@/lib/porter-data";
import truck from "@/assets/hero-truck.jpg";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Drive with Porter — Attach Your Vehicle & Earn" },
      {
        name: "description",
        content:
          "Own a two wheeler, tempo or truck? Partner with Porter, get daily orders in your city and receive weekly payouts.",
      },
      { property: "og:title", content: "Drive with Porter — Attach Your Vehicle & Earn" },
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
      <SiteHeader />
      <main>
        <section className="bg-ink py-16 text-ink-foreground">
          <div className="container-page grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                Driver partners
              </p>
              <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
                Earn up to ₹45,000 a month with your vehicle
              </h1>
              <p className="mt-4 text-lg opacity-75">
                Zero joining fee, daily order flow, and weekly payouts straight to your bank
                account.
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-4">
                {[
                  ["7.5 lakh+", "Partners onboarded"],
                  ["Weekly", "Guaranteed payouts"],
                  ["24x7", "Partner support"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="text-2xl font-extrabold text-brand">{v}</dt>
                    <dd className="text-xs opacity-70">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Application received", {
                  description: `Thanks ${name}, our ${city} team will call you shortly.`,
                });
              }}
              className="rounded-2xl border border-border bg-card p-6 text-foreground shadow-[var(--shadow-lift)]"
            >
              <h2 className="text-xl font-extrabold">Attach your vehicle</h2>
              <div className="mt-5 space-y-4">
                <Input label="Full name" value={name} onChange={setName} placeholder="Your name" />
                <Input
                  label="Mobile number"
                  value={phone}
                  onChange={setPhone}
                  placeholder="10-digit mobile number"
                />
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
              <button className="mt-6 w-full rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-ink">
                Apply now
              </button>
            </form>
          </div>
        </section>

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
            <h2 className="text-3xl font-extrabold">Why partners stay with Porter</h2>
            <ul className="mt-6 space-y-4 text-sm">
              {[
                ["Steady demand", "Thousands of orders across your city every single day."],
                ["No commission surprises", "Clear, predictable earnings on every completed trip."],
                ["Fuel & insurance benefits", "Partner offers on fuel, servicing and insurance."],
                ["Grow your fleet", "Attach multiple vehicles and manage them from one account."],
              ].map(([t, c]) => (
                <li key={t} className="rounded-xl border border-border bg-card p-4">
                  <h3 className="font-bold">{t}</h3>
                  <p className="text-muted-foreground">{c}</p>
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

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
      />
    </div>
  );
}