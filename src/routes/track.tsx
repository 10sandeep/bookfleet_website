import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PackageSearch } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { loadBookings, type Booking } from "@/lib/porter-data";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Delivery | Porter" },
      {
        name: "description",
        content:
          "Track your Porter delivery in real time with your order ID and see driver status, route and fare details.",
      },
      { property: "og:title", content: "Track Your Delivery | Porter" },
      {
        property: "og:description",
        content: "Live status for every Porter trip, from pickup to drop.",
      },
    ],
  }),
  component: TrackPage,
});

const STAGES = ["Driver assigned", "In transit", "Delivered"] as const;

function TrackPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => setBookings(loadBookings()), []);

  const visible = query.trim()
    ? bookings.filter((b) => b.id.toLowerCase().includes(query.trim().toLowerCase()))
    : bookings;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container-page py-14">
        <h1 className="text-4xl font-extrabold">Track your order</h1>
        <p className="mt-2 text-muted-foreground">
          Enter your order ID (e.g. PRT123456) to see live trip status.
        </p>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Order ID"
          className="mt-6 w-full max-w-md rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
        />

        <div className="mt-8 space-y-4">
          {visible.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center">
              <PackageSearch className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">
                No orders found yet. Book a vehicle from the home page and it will appear here.
              </p>
            </div>
          )}

          {visible.map((b) => {
            const stageIndex = STAGES.indexOf(b.status);
            return (
              <article
                key={b.id}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">{b.id}</h2>
                    <p className="text-sm text-muted-foreground">
                      {b.vehicleName} · {b.city} · {b.distanceKm} km
                    </p>
                  </div>
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                    {b.status}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  {STAGES.map((s, i) => (
                    <div key={s} className="flex-1">
                      <div
                        className={`h-1.5 rounded-full ${i <= stageIndex ? "bg-brand" : "bg-muted"}`}
                      />
                      <p className="mt-2 text-xs text-muted-foreground">{s}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                  <p>
                    <span className="text-muted-foreground">Pickup: </span>
                    {b.pickup}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Drop: </span>
                    {b.drop}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Fare: </span>₹{b.fare}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Booked: </span>
                    {new Date(b.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}