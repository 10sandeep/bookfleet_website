import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Package,
  Route as RouteIcon,
  Search,
  Truck,
  User,
  Wallet,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { loadBookings, type Booking } from "@/lib/porter-data";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Delivery | Bookfleet" },
      {
        name: "description",
        content:
          "Track your Bookfleet delivery in real time with your order ID and see driver status, route and fare details.",
      },
      { property: "og:title", content: "Track Your Delivery | Bookfleet" },
      {
        property: "og:description",
        content: "Live status for every Bookfleet trip, from pickup to drop.",
      },
    ],
  }),
  component: TrackPage,
});

const STAGES = [
  { key: "Driver assigned", icon: User },
  { key: "In transit", icon: Truck },
  { key: "Delivered", icon: Package },
] as const;

function TrackPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => setBookings(loadBookings()), []);

  const visible = query.trim()
    ? bookings.filter((b) => b.id.toLowerCase().includes(query.trim().toLowerCase()))
    : bookings;

  return (
    <div className="min-h-screen">
      <SiteHeader overlay />
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden rounded-b-3xl bg-ink text-ink-foreground">
          {/* Background image */}
          <img
            src="/assets/track_order.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/50" />

          <div className="container-page relative grid items-center gap-8 pb-24 pt-44">
            {/* Left */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Live tracking
              </p>
              <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">Track your order</h1>
              <p className="mt-3 max-w-md text-lg opacity-70">
                Enter your order ID to see live driver status, route and fare details.
              </p>

              <div className="mt-7 flex max-w-lg items-center gap-3 rounded-xl border border-ink-foreground/20 bg-ink-foreground/10 px-4 py-3.5 transition-colors focus-within:border-brand/60">
                <Search className="size-4 shrink-0 text-ink-foreground/50" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter order ID (e.g. PRT123456)"
                  className="w-full bg-transparent text-sm text-ink-foreground outline-none placeholder:text-ink-foreground/40"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ── Orders ── */}
        <div className="container-page py-10">
          <div className="space-y-5">
            {visible.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border p-14 text-center">
                <RouteIcon className="mx-auto size-10 text-muted-foreground/30" />
                <p className="mt-4 text-sm font-semibold text-muted-foreground">No orders found</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Book a vehicle from the home page and it will appear here.
                </p>
              </div>
            )}

            {visible.map((b) => {
              const stageIndex = STAGES.findIndex((s) => s.key === b.status);
              const bookedAt = new Date(b.createdAt);
              const dateStr = bookedAt.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              const timeStr = bookedAt.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <article
                  key={b.id}
                  className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-extrabold">{b.id}</h2>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {b.vehicleName} &bull; {b.city} &bull; {b.distanceKm} km
                      </p>
                    </div>
                    <span className="rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold text-brand">
                      {b.status}
                    </span>
                  </div>

                  {/* Progress stepper */}
                  <div className="mt-7 flex items-start">
                    {STAGES.map((stage, i) => {
                      const Icon = stage.icon;
                      const active = i <= stageIndex;
                      const lineActive = i < stageIndex;
                      return (
                        <div key={stage.key} className="flex flex-1 flex-col items-center">
                          <div className="flex w-full items-center">
                            {/* Left connector */}
                            {i > 0 && (
                              <div
                                className={`h-0.5 flex-1 transition-colors ${lineActive ? "bg-brand" : "bg-border"}`}
                              />
                            )}
                            {/* Circle icon */}
                            <div
                              className={`grid size-12 place-items-center rounded-full border-2 transition-colors ${
                                active
                                  ? "border-brand bg-brand text-white"
                                  : "border-border bg-background text-muted-foreground"
                              }`}
                            >
                              <Icon className="size-5" />
                            </div>
                            {/* Right connector */}
                            {i < STAGES.length - 1 && (
                              <div
                                className={`h-0.5 flex-1 transition-colors ${active && i < stageIndex ? "bg-brand" : "bg-border"}`}
                              />
                            )}
                          </div>
                          {/* Label */}
                          <p
                            className={`mt-2 text-center text-[11px] font-semibold sm:text-xs ${active ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {stage.key}
                          </p>
                          {i === stageIndex && (
                            <p className="mt-0.5 hidden text-center text-[11px] font-medium text-brand sm:block">
                              {dateStr}, {timeStr}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Details grid */}
                  <div className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
                    {[
                      { icon: MapPin, label: "Pickup", value: b.pickup },
                      { icon: MapPin, label: "Drop", value: b.drop },
                      { icon: Wallet, label: "Fare", value: `₹${b.fare}` },
                      {
                        icon: Calendar,
                        label: "Booked",
                        value: bookedAt.toLocaleString("en-IN"),
                      },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/10">
                          <Icon className="size-3.5 text-brand" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{label}</p>
                          <p className="text-sm font-bold">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

