import Button from "./Button";
import Link from "next/link";

const BASE_URL = "https://night-club-th9v.onrender.com";

async function EventList({ page = 1 }) {
  const limit = 3;

  const res = await fetch(`${BASE_URL}/events`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Kunne ikke hente events");

  const allEvents = await res.json();

  // SORTER (vigtigt for stabil pagination)
  const sortedEvents = allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  // PAGINATION LOGIK
  const start = (page - 1) * limit;
  const events = sortedEvents.slice(start, start + limit);

  const totalPages = Math.ceil(allEvents.length / limit);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.slug}`}>
            <div className="cursor-pointer">
              <img src={`${BASE_URL}${event.asset.url}`} alt={event.asset.alt} className="mb-3 w-full h-full object-cover" />

              <div className="p-10">
                <h2 className="text-xl font-bold">{event.title}</h2>

                <div className="flex items-center gap-4 mt-1">
                  <p className="text-lg text-pink-500">{new Date(event.date).toLocaleDateString("da-DK")}</p>

                  <p className="text-lg font-bold">{event.location}</p>
                </div>

                <p className="text-sm opacity-70">{event.excerpt}</p>

                <Button slug={event.slug} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center gap-6 text-[ var(--headlines)] justify-center py-10">
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNumber = i + 1;
          <div className="flex items-center gap-6 text-[ var(--headlines)] justify-center py-10">
            <a key={pageNumber} href={`?page=${pageNumber}`} className={`cursor-pointer ${page === pageNumber ? "border-b-2 border-[ var(--headlines)]" : "opacity-50"}`}>
              {pageNumber}1
            </a>
            <a key={pageNumber} href={`?page=${pageNumber}`} className={`cursor-pointer ${page === pageNumber ? "border-b-2 border-[ var(--headlines)]" : "opacity-50"}`}>
              {pageNumber}2
            </a>
            <a key={pageNumber} href={`?page=${pageNumber}`} className={`cursor-pointer ${page === pageNumber ? "border-b-2 border-[ var(--headlines)]" : "opacity-50"}`}>
              {pageNumber}3
            </a>
          </div>;
          return (
            <a key={pageNumber} href={`?page=${pageNumber}`} className={`cursor-pointer ${page === pageNumber ? "border-b-2 border-[ var(--headlines)]" : "opacity-50"}`}>
              {pageNumber}
            </a>
          );
        })}

        <a href={`?page=${page + 1}`} className="opacity-50 hover:opacity-100">
          næste →
        </a>
      </div>
    </>
  );
}

export default EventList;
