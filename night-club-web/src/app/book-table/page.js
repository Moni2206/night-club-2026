"use client";

import { useEffect, useState } from "react";

const BASE_URL = "https://night-club-th9v.onrender.com";

export default function Home() {
  const [selectedTable, setSelectedTable] = useState("");
  const [reservations, setReservations] = useState([]);
  const [events, setEvents] = useState([]);

  // LOAD RESERVATIONS
  useEffect(() => {
    async function loadReservations() {
      const res = await fetch(`${BASE_URL}/reservations`);

      const data = await res.json();

      setReservations(data);
    }

    loadReservations();
  }, []);

  // LOAD EVENTS
  useEffect(() => {
    async function loadEvents() {
      const res = await fetch(`${BASE_URL}/events`);

      const data = await res.json();

      setEvents(data);
    }

    loadEvents();
  }, []);

  // CHECK IF TABLE IS RESERVED
  function isTableReserved(tableNumber) {
    return reservations.some((reservation) => reservation.table === tableNumber);
  }

  // SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();

    if (isTableReserved(selectedTable)) {
      alert("Dette bord er allerede reserveret");
      return;
    }

    const formData = new FormData(e.target);

    const reservation = {
      name: formData.get("name"),
      email: formData.get("email"),
      table: selectedTable,
      guests: formData.get("guests"),
      date: formData.get("date"),
      phone: formData.get("phone"),
      eventId: formData.get("event"),
    };

    const res = await fetch(`${BASE_URL}/reservations`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(reservation),
    });

    if (!res.ok) {
      alert("The table was not available to book.");
      return;
    }

    alert("Reservation gennemført!");

    const updatedReservations = await fetch(`${BASE_URL}/reservations`);

    const updatedData = await updatedReservations.json();

    setReservations(updatedData);

    e.target.reset();
    setSelectedTable("");
  }

  return (
    <div className="min-h-screen min-w-screen text-white flex justify-center">
      <div className="w-full max-w-7xl px-6 md:px-16">
        {/* HERO */}
        <div
          className="relative h-50 flex items-center justify-center"
          style={{
            backgroundImage: "url('/assets/bg/footerbg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/85"></div>

          <h1 className="relative text-[32px] md:text-[38px] font-bold z-10 bg-[url('/assets/bottom_line.png')] bg-bottom bg-no-repeat pb-2 [background-size:140%_18px]">Book Table</h1>
        </div>

        {/* TABLES */}
        <div className="grid grid-cols-5 gap-6 p-10">
          {/* TABLE 1 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("1")} onClick={() => setSelectedTable("1")} className="relative">
              <img src="/assets/table/table_1.png" alt="Table 1" className={`cursor-pointer ${isTableReserved("1") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">1</p>
            </button>
          </div>

          {/* TABLE 2 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("2")} onClick={() => setSelectedTable("2")} className="relative">
              <img src="/assets/table/table_1.png" alt="Table 2" className={`cursor-pointer ${isTableReserved("2") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">2</p>
            </button>
          </div>

          {/* TABLE 3 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("3")} onClick={() => setSelectedTable("3")} className="relative">
              <img src="/assets/table/table_2.png" alt="Table 3" className={`cursor-pointer ${isTableReserved("3") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">3</p>
            </button>
          </div>

          {/* TABLE 4 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("4")} onClick={() => setSelectedTable("4")} className="relative">
              <img src="/assets/table/table_1.png" alt="Table 4" className={`cursor-pointer ${isTableReserved("4") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">4</p>
            </button>
          </div>

          {/* TABLE 5 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("5")} onClick={() => setSelectedTable("5")} className="relative">
              <img src="/assets/table/table_3.png" alt="Table 5" className={`cursor-pointer ${isTableReserved("5") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">5</p>
            </button>
          </div>

          {/* TABLE 6 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("6")} onClick={() => setSelectedTable("6")} className="relative">
              <img src="/assets/table/table_1.png" alt="Table 6" className={`cursor-pointer ${isTableReserved("6") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">6</p>
            </button>
          </div>

          {/* TABLE 7 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("7")} onClick={() => setSelectedTable("7")} className="relative">
              <img src="/assets/table/table_1.png" alt="Table 7" className={`cursor-pointer ${isTableReserved("7") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">7</p>
            </button>
          </div>

          {/* TABLE 8 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("8")} onClick={() => setSelectedTable("8")} className="relative">
              <img src="/assets/table/table_2.png" alt="Table 8" className={`cursor-pointer ${isTableReserved("8") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">8</p>
            </button>
          </div>

          {/* TABLE 9 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("9")} onClick={() => setSelectedTable("9")} className="relative">
              <img src="/assets/table/table_1.png" alt="Table 9" className={`cursor-pointer ${isTableReserved("9") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">9</p>
            </button>
          </div>

          {/* TABLE 10 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("10")} onClick={() => setSelectedTable("10")} className="relative">
              <img src="/assets/table/table_3.png" alt="Table 10" className={`cursor-pointer ${isTableReserved("10") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">10</p>
            </button>
          </div>

          {/* TABLE 11 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("11")} onClick={() => setSelectedTable("11")} className="relative">
              <img src="/assets/table/table_1.png" alt="Table 11" className={`cursor-pointer ${isTableReserved("11") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">11</p>
            </button>
          </div>

          {/* TABLE 12 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("12")} onClick={() => setSelectedTable("12")} className="relative">
              <img src="/assets/table/table_1.png" alt="Table 12" className={`cursor-pointer ${isTableReserved("12") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">12</p>
            </button>
          </div>

          {/* TABLE 13 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("13")} onClick={() => setSelectedTable("13")} className="relative">
              <img src="/assets/table/table_2.png" alt="Table 13" className={`cursor-pointer ${isTableReserved("13") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">13</p>
            </button>
          </div>

          {/* TABLE 14 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("14")} onClick={() => setSelectedTable("14")} className="relative">
              <img src="/assets/table/table_1.png" alt="Table 14" className={`cursor-pointer ${isTableReserved("14") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">14</p>
            </button>
          </div>

          {/* TABLE 15 */}
          <div className="relative h-50 flex items-center justify-center">
            <button disabled={isTableReserved("15")} onClick={() => setSelectedTable("15")} className="relative">
              <img src="/assets/table/table_3.png" alt="Table 15" className={`cursor-pointer ${isTableReserved("15") ? "opacity-30" : ""}`} />

              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">15</p>
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="gap-6 p-10">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <input name="name" placeholder="Your Name" className="p-3 bg-black border w-full" />

              <input name="email" type="email" placeholder="Your Email" className="p-3 bg-black border w-full" />

              <input value={selectedTable} readOnly placeholder="Table Number" className="p-3 bg-black border w-full" />

              <input name="guests" placeholder="Number of Guests" className="p-3 bg-black border w-full" />

              <select name="event" className="p-3 bg-black border w-full text-white">
                <option value="">Choose Night</option>

                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>

              <input name="phone" placeholder="Your Contact Number" className="p-3 bg-black border w-full" />
            </div>

            <textarea name="content" placeholder="Your Comment" className="pb-58 bg-black border border-white"></textarea>

            <div className="flex justify-end">
              <button className="text-white px-10 py-2 border-y-2 border-white w-fit">Reserve</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
