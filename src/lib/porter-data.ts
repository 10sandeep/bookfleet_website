export type Vehicle = {
  id: string;
  name: string;
  capacity: string;
  size: string;
  baseFare: number;
  perKm: number;
  minKm: number;
};

export const VEHICLES: Vehicle[] = [
  {
    id: "scooty",
    name: "Scooty",
    capacity: "10 kg",
    size: "30 x 30 x 30 cm",
    baseFare: 25,
    perKm: 7,
    minKm: 2,
  },
  {
    id: "2wheeler",
    name: "Bike",
    capacity: "20 kg",
    size: "40 x 40 x 40 cm",
    baseFare: 30,
    perKm: 9,
    minKm: 2,
  },
  {
    id: "3wheeler",
    name: "3 Wheeler",
    capacity: "500 kg",
    size: "5.5 x 4.5 x 4.5 ft",
    baseFare: 130,
    perKm: 14,
    minKm: 3,
  },
  {
    id: "tataace",
    name: "Tata Ace",
    capacity: "750 kg",
    size: "7 x 4.5 x 4.5 ft",
    baseFare: 180,
    perKm: 18,
    minKm: 3,
  },
  {
    id: "pickup8ft",
    name: "Pickup 8ft",
    capacity: "1250 kg",
    size: "8 x 5 x 5 ft",
    baseFare: 320,
    perKm: 24,
    minKm: 4,
  },
  {
    id: "tata407",
    name: "Tata 407",
    capacity: "2500 kg",
    size: "9 x 5.5 x 5.5 ft",
    baseFare: 520,
    perKm: 32,
    minKm: 5,
  },
];

export const CITIES = [
  "Mumbai",
  "Delhi NCR",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Ahmedabad",
  "Kolkata",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Coimbatore",
  "Nagpur",
  "Chandigarh",
  "Indore",
  "Kochi",
];

/** Deterministic pseudo-distance so estimates stay stable for the same route. */
export function estimateDistanceKm(pickup: string, drop: string) {
  const seed = `${pickup.trim().toLowerCase()}|${drop.trim().toLowerCase()}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % 100000;
  return Number((2.5 + (hash % 220) / 10).toFixed(1));
}

export function fareFor(vehicle: Vehicle, distanceKm: number) {
  const billable = Math.max(distanceKm, vehicle.minKm);
  const fare = vehicle.baseFare + billable * vehicle.perKm;
  return Math.round(fare / 5) * 5;
}

export type Booking = {
  id: string;
  pickup: string;
  drop: string;
  city: string;
  vehicleId: string;
  vehicleName: string;
  distanceKm: number;
  fare: number;
  createdAt: string;
  status: "Driver assigned" | "In transit" | "Delivered";
};

const KEY = "porter_bookings";

export function loadBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as Booking[];
  } catch {
    return [];
  }
}

export function saveBooking(booking: Booking) {
  const all = [booking, ...loadBookings()].slice(0, 25);
  window.localStorage.setItem(KEY, JSON.stringify(all));
}

export function newBookingId() {
  return `PRT${Math.floor(100000 + Math.random() * 899999)}`;
}