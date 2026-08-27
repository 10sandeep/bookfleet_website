import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Bookfleet Support" },
      {
        name: "description",
        content:
          "Reach Bookfleet customer support for delivery queries, business enquiries and driver partner help.",
      },
      { property: "og:title", content: "Contact Bookfleet Support" },
      {
        property: "og:description",
        content: "Support for customers, businesses and driver partners.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen">
      <SiteHeader overlay />
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden rounded-b-3xl bg-ink text-ink-foreground">
          <img
            src="/assets/contact.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40" />

          <div className="container-page relative pb-32 pt-52">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Contact us</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">Talk to us</h1>
            <p className="mt-4 max-w-sm text-lg opacity-70">
              Our support team is available every day, from 7 AM to 11 PM IST.
            </p>
          </div>
        </section>

        {/* ── Get in touch + Form ── */}
        <section className="container-page grid gap-12 py-16 md:grid-cols-[1fr_560px]">
          {/* Left — contact info */}
          <div>
            <h2 className="text-2xl font-extrabold">Get in touch</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Whether it's a delivery query, a business enquiry, or driver partner support — we're
              here to help.
            </p>

            <ul className="mt-8 space-y-6">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "1800-000-0000 (toll free)",
                  link: "Call us anytime",
                  href: "tel:18000000000",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "support@bookfleet.in",
                  link: "We reply within one business day",
                  href: "mailto:support@bookfleet.in",
                },
                {
                  icon: MapPin,
                  label: "Office",
                  value: "Koramangala, Bengaluru 560034",
                  link: "View on map ↗",
                  href: "https://maps.google.com/?q=Koramangala+Bengaluru",
                },
              ].map(({ icon: Icon, label, value, link, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <div className="grid size-11 shrink-0 place-items-center rounded-full bg-brand/10 ring-1 ring-brand/20">
                    <Icon className="size-5 text-brand" />
                  </div>
                  <div>
                    <p className="font-bold">{label}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{value}</p>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm font-semibold text-brand hover:underline"
                    >
                      {link}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setName("");
              setEmail("");
              setMessage("");
              toast.success("Message sent", {
                description: "We'll reply within one business day.",
              });
            }}
            className="h-fit rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-lift)]"
          >
            <h2 className="text-xl font-extrabold">Send a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We'll get back to you within one business day.
            </p>

            <div className="mt-6 space-y-3">
              {/* Name */}
              <div className="flex items-center gap-3 rounded-xl border border-input px-4 py-3 transition-colors focus-within:border-ring">
                <User className="size-4 shrink-0 text-muted-foreground" />
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 rounded-xl border border-input px-4 py-3 transition-colors focus-within:border-ring">
                <Mail className="size-4 shrink-0 text-muted-foreground" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>

              {/* Message */}
              <div className="flex gap-3 rounded-xl border border-input px-4 py-3 transition-colors focus-within:border-ring">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-ink-foreground transition-opacity hover:opacity-90"
            >
              Send message <ArrowRight className="size-4" />
            </button>
          </form>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

