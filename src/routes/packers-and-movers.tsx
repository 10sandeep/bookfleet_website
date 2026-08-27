import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  Calendar,
  ClipboardList,
  Headphones,
  Home,
  MapPin,
  ShieldCheck,
  Star,
  Truck,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CITIES } from "@/lib/porter-data";
import packers from "@/assets/packers.jpg";

export const Route = createFileRoute("/packers-and-movers")({
  head: () => ({
    meta: [
      { title: "Packers and Movers — House Shifting | Bookfleet" },
      {
        name: "description",
        content:
          "Book verified packers and movers for house shifting. Professional packing, loading, transport and unpacking at a fixed upfront quote.",
      },
      { property: "og:title", content: "Packers and Movers — House Shifting | Bookfleet" },
      {
        property: "og:description",
        content: "Verified crews, fixed upfront quote, damage-free house shifting.",
      },
    ],
  }),
  component: PackersPage,
});

const FEATURES = [
  { icon: Users, label: "Trained & Verified Professionals" },
  { icon: ShieldCheck, label: "Safe & Quality Packing" },
  { icon: ClipboardList, label: "Fixed Quote No Surprises" },
  { icon: Truck, label: "On-time Delivery" },
];

const STEPS = [
  {
    icon: ClipboardList,
    num: 1,
    title: "Get a quote",
    copy: "Share your moving details and get a fixed quote.",
  },
  {
    icon: ShieldCheck,
    num: 2,
    title: "We pack everything",
    copy: "Our team arrives with quality materials and packs safely.",
  },
  {
    icon: Truck,
    num: 3,
    title: "We move it safely",
    copy: "Your items are loaded and transported with care.",
  },
  {
    icon: Home,
    num: 4,
    title: "We deliver & set up",
    copy: "We unload and help set up at your new home.",
  },
];

function PackersPage() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  function handleQuote(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Quote request received", {
      description: "Our move expert will call you within 15 minutes.",
    });
  }

  return (
    <div className="min-h-screen">
      <SiteHeader overlay />
      <main>
        {/* ── Hero ── */}
        <section className="relative flex items-center overflow-hidden rounded-b-3xl text-ink-foreground" style={{ minHeight: "560px" }}>
          {/* Full-bleed background image */}
          <img
            src={packers}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover object-center"
          />
          {/* Dark overlay — heavier on the left so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

          <div className="container-page relative pb-12 pt-32">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
              Packers &amp; Movers
            </p>
            <h1 className="mt-3 max-w-xl text-4xl font-extrabold leading-tight md:text-5xl">
              House shifting without the stress
            </h1>
            <p className="mt-4 max-w-md text-lg opacity-75">
              Trained crews, quality packing material, and a fixed quote confirmed before the truck
              arrives.
            </p>

            {/* Feature icons */}
            <div className="mt-8 flex flex-wrap gap-5">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-sm"
                >
                  <Icon className="size-4 shrink-0 text-brand" />
                  <p className="text-xs font-semibold text-white">{label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/packers-and-movers"
                hash="quote"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-ink-foreground transition-opacity hover:opacity-90"
              >
                Book now <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>

        {/* ── How it works + Quote form ── */}
        <section id="quote" className="scroll-mt-24 py-16">
          <div className="container-page grid items-start gap-12 lg:grid-cols-[1fr_380px]">
            {/* Steps */}
            <div>
              <h2 className="text-3xl font-extrabold">How it works</h2>

              {/* Horizontal step row */}
              <div className="mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.num} className="relative flex flex-col items-center text-center">
                      {/* Dashed connector */}
                      {i < STEPS.length - 1 && (
                        <div
                          className="absolute left-[calc(50%+28px)] top-7 hidden h-px w-[calc(100%-56px)] border-t-2 border-dashed border-border sm:block"
                          aria-hidden="true"
                        />
                      )}
                      {/* Icon circle */}
                      <div className="relative grid size-14 place-items-center rounded-full bg-muted ring-1 ring-border">
                        <Icon className="size-6 text-muted-foreground" />
                        {/* Numbered badge */}
                        <span className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full bg-brand text-[10px] font-extrabold text-ink-foreground">
                          {s.num}
                        </span>
                      </div>
                      <h3 className="mt-4 text-sm font-bold">{s.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.copy}</p>
                    </div>
                  );
                })}
              </div>

              {/* Stats strip */}
              <div className="mt-10 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-card">
                {[
                  { icon: ShieldCheck, val: "10,000+", label: "Happy Customers" },
                  { icon: Star, val: "4.8/5", label: "Customer Rating" },
                  { icon: Headphones, val: "24/7", label: "Customer Support" },
                ].map(({ icon: Icon, val, label }) => (
                  <div key={label} className="flex items-center gap-3 px-4 py-5">
                    <Icon className="size-5 shrink-0 text-brand" />
                    <div>
                      <p className="font-extrabold">{val}</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote form */}
            <form
              onSubmit={handleQuote}
              className="h-fit rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-lift)]"
            >
              <h2 className="text-xl font-extrabold">Get your moving quote</h2>

              <div className="mt-5 space-y-3">
                {/* Full name */}
                <div className="flex items-center gap-3 rounded-xl border border-input px-4 py-3 transition-colors focus-within:border-ring">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>

                {/* Moving from */}
                <div className="flex items-center gap-3 rounded-xl border border-input px-4 py-3 transition-colors focus-within:border-ring">
                  <MapPin className="size-4 shrink-0 text-muted-foreground" />
                  <input
                    required
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Moving from"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>

                {/* Moving to */}
                <div className="flex items-center gap-3 rounded-xl border border-input px-4 py-3 transition-colors focus-within:border-ring">
                  <MapPin className="size-4 shrink-0 text-muted-foreground" />
                  <input
                    required
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Moving to"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>

                {/* Move date */}
                <div className="flex items-center gap-3 rounded-xl border border-input px-4 py-3 transition-colors focus-within:border-ring">
                  <Calendar className="size-4 shrink-0 text-muted-foreground" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent text-sm text-muted-foreground outline-none [color-scheme:light]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-ink-foreground transition-opacity hover:opacity-90"
              >
                Get quote <ArrowRight className="size-4" />
              </button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
