import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  CITIES,
  VEHICLES,
  estimateDistanceKm,
  fareFor,
  newBookingId,
  saveBooking,
  type Booking,
} from "@/lib/porter-data";

type Category = "truck" | "2wheeler" | "packers";

const CATEGORIES: Array<{ id: Category; label: string; sub: string; image: string }> = [
  {
    id: "truck",
    label: "Truck",
    sub: "3 Wheelers · Mini Trucks",
    image: "/assets/auto.png",
  },
  {
    id: "2wheeler",
    label: "Two Wheeler",
    sub: "Documents · Parcels",
    image: "/assets/bike.png",
  },
  {
    id: "packers",
    label: "Packers & Movers",
    sub: "House Shifting",
    image: "/assets/truck.png",
  },
];

const VEHICLE_IMAGES: Record<string, string> = {
  scooty: "/assets/scooty.png",
  "2wheeler": "/assets/bike.png",
  "3wheeler": "/assets/auto.png",
  tataace: "/assets/pickup.png",
  pickup8ft: "/assets/pickup.png",
  tata407: "/assets/truck.png",
};

const TRUCK_VEHICLES = VEHICLES.filter((v) => v.id !== "2wheeler" && v.id !== "scooty");
const BIKE_VEHICLES = VEHICLES.filter((v) => v.id === "2wheeler" || v.id === "scooty");

export function BookingWidget() {
  const [category, setCategory] = useState<Category>("truck");
  const [city, setCity] = useState(CITIES[0]!);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [vehicleId, setVehicleId] = useState(VEHICLES[2]!.id);
  const [placed, setPlaced] = useState<Booking | null>(null);

  const categoryVehicles = category === "2wheeler" ? BIKE_VEHICLES : TRUCK_VEHICLES;
  const vehicle = VEHICLES.find((v) => v.id === vehicleId) ?? VEHICLES[2]!;
  const ready = pickup.trim().length > 2 && drop.trim().length > 2;
  const distanceKm = useMemo(
    () => (ready ? estimateDistanceKm(pickup, drop) : 0),
    [ready, pickup, drop],
  );

  function handleCategoryChange(cat: Category) {
    setCategory(cat);
    if (cat === "2wheeler") setVehicleId("scooty");
    else if (cat === "truck") setVehicleId("tataace");
  }

  function book() {
    const booking: Booking = {
      id: newBookingId(),
      pickup,
      drop,
      city,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      distanceKm,
      fare: fareFor(vehicle, distanceKm),
      createdAt: new Date().toISOString(),
      status: "Driver assigned",
    };
    saveBooking(booking);
    setPlaced(booking);
    toast.success(`Booking ${booking.id} confirmed`, {
      description: `${vehicle.name} arriving at pickup shortly.`,
    });
  }

  if (placed) {
    return (
      <div className="rounded-2xl bg-card p-6 shadow-[0_8px_48px_-12px_rgba(0,0,0,0.22)]">
        <CheckCircle2 className="size-10 text-brand" />
        <h2 className="mt-3 text-2xl font-extrabold">Booking confirmed!</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Order <span className="font-semibold text-foreground">{placed.id}</span> · Driver
          assigned and heading to pickup.
        </p>
        <dl className="mt-5 space-y-3 text-sm">
          {(
            [
              ["Vehicle", placed.vehicleName],
              ["Pickup", placed.pickup],
              ["Drop", placed.drop],
              ["Distance", `${placed.distanceKm} km`],
              ["Fare", `₹${placed.fare}`],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="flex justify-between border-b border-border pb-2">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        <button
          onClick={() => {
            setPlaced(null);
            setPickup("");
            setDrop("");
          }}
          className="mt-6 w-full rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-80"
        >
          Book another trip
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card p-6 shadow-[0_8px_48px_-12px_rgba(0,0,0,0.22)]">
      {/* Category cards with vehicle illustrations */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryChange(cat.id)}
            className={`flex flex-col items-center gap-2 rounded-xl border px-2 pb-3 pt-4 text-center transition-all duration-200 ${
              category === cat.id
                ? "border-brand bg-brand/5 shadow-sm"
                : "border-border hover:border-brand/30 hover:bg-muted/40"
            }`}
          >
            <div className="flex h-14 items-center justify-center">
              <img
                src={cat.image}
                alt={cat.label}
                className="h-12 w-auto object-contain drop-shadow-sm"
              />
            </div>
            <p className="text-xs font-bold leading-tight">{cat.label}</p>
            <p className="text-[10px] leading-tight text-muted-foreground hidden sm:block">
              {cat.sub}
            </p>
          </button>
        ))}
      </div>

      {/* Packers CTA */}
      {category === "packers" ? (
        <div className="mt-5">
          <p className="text-center text-sm text-muted-foreground">
            Get a fixed, all-inclusive quote — our trained crew handles packing, loading and
            unpacking end to end.
          </p>
          <Link
            to="/packers-and-movers"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-ink-foreground transition-opacity hover:opacity-90"
          >
            Get a moving quote <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : (
        <>
          {/* City */}
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-input bg-background px-4 py-3 transition-colors focus-within:border-ring">
            <MapPin className="size-4 shrink-0 text-brand" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none"
            >
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground pointer-events-none" />
          </div>

          {/* Addresses */}
          <div className="mt-3 overflow-hidden rounded-xl border border-input transition-colors focus-within:border-ring">
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="size-2.5 shrink-0 rounded-full bg-brand" />
              <input
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Pickup address"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="border-t border-input" />
            <div className="flex items-center gap-3 px-4 py-3">
              <MapPin className="size-4 shrink-0 text-muted-foreground" />
              <input
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                placeholder="Drop address"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Vehicle chips with illustrations */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5">
            {categoryVehicles.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVehicleId(v.id)}
                className={`shrink-0 flex items-center gap-2.5 rounded-xl border px-3 py-2 text-left transition-colors ${
                  vehicleId === v.id
                    ? "border-brand bg-brand/5 text-brand"
                    : "border-border hover:border-brand/30"
                }`}
              >
                <img
                  src={VEHICLE_IMAGES[v.id] ?? "/assets/truck.png"}
                  alt={v.name}
                  className="h-9 w-12 object-contain"
                />
                <div>
                  <p className={`text-xs font-bold ${vehicleId === v.id ? "text-brand" : "text-foreground"}`}>
                    {v.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{v.capacity}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Fare estimate */}
          {ready && (
            <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/60 px-4 py-3">
              <div className="text-sm text-muted-foreground">
                {distanceKm} km · {vehicle.name}
              </div>
              <div className="text-xl font-extrabold text-brand">
                ₹{fareFor(vehicle, distanceKm)}
              </div>
            </div>
          )}

          <button
            disabled={!ready}
            onClick={book}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-ink-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {ready ? "Book now" : "Get an estimate"} <ArrowRight className="size-4" />
          </button>

          {!ready && (
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Enter pickup & drop to see fare
            </p>
          )}
        </>
      )}
    </div>
  );
}
