import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Package, ShieldCheck, Truck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VEHICLES } from "@/lib/porter-data";
import twoWheeler from "@/assets/two-wheeler.jpg";
import trucks from "@/assets/trucks.jpg";
import packers from "@/assets/packers.jpg";
import heroTruck from "@/assets/hero-truck.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Delivery & Truck Booking Services | Bookfleet" },
      {
        name: "description",
        content:
          "Book two wheelers, three wheelers, tempos and trucks for intra-city deliveries, plus packers and movers for house shifting.",
      },
      { property: "og:title", content: "Delivery & Truck Booking Services | Bookfleet" },
      {
        property: "og:description",
        content: "Two wheelers, tempos, trucks and house shifting — booked in 60 seconds.",
      },
    ],
  }),
  component: ServicesPage,
});

const SERVICE_CARDS = [
  {
    title: "Two wheeler delivery",
    copy: "Documents, food, parcels and small packages delivered safely and on time.",
    image: twoWheeler,
    icon: Package,
    to: "/packers-and-movers" as const,
  },
  {
    title: "Trucks & tempos",
    copy: "Three wheelers to 2.5 tonne trucks for shop stock, office goods and bulky items.",
    image: trucks,
    icon: Truck,
    to: "/services" as const,
  },
  {
    title: "Packers & movers",
    copy: "Trained crews who pack, load, transport and unpack with care and safety.",
    image: packers,
    icon: Package,
    to: "/packers-and-movers" as const,
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader overlay />
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden rounded-b-3xl bg-ink text-ink-foreground" style={{ minHeight: "560px" }}>
          <div className="container-page grid items-center gap-10 lg:grid-cols-2">
            {/* Left */}
            <div className="pb-12 pt-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Our services
              </p>
              <h1 className="mt-3 max-w-lg text-4xl font-extrabold leading-tight md:text-5xl">
                One app for every load in your city
              </h1>
              <p className="mt-4 max-w-md text-lg opacity-70">
                From a single envelope to a full house, choose the right vehicle and get a driver
                within minutes.
              </p>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  { icon: Truck, val: "100+", label: "Vehicle options" },
                  { icon: ShieldCheck, val: "10,000+", label: "Happy customers" },
                ].map(({ icon: Icon, val, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                  >
                    <div className="grid size-10 place-items-center rounded-xl bg-brand">
                      <Icon className="size-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-extrabold">{val}</p>
                      <p className="text-xs opacity-60">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — full-height image panel */}
            <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
              <img
                src={heroTruck}
                alt="Delivery truck on a city road"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent" />
            </div>
          </div>
        </section>

        {/* ── Service cards ── */}
        <section className="container-page py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {SERVICE_CARDS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="overflow-visible rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
                >
                  {/* Image + floating icon */}
                  <div className="relative">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="h-52 w-full rounded-t-2xl object-cover"
                    />
                    <div className="absolute bottom-0 left-5 translate-y-1/2">
                      <div className="grid size-12 place-items-center rounded-full border-4 border-card bg-card shadow-md">
                        <Icon className="size-5 text-brand" />
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-5 pb-5 pt-9">
                    <h2 className="text-lg font-bold">{s.title}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {s.copy}
                    </p>
                    <Link
                      to={s.to}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                    >
                      Learn more <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Fleet & fares ── */}
        <section className="border-t border-border bg-muted/40 py-16">
          <div className="container-page">
            <h2 className="text-3xl font-extrabold">Fleet &amp; fares</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Indicative base fares. Final price depends on distance and waiting time.
            </p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/70 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-4">Vehicle</th>
                    <th className="px-5 py-4">Capacity</th>
                    <th className="px-5 py-4">Size</th>
                    <th className="px-5 py-4">Base fare</th>
                    <th className="px-5 py-4">Per km</th>
                  </tr>
                </thead>
                <tbody>
                  {VEHICLES.map((v) => (
                    <tr key={v.id} className="border-t border-border">
                      <td className="px-5 py-4 font-semibold">{v.name}</td>
                      <td className="px-5 py-4 text-muted-foreground">{v.capacity}</td>
                      <td className="px-5 py-4 text-muted-foreground">{v.size}</td>
                      <td className="px-5 py-4">₹{v.baseFare}</td>
                      <td className="px-5 py-4">₹{v.perKm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link
              to="/"
              hash="book"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink-foreground transition-opacity hover:opacity-90"
            >
              Get an estimate <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
