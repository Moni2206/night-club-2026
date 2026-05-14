import BookingClient from "@/components/book-table/BookingClient";
import Navbar from "../../components/Navbar";
const BASE_URL = "https://night-club-th9v.onrender.com";

async function getReservations() {
  const res = await fetch(`${BASE_URL}/reservations`, {
    cache: "no-store",
  });
  return res.json();
}

async function getEvents() {
  const res = await fetch(`${BASE_URL}/events`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Page() {
  const [reservations, events] = await Promise.all([getReservations(), getEvents()]);

  return (
    <div>
      <Navbar />
      <BookingClient initialReservations={reservations} initialEvents={events} />
    </div>
  );
}
