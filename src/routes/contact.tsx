import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Porter Support" },
      {
        name: "description",
        content:
          "Reach Porter customer support for delivery queries, business enquiries and driver partner help.",
      },
      { property: "og:title", content: "Contact Porter Support" },
      {
        property: "og:description",
        content: "Support for customers, businesses and driver partners.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container-page grid gap-12 py-16 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold">Talk to us</h1>
          <p className="mt-3 text-muted-foreground">
            Our support team is available every day, from 7 AM to 11 PM.
          </p>
          <ul className="mt-8 space-y-5 text-sm">
            <li className="flex gap-3">
              <Phone className="size-5 text-brand-deep" /> 1800-000-0000 (toll free)
            </li>
            <li className="flex gap-3">
              <Mail className="size-5 text-brand-deep" /> support@porter-demo.in
            </li>
            <li className="flex gap-3">
              <MapPin className="size-5 text-brand-deep" /> Koramangala, Bengaluru 560034
            </li>
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMessage("");
            toast.success("Message sent", { description: "We'll reply within one business day." });
          }}
          className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-lift)]"
        >
          <h2 className="text-xl font-extrabold">Send a message</h2>
          <input
            required
            placeholder="Your name"
            className="mt-5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
          />
          <input
            required
            type="email"
            placeholder="Email address"
            className="mt-3 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
          />
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
            className="mt-3 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
          />
          <button className="mt-5 w-full rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-ink">
            Send message
          </button>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}