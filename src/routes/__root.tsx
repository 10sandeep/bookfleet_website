import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bookfleet — Intra-city Logistics & Truck Booking" },
      {
        name: "description",
        content: "Book delivery vehicles, mini trucks and packers & movers across India.",
      },
      { property: "og:title", content: "Bookfleet — Intra-city Logistics & Truck Booking" },
      {
        property: "og:description",
        content: "Book delivery vehicles, mini trucks and packers & movers across India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Manrope:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://bookfleet.in/#organization",
    name: "Bookfleet",
    url: "https://bookfleet.in",
    logo: {
      "@type": "ImageObject",
      url: "https://bookfleet.in/favicon.ico",
    },
    description:
      "India's intra-city logistics marketplace. Book two wheelers, tempos, mini trucks and packers & movers in minutes. Transparent fares, verified drivers, live GPS tracking.",
    foundingDate: "2018",
    areaServed: "IN",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-1800-000-0000",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
      contactOption: "TollFree",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Koramangala",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560034",
      addressCountry: "IN",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://bookfleet.in/#website",
    name: "Bookfleet",
    url: "https://bookfleet.in",
    publisher: { "@id": "https://bookfleet.in/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://bookfleet.in/track?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bookfleet site navigation",
    itemListElement: [
      { "@type": "SiteLinksSearchBox", url: "https://bookfleet.in" },
      {
        "@type": "ListItem",
        position: 1,
        name: "Delivery Services",
        url: "https://bookfleet.in/services",
        description: "Book two wheelers, trucks and tempos for intra-city deliveries.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Packers & Movers",
        url: "https://bookfleet.in/packers-and-movers",
        description: "Professional house shifting with trained crews and a fixed upfront quote.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Track Your Order",
        url: "https://bookfleet.in/track",
        description: "Live status for every Bookfleet trip, from pickup to drop.",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Drive with Us",
        url: "https://bookfleet.in/partner",
        description: "Attach your vehicle and earn up to ₹45,000 a month with Bookfleet.",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Contact Support",
        url: "https://bookfleet.in/contact",
        description: "Reach Bookfleet support for delivery queries and business enquiries.",
      },
    ],
  },
];

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}
