import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, IndianRupee, ShieldCheck, Smartphone, Star, Truck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingWidget } from "@/components/booking-widget";
import { CITIES, VEHICLES } from "@/lib/porter-data";
import heroTruck from "@/assets/hero-truck.jpg";
import twoWheeler from "@/assets/two-wheeler.jpg";
import packers from "@/assets/packers.jpg";
import trucks from "@/assets/trucks.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Porter — Book Mini Trucks & Delivery Vehicles Online" },
      {
        name: "description",
        content:
          "Book two wheelers, tempos, mini trucks and packers & movers in minutes. Transparent fares, verified drivers and live tracking across 16 Indian cities.",
      },
      { property: "og:title", content: "Porter — Book Mini Trucks & Delivery Vehicles Online" },
      {
        property: "og:description",
        content: "Move anything, anywhere in your city. Instant fare estimates and live tracking.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-ink text-ink-foreground">
          <img
            src={heroTruck}
            alt="Mini truck loaded with cargo boxes on an Indian city street"
            width={1600}
            height={1104}
            className="absolute inset-0 size-full object-cover opacity-25"
          />
          <div className="container-page relative grid gap-12 py-16 md:grid-cols-[1.1fr_420px] md:py-24">
            <div className="max-w-xl self-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                <Star className="size-3.5" /> 4.8 rated · 2 crore+ trips
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] md:text-6xl">
                Move anything, anywhere in your city
              </h1>
              <p className="mt-5 text-lg opacity-80">
                Book a two wheeler, tempo or mini truck in 60 seconds. Upfront pricing, verified
                drivers and live tracking from pickup to drop.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/services"
                  className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink"
                >
                  Explore services
                </Link>
                <Link
                  to="/partner"
                  className="rounded-full border border-ink-foreground/25 px-6 py-3 text-sm font-bold"
                >
                  Drive with Porter
                </Link>
              </div>
            </div>
            <div className="text-foreground">
              <BookingWidget />
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="container-page grid gap-6 py-10 sm:grid-cols-4">
            {[
              ["16", "Cities served"],
              ["7.5 L+", "Driver partners"],
              ["2 Cr+", "Deliveries completed"],
              ["30 min", "Average pickup time"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-3xl font-extrabold">{v}</p>
                <p className="text-sm text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-page py-16">
          <h2 className="text-3xl font-extrabold md:text-4xl">What do you need to move?</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Two wheeler delivery",
                copy: "Parcels and documents up to 20 kg, delivered within the hour.",
                image: twoWheeler,
                to: "/services" as const,
              },
              {
                title: "Trucks & tempos",
                copy: "Furniture, appliances and shop stock up to 2.5 tonnes.",
                image: trucks,
                to: "/services" as const,
              },
              {
                title: "Packers & movers",
                copy: "Full-service house shifting with packing and unpacking.",
                image: packers,
                to: "/packers-and-movers" as const,
              },
            ].map((c) => (
              <Link
                key={c.title}
                to={c.to}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  width={900}
                  height={700}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.copy}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-muted/40 py-16">
          <div className="container-page">
            <h2 className="text-3xl font-extrabold md:text-4xl">Choose your vehicle</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {VEHICLES.map((v) => (
                <div key={v.id} className="rounded-2xl border border-border bg-card p-5">
                  <Truck className="size-6 text-brand-deep" />
                  <h3 className="mt-3 font-bold">{v.name}</h3>
                  <p className="text-sm text-muted-foreground">Up to {v.capacity}</p>
                  <p className="mt-3 text-sm font-semibold">From ₹{v.baseFare}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-page py-16">
          <h2 className="text-3xl font-extrabold md:text-4xl">Why customers choose Porter</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              [IndianRupee, "Upfront pricing", "See the exact fare before you confirm a booking."],
              [Clock, "Quick pickups", "Drivers reach most pickups within 30 minutes."],
              [ShieldCheck, "Safe & insured", "Verified drivers and goods protection on every trip."],
              [Smartphone, "Live tracking", "Follow your shipment in real time until delivery."],
            ].map(([Icon, title, copy]) => {
              const I = Icon as typeof Clock;
              return (
                <div key={title as string} className="rounded-2xl border border-border p-6">
                  <I className="size-6 text-brand-deep" />
                  <h3 className="mt-4 font-bold">{title as string}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{copy as string}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-ink py-16 text-ink-foreground">
          <div className="container-page">
            <h2 className="text-3xl font-extrabold md:text-4xl">Available across India</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {CITIES.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-ink-foreground/20 px-4 py-2 text-sm"
                >
                  {c}
                </span>
              ))}
            </div>
            <Link
              to="/"
              hash="book"
              className="mt-10 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink"
            >
              Book a vehicle now
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
