import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  IndianRupee,
  Navigation2,
  ShieldCheck,
  Star,
} from "lucide-react";

const VEHICLE_IMAGES: Record<string, string> = {
  scooty: "/assets/scooty.png",
  "2wheeler": "/assets/bike.png",
  "3wheeler": "/assets/auto.png",
  tataace: "/assets/pickup.png",
  pickup8ft: "/assets/pickup.png",
  tata407: "/assets/truck.png",
};
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
      { title: "Bookfleet — Book Mini Trucks & Delivery Vehicles Online" },
      {
        name: "description",
        content:
          "Book two wheelers, tempos, mini trucks and packers & movers in minutes. Transparent fares, verified drivers and live tracking across 16 Indian cities.",
      },
      { property: "og:title", content: "Bookfleet — Book Mini Trucks & Delivery Vehicles Online" },
      {
        property: "og:description",
        content: "Move anything, anywhere in your city. Instant fare estimates and live tracking.",
      },
    ],
  }),
  component: Index,
});

const TESTIMONIALS = [
  {
    name: "Rahul Mehta",
    city: "Mumbai",
    rating: 5,
    text: "Used Bookfleet for shifting my home office. Driver arrived in 20 minutes, handled everything carefully. Fare matched the estimate exactly. Will definitely use again.",
    role: "Regular customer",
  },
  {
    name: "Priya Krishnan",
    city: "Bengaluru",
    rating: 5,
    text: "I run a small boutique and use Bookfleet for daily deliveries. Always on time, always professional. The live tracking is genuinely useful when customers ask for updates.",
    role: "Business owner",
  },
  {
    name: "Arjun Singh",
    city: "Delhi NCR",
    rating: 5,
    text: "Booked a Tata Ace for shop restocking. The fare estimate was accurate and the driver was courteous. 30-minute pickup is no joke — they actually deliver on that promise.",
    role: "Retail merchant",
  },
];

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader overlay />
      <main>
        {/* ── Hero — full-bleed image with two-column layout ── */}
        <section className="relative min-h-screen overflow-hidden rounded-b-3xl">
          <img
            src={heroTruck}
            alt="Mini truck loaded with cargo boxes on an Indian city street"
            width={1600}
            height={1104}
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />

          <div className="container-page relative grid min-h-screen items-center gap-10 pt-36 pb-16 lg:grid-cols-[1fr_440px] lg:gap-16">
            {/* Left — hero text */}
            <div className="self-center">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/25 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand ring-1 ring-brand/40">
                  <Star className="size-3 fill-brand" /> 4.8 rated
                </span>
                <span className="text-xs text-white/50">·</span>
                <span className="text-xs font-semibold text-white/60">2 Crore+ trips completed</span>
              </div>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
                Move anything,<br />
                <span className="text-brand">anywhere</span> in your city
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                Book a two wheeler, tempo or mini truck in 60 seconds. Upfront pricing, verified
                drivers, live GPS tracking.
              </p>
              <div className="mt-6 flex flex-wrap gap-5 text-xs text-white/55">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-brand" /> No surge pricing
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-brand" /> Driver in 30 min
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-brand" /> Live GPS tracking
                </span>
              </div>
            </div>

            {/* Right — booking widget */}
            <div id="book" className="scroll-mt-24 self-center text-foreground">
              <BookingWidget />
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="border-y border-border bg-card">
          <div className="container-page grid grid-cols-2 divide-x divide-border sm:grid-cols-4">
            {[
              { v: "16+", l: "Cities served", sub: "Pan India" },
              { v: "7.5 L+", l: "Driver partners", sub: "Verified & trained" },
              { v: "2 Cr+", l: "Deliveries done", sub: "Since 2018" },
              { v: "30 min", l: "Avg. pickup time", sub: "Guaranteed" },
            ].map(({ v, l, sub }) => (
              <div key={l} className="px-6 py-8">
                <p className="font-display text-3xl font-extrabold text-brand">{v}</p>
                <p className="mt-0.5 text-sm font-semibold">{l}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Services ── */}
        <section className="container-page py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">
                Our services
              </p>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
                What do you need to move?
              </h2>
            </div>
            <Link to="/services" className="text-sm font-semibold text-brand hover:underline">
              View all services →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                label: "Express delivery",
                title: "Two wheeler",
                copy: "Documents, food & parcels up to 20 kg delivered within the hour.",
                time: "Under 60 min",
                from: "₹30",
                image: twoWheeler,
                to: "/services" as const,
                badge: "Fastest",
              },
              {
                label: "Heavy loads",
                title: "Trucks & tempos",
                copy: "Furniture, appliances and shop stock. 3-wheelers to full-size trucks.",
                time: "Same day",
                from: "₹130",
                image: trucks,
                to: "/services" as const,
                badge: "Most popular",
              },
              {
                label: "House shifting",
                title: "Packers & movers",
                copy: "Trained crews who pack, load, transport and unpack your entire home.",
                time: "Scheduled",
                from: "₹6,500",
                image: packers,
                to: "/packers-and-movers" as const,
                badge: null,
              },
            ].map((c) => (
              <Link
                key={c.title}
                to={c.to}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    width={900}
                    height={700}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  {c.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-foreground">
                      {c.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    {c.time}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand">
                    {c.label}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{c.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm font-bold">From {c.from}</span>
                    <span className="text-xs font-semibold text-brand group-hover:underline">
                      Book now →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="bg-muted/40 py-20">
          <div className="container-page">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">
                Simple process
              </p>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Book in 4 easy steps</h2>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  emoji: "📍",
                  title: "Enter locations",
                  copy: "Add pickup and drop address. We'll estimate distance and show fares instantly.",
                },
                {
                  step: "02",
                  emoji: "🚛",
                  title: "Pick your vehicle",
                  copy: "Choose from 2-wheelers to large trucks based on your load size and budget.",
                },
                {
                  step: "03",
                  emoji: "✅",
                  title: "Confirm booking",
                  copy: "Review the upfront fare — no hidden charges — and confirm with one tap.",
                },
                {
                  step: "04",
                  emoji: "📦",
                  title: "Track live",
                  copy: "Driver assigned in minutes. Track their location on the map until delivery.",
                },
              ].map((s) => (
                <div key={s.step}>
                  <div className="flex items-start gap-3">
                    <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand/10 text-xl ring-1 ring-brand/20">
                      {s.emoji}
                    </div>
                    <span className="font-display text-5xl font-extrabold leading-none text-brand/10">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="mt-4 font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Fleet ── */}
        <section className="relative py-20">
          <img
            src="/assets/background.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/80" />
          <div className="container-page relative">
            <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">Fleet</p>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Choose your vehicle</h2>
            </div>
            <Link to="/services" className="text-sm font-semibold text-brand hover:underline">
              Full fare table →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {VEHICLES.map((v) => (
              <Link
                key={v.id}
                to="/"
                hash="book"
                className="group rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-brand/40 hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 items-center">
                    <img
                      src={VEHICLE_IMAGES[v.id] ?? "/assets/truck.png"}
                      alt={v.name}
                      className="h-12 w-auto object-contain drop-shadow-sm"
                    />
                  </div>
                  <span className="text-xs font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
                    Book →
                  </span>
                </div>
                <h3 className="mt-3 font-bold">{v.name}</h3>
                <p className="text-xs text-muted-foreground">Up to {v.capacity}</p>
                <p className="text-xs text-muted-foreground">{v.size}</p>
                <div className="mt-4 border-t border-border pt-3">
                  <p className="text-sm font-extrabold">
                    ₹{v.baseFare}
                    <span className="text-xs font-normal text-muted-foreground"> base</span>
                  </p>
                  <p className="text-xs text-muted-foreground">+ ₹{v.perKm}/km</p>
                </div>
              </Link>
            ))}
          </div>
          </div>
        </section>

        {/* ── Why Bookfleet — dark split ── */}
        <section className="bg-ink py-20 text-ink-foreground">
          <div className="container-page grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">
                Why Bookfleet
              </p>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
                Built for India's logistics needs
              </h2>
              <p className="mt-4 text-base opacity-65">
                From a single envelope to a full truck, Bookfleet makes intra-city logistics
                predictable, fast and reliable.
              </p>
              <ul className="mt-8 space-y-5">
                {[
                  [
                    IndianRupee,
                    "Upfront, transparent fares",
                    "See the exact fare before confirming. No surge, no surprise charges — ever.",
                  ],
                  [
                    Clock,
                    "30-minute guaranteed pickup",
                    "Our driver network ensures someone reaches you within 30 minutes, across all cities.",
                  ],
                  [
                    ShieldCheck,
                    "Verified drivers & goods insurance",
                    "Every partner undergoes background checks. Your goods are insured on every trip.",
                  ],
                  [
                    Navigation2,
                    "Live GPS tracking",
                    "Follow your driver on the map in real time, from pickup right through to drop.",
                  ],
                ].map(([Icon, title, copy]) => {
                  const I = Icon as typeof Clock;
                  return (
                    <li key={title as string} className="flex gap-4">
                      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/20 ring-1 ring-brand/30">
                        <I className="size-5 text-brand" />
                      </div>
                      <div>
                        <h3 className="font-bold">{title as string}</h3>
                        <p className="mt-0.5 text-sm opacity-60">{copy as string}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-6">
                <p className="font-display text-5xl font-extrabold text-brand">98%</p>
                <p className="mt-1 font-semibold">On-time delivery rate</p>
                <p className="mt-1 text-sm opacity-55">Across all cities and vehicle types</p>
              </div>
              <div className="rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-6">
                <p className="font-display text-4xl font-extrabold text-brand">4.8</p>
                <div className="mt-1 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="size-3.5 fill-brand text-brand" />
                  ))}
                </div>
                <p className="mt-2 text-sm opacity-55">Average app rating</p>
              </div>
              <div className="rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-6">
                <p className="font-display text-4xl font-extrabold text-brand">60s</p>
                <p className="mt-1 font-semibold">To book</p>
                <p className="mt-1 text-sm opacity-55">From open to confirmed</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="container-page py-20">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">Reviews</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Trusted by thousands</h2>
            <p className="mt-3 text-sm text-muted-foreground">Real customers, real deliveries.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-brand text-brand" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <div className="grid size-9 place-items-center rounded-full bg-brand/20 text-sm font-bold text-brand">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role} · {t.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── App download ── */}
        <section className="bg-ink text-ink-foreground">
          <div className="container-page grid items-center gap-10 py-20 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">
                Mobile app
              </p>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Book on the go</h2>
              <p className="mt-3 max-w-md text-base opacity-65">
                Instant quotes, live driver tracking, booking history and one-tap re-orders — all
                in the Bookfleet app.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <AppStoreLink />
                <PlayStoreLink />
              </div>
              <div className="mt-6 flex flex-wrap gap-6 text-sm opacity-60">
                <span className="flex items-center gap-1.5">
                  <Star className="size-4 fill-brand text-brand" /> 4.8 on App Store
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="size-4 fill-brand text-brand" /> 4.7 on Play Store
                </span>
                <span>5M+ downloads</span>
              </div>
            </div>
            <div className="hidden gap-3 lg:flex">
              <div className="flex h-64 w-32 flex-col overflow-hidden rounded-3xl border border-ink-foreground/10 bg-ink-foreground/5 shadow-2xl">
                <div className="h-1.5 w-full bg-brand/50" />
                <div className="flex-1 space-y-2 p-3">
                  <div className="h-3 w-3/4 rounded bg-ink-foreground/10" />
                  <div className="h-3 w-1/2 rounded bg-ink-foreground/10" />
                  <div className="mt-3 h-16 rounded-xl bg-brand/20" />
                  <div className="h-3 rounded bg-ink-foreground/10" />
                  <div className="h-3 w-5/6 rounded bg-ink-foreground/10" />
                  <div className="mt-3 h-8 rounded-lg bg-brand/40" />
                </div>
              </div>
              <div className="mt-8 flex h-64 w-32 flex-col overflow-hidden rounded-3xl border border-ink-foreground/10 bg-ink-foreground/5 shadow-2xl">
                <div className="h-1.5 w-full bg-brand/50" />
                <div className="flex-1 space-y-2 p-3">
                  <div className="h-20 rounded-xl bg-brand/20" />
                  <div className="h-3 w-3/4 rounded bg-ink-foreground/10" />
                  <div className="h-3 w-1/2 rounded bg-ink-foreground/10" />
                  <div className="mt-2 h-6 rounded-lg bg-brand/40" />
                  <div className="h-6 rounded-lg bg-ink-foreground/10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cities ── */}
        <section className="border-t border-border py-16">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">
                  Coverage
                </p>
                <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
                  Available across India
                </h2>
              </div>
              <Link to="/partner" className="text-sm font-semibold text-brand hover:underline">
                Request your city →
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <span
                  key={c}
                  className="cursor-default rounded-full border border-border bg-muted/50 px-4 py-2 text-sm font-medium transition-colors hover:border-brand/40 hover:bg-brand/5 hover:text-brand"
                >
                  {c}
                </span>
              ))}
            </div>
            <Link
              to="/"
              hash="book"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink-foreground shadow-lg shadow-brand/25 transition-opacity hover:opacity-90"
            >
              Book a vehicle now <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function AppStoreLink() {
  return (
    <a
      href="#"
      aria-label="Download on the App Store"
      className="inline-flex items-center gap-3 rounded-xl border border-ink-foreground/20 bg-ink-foreground/10 px-5 py-3 text-ink-foreground transition-all hover:border-ink-foreground/30 hover:bg-ink-foreground/15"
    >
      <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-current" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="text-left leading-tight">
        <p className="text-[10px] opacity-65">Download on the</p>
        <p className="text-sm font-bold">App Store</p>
      </div>
    </a>
  );
}

function PlayStoreLink() {
  return (
    <a
      href="#"
      aria-label="Get it on Google Play"
      className="inline-flex items-center gap-3 rounded-xl border border-ink-foreground/20 bg-ink-foreground/10 px-5 py-3 text-ink-foreground transition-all hover:border-ink-foreground/30 hover:bg-ink-foreground/15"
    >
      <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-current" aria-hidden="true">
        <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85C3.34 21.61 3 21.09 3 20.5zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zM20.16 10.81c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
      </svg>
      <div className="text-left leading-tight">
        <p className="text-[10px] opacity-65">Get it on</p>
        <p className="text-sm font-bold">Google Play</p>
      </div>
    </a>
  );
}
