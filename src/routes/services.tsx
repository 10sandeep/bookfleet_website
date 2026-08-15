import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VEHICLES } from "@/lib/porter-data";
import twoWheeler from "@/assets/two-wheeler.jpg";
import trucks from "@/assets/trucks.jpg";
import packers from "@/assets/packers.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Delivery & Truck Booking Services | Porter" },
      {
        name: "description",
        content:
          "Book two wheelers, three wheelers, tempos and trucks for intra-city deliveries, plus packers and movers for house shifting.",
      },
      { property: "og:title", content: "Delivery & Truck Booking Services | Porter" },
      {
        property: "og:description",
        content: "Two wheelers, tempos, trucks and house shifting — booked in 60 seconds.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    title: "Two wheeler delivery",
    image: twoWheeler,
    copy: "Documents, food, parcels and small packages delivered across the city in under 60 minutes.",
  },
  {
    title: "Trucks & tempos",
    image: trucks,
    copy: "Three wheelers to 2.5 tonne trucks for shop stock, furniture, appliances and bulk goods.",
  },
  {
    title: "Packers & movers",
    image: packers,
    copy: "Trained crews who pack, load, transport and unpack your entire home end to end.",
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="bg-ink py-20 text-ink-foreground">
          <div className="container-page max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Our services</p>
            <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
              One app for every load in your city
            </h1>
            <p className="mt-4 text-lg opacity-75">
              From a single envelope to a full house, choose the right vehicle and get a driver
              within minutes.
            </p>
          </div>
        </section>

        <section className="container-page grid gap-8 py-16 md:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
            >
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                width={900}
                height={700}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.copy}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="border-t border-border bg-muted/40 py-16">
          <div className="container-page">
            <h2 className="text-3xl font-extrabold">Fleet & fares</h2>
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
              className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink"
            >
              Get an estimate
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}