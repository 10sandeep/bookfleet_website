import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CITIES } from "@/lib/porter-data";
import packers from "@/assets/packers.jpg";

export const Route = createFileRoute("/packers-and-movers")({
  head: () => ({
    meta: [
      { title: "Packers and Movers — House Shifting | Porter" },
      {
        name: "description",
        content:
          "Book verified packers and movers for house shifting. Professional packing, loading, transport and unpacking at a fixed upfront quote.",
      },
      { property: "og:title", content: "Packers and Movers — House Shifting | Porter" },
      {
        property: "og:description",
        content: "Verified crews, fixed upfront quote, damage-free house shifting.",
      },
    ],
  }),
  component: PackersPage,
});

const HOME_SIZES = [
  { id: "1rk", label: "1 RK", price: 6500 },
  { id: "1bhk", label: "1 BHK", price: 9500 },
  { id: "2bhk", label: "2 BHK", price: 15500 },
  { id: "3bhk", label: "3 BHK", price: 23500 },
];

function PackersPage() {
  const [size, setSize] = useState(HOME_SIZES[1].id);
  const [from, setFrom] = useState(CITIES[0]);
  const [to, setTo] = useState(CITIES[0]);
  const [phone, setPhone] = useState("");

  const selected = HOME_SIZES.find((h) => h.id === size)!;
  const intercity = from !== to;
  const quote = intercity ? Math.round(selected.price * 2.4) : selected.price;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="bg-ink py-16 text-ink-foreground">
          <div className="container-page grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                Packers & movers
              </p>
              <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
                House shifting without the stress
              </h1>
              <p className="mt-4 text-lg opacity-75">
                Trained crews, quality packing material, and a fixed quote confirmed before the
                truck arrives.
              </p>
            </div>
            <img
              src={packers}
              alt="Movers carrying packed boxes into a home"
              loading="lazy"
              width={900}
              height={700}
              className="rounded-2xl object-cover"
            />
          </div>
        </section>

        <section className="container-page grid gap-10 py-16 md:grid-cols-[1fr_380px]">
          <div>
            <h2 className="text-3xl font-extrabold">How it works</h2>
            <ol className="mt-6 space-y-5">
              {[
                ["Share your requirement", "Tell us your home size and shifting route."],
                ["Get a fixed quote", "Transparent, all-inclusive pricing with no surprises."],
                ["We pack & load", "Bubble wrap, cartons and trained loaders on shifting day."],
                ["Delivered & unpacked", "Goods reassembled at your new home, insured end to end."],
              ].map(([title, copy], i) => (
                <li key={title} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand font-bold text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Quote request received", {
                description: `Our move expert will call ${phone} within 15 minutes.`,
              });
            }}
            className="h-fit rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-lift)]"
          >
            <h2 className="text-xl font-extrabold">Get your moving quote</h2>

            <label className="mt-5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Home size
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {HOME_SIZES.map((h) => (
                <button
                  type="button"
                  key={h.id}
                  onClick={() => setSize(h.id)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${
                    h.id === size ? "border-brand bg-accent" : "border-border hover:bg-muted"
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Select label="From" value={from} onChange={setFrom} />
              <Select label="To" value={to} onChange={setTo} />
            </div>

            <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Mobile number
            </label>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile number"
              pattern="[0-9]{10}"
              className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
            />

            <div className="mt-5 rounded-xl bg-muted p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Estimated cost
              </p>
              <p className="text-2xl font-extrabold">₹{quote.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground">
                {intercity ? "Intercity move" : "Within-city move"} · {selected.label}
              </p>
            </div>

            <button className="mt-5 w-full rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-ink">
              Request callback
            </button>
          </form>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-3 text-sm outline-none focus:border-ring"
      >
        {CITIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}