import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, MapPin, Truck } from "lucide-react";
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

export function BookingWidget() {
  const [city, setCity] = useState(CITIES[0]!);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [vehicleId, setVehicleId] = useState(VEHICLES[2]!.id);
  const [placed, setPlaced] = useState<Booking | null>(null);

  const ready = pickup.trim().length > 2 && drop.trim().length > 2;
  const distanceKm = useMemo(
    () => (ready ? estimateDistanceKm(pickup, drop) : 0),
    [ready, pickup, drop],
  );

  function book() {
    const vehicle = VEHICLES.find((v) => v.id === vehicleId)!;
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
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-lift)]">
        <CheckCircle2 className="size-9 text-brand-deep" />
        <h2 className="mt-3 text-2xl font-extrabold">Booking confirmed</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Order ID <span className="font-semibold text-foreground">{placed.id}</span> · driver
          assigned and heading to pickup.
        </p>
        <dl className="mt-5 space-y-3 text-sm">
          <Row label="Vehicle" value={placed.vehicleName} />
          <Row label="Pickup" value={placed.pickup} />
          <Row label="Drop" value={placed.drop} />
          <Row label="Distance" value={`${placed.distanceKm} km`} />
          <Row label="Fare" value={`₹${placed.fare}`} />
        </dl>
        <button
          onClick={() => {
            setPlaced(null);
            setPickup("");
            setDrop("");
          }}
          className="mt-6 w-full rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-ink-foreground"
        >
          Book another trip
        </button>
      </div>
    );
  }

  return (
    <div
      id="book"
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-lift)]"
    >
      <h2 className="text-2xl font-extrabold">Get an instant estimate</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Transparent pricing. No surge, no hidden charges.
      </p>

      <label className="mt-5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
        City
      </label>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm font-medium outline-none focus:border-ring"
      >
        {CITIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <div className="mt-4 space-y-3">
        <Field
          icon={<span className="size-2.5 rounded-full bg-brand-deep" />}
          placeholder="Pickup address"
          value={pickup}
          onChange={setPickup}
        />
        <Field
          icon={<MapPin className="size-4 text-muted-foreground" />}
          placeholder="Drop address"
          value={drop}
          onChange={setDrop}
        />
      </div>

      <div className="mt-5 space-y-2">
        {VEHICLES.map((v) => {
          const selected = v.id === vehicleId;
          return (
            <button
              key={v.id}
              onClick={() => setVehicleId(v.id)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                selected ? "border-brand bg-accent" : "border-border hover:bg-muted"
              }`}
            >
              <Truck className="size-5 shrink-0 text-muted-foreground" />
              <span className="flex-1">
                <span className="block text-sm font-semibold">{v.name}</span>
                <span className="block text-xs text-muted-foreground">
                  Up to {v.capacity} · {v.size}
                </span>
              </span>
              <span className="text-sm font-bold">
                {ready ? `₹${fareFor(v, distanceKm)}` : `₹${v.baseFare}+`}
              </span>
            </button>
          );
        })}
      </div>

      {ready && (
        <p className="mt-4 text-xs text-muted-foreground">
          Estimated distance {distanceKm} km · fare includes base fare, distance and loading time.
        </p>
      )}

      <button
        disabled={!ready}
        onClick={book}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
      >
        Book now <ArrowRight className="size-4" />
      </button>
    </div>
  );
}

function Field({
  icon,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-input bg-background px-4 py-3 focus-within:border-ring">
      {icon}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}