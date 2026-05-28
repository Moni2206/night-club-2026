"use client";

import { useState } from "react";
import { useEffect } from "react";
import { z } from "zod";
import { createReservation } from "@/actions/reservation";
import { useSearchParams } from "next/navigation";
const reservationSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  guests: z.coerce.number().min(1).max(12),
  phone: z
    .string()
    .min(8)
    .regex(/^[0-9+\s]+$/),
  eventId: z.string().min(1),
  table: z.string().min(1),
  content: z.string().optional(),
});

const TABLES = [
  { id: "1", img: "table_1" },
  { id: "2", img: "table_1" },
  { id: "3", img: "table_2" },
  { id: "4", img: "table_1" },
  { id: "5", img: "table_3" },
  { id: "6", img: "table_1" },
  { id: "7", img: "table_1" },
  { id: "8", img: "table_2" },
  { id: "9", img: "table_1" },
  { id: "10", img: "table_3" },
  { id: "11", img: "table_1" },
  { id: "12", img: "table_1" },
  { id: "13", img: "table_2" },
  { id: "14", img: "table_1" },
  { id: "15", img: "table_3" },
];

export default function BookingClient({ initialReservations, initialEvents }) {
  const searchParams = useSearchParams();

  const eventIdFromUrl = searchParams.get("event") ?? "";

  const [reservations, setReservations] = useState(initialReservations);
  const [events, setEvents] = useState(initialEvents);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(eventIdFromUrl);
  useEffect(() => {
    setSelectedEvent(eventIdFromUrl);
  }, [eventIdFromUrl]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function isTableReserved(table) {
    const chosenEvent = events.find((e) => String(e.id) === selectedEvent);
    if (!chosenEvent) return false;
    const eventDate = new Date(chosenEvent.date).toDateString();
    return reservations.some((r) => r.table === table && new Date(r.date).toDateString() === eventDate);
  }

  function isTableReservedAnyDate(table) {
    return reservations.some((r) => r.table === table);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(e.target);
    const chosenEvent = events.find((ev) => String(ev.id) === selectedEvent);

    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      guests: formData.get("guests"),
      phone: formData.get("phone"),
      content: formData.get("content"),
      eventId: selectedEvent,
      table: selectedTable,
    };

    const result = reservationSchema.safeParse(rawData);

    if (!result.success) {
      setError("Please fill in all the required information.");
      return;
    }

    if (!chosenEvent) {
      setError("Please select an alternative evening.");
      return;
    }

    if (isTableReserved(selectedTable)) {
      setError("This table has already been reserved for the chosen date.");
      return;
    }

    try {
      await createReservation({
        ...result.data,
        eventId: Number(selectedEvent),
        date: chosenEvent.date,
      });

      setReservations((prev) => [...prev, { ...result.data, date: chosenEvent.date }]);
      setSuccess("Dit bord er reserveret!");
      e.target.reset();
      setSelectedTable("");
      setSelectedEvent("");
    } catch {
      setError("Something went wrong. Please try again later.");
    }
  }

  return (
    <div className="min-h-screen text-[var(--headlines)]">
      {/* HERO */}
      <div
        className="relative h-64 md:h-80 flex items-center justify-center text-[var(--headlines)]"
        style={{
          backgroundImage: "url('/assets/bg/footerbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[var(--background)]/85"></div>
        <h1 className="relative text-[32px] md:text-[38px] font-bold z-10 bg-[url('/assets/bottom_line.png')] bg-bottom bg-no-repeat pb-2 [background-size:140%_18px]">BOOK BORD</h1>
      </div>
      <div className="md:px-24 py-10">
        {/* TABLES */}
        <div className="  grid  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 p-4 sm:p-10">
          {TABLES.map(({ id, img }) => {
            const reserved = isTableReserved(id);
            const reservedAnyDate = isTableReservedAnyDate(id);
            const isSelected = selectedTable === id;

            return (
              <div key={id} className="relative h-50 flex items-center justify-center">
                <button disabled={reserved} onClick={() => setSelectedTable(id)} className={`relative ${isSelected ? "ring-2 ring-pink-500" : ""}`}>
                  <img src={`/assets/table/${img}.png`} alt={`Bord ${id}`} className="cursor-pointer" />

                  {reserved && (
                    <div className="absolute inset-0 bg-red-900/70 flex items-center justify-center">
                      <span className="text-[var(--headlines)] font-bold text-lg">Booked</span>
                    </div>
                  )}

                  {!reserved && reservedAnyDate && (
                    <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center">
                      <span className="text-[var(--headlines)] font-bold text-sm xl:text-lg mt-10">Partly occupied</span>
                    </div>
                  )}

                  <p className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${reserved ? "text-transparent" : "text-[var(--headlines)]"}`}>{id}</p>
                </button>
              </div>
            );
          })}
        </div>

        {/* FORM */}
        <div className="gap-6 p-10">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid md:grid-cols-2 grid-cols-1  gap-4">
              <input name="name" placeholder="Your Name" required minLength={2} maxLength={50} className="p-3 bg-[var(--background)] border w-full" />
              <input name="email" type="email" required placeholder="Your Email" className="p-3 bg-[var(--background)] border w-full" />
              <input name="table" value={selectedTable ?? ""} readOnly placeholder="Table Number" className="p-3 bg-[var(--background)] border w-full" />
              <input name="guests" placeholder="Number of Guests" type="text" min="1" max="12" className="p-3 bg-[var(--background)] border w-full" />
              <select name="event" value={selectedEvent ?? ""} onChange={(e) => setSelectedEvent(e.target.value)} className="p-3 bg-[var(--background)] border w-full text-[var(--headlines)]">
                <option value="">Choose Night</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
              <input name="phone" placeholder="Your Contact Number" pattern="[0-9\s+]+" required className="p-3 bg-[var(--background)] border w-full" />
            </div>

            <textarea name="content" placeholder="Your Comment" className="h-[15rem] p-3 bg-[var(--background)] border border-[var(--headlines)] w-full resize-none" />

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <div className="flex justify-end">
              <button className="text-[var(--headlines)] px-10 py-2 border-y-2 border-[var(--headlines)] w-fit">Reserver</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
