import Button from "./Button";
import Link from "next/link";

const BASE_URL = "https://night-club-th9v.onrender.com";

async function EventList({ page = 1 }) {
  const limit = 3;

  const res = await fetch(`${BASE_URL}/events`, { cache: "no-store" });
  if (!res.ok) throw new Error("Kunne ikke hente events");

  const allEvents = await res.json();
  const sortedEvents = allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  const start = (page - 1) * limit;
  const events = sortedEvents.slice(start, start + limit);
  const totalPages = Math.ceil(allEvents.length / limit);

  return (
    <>
      <div className="flex flex-col">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={event.id} className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? "" : "lg:[direction:rtl]"}`}>
              {/* BILLEDE */}
              <div className="md:[direction:ltr] overflow-hidden h-[300px] md:h-[400px]">
                <img src={`${BASE_URL}${event.heroAsset.url}`} alt={event.heroAsset.alt} className="w-full h-full object-cover" />
              </div>

              {/* TEKST */}
              <div className="md:[direction:ltr] p-4 flex flex-col justify-end">
                <h2 className="text-xl font-bold mb-2 uppercase">{event.title}</h2>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[var(--pink)] text-sm">
                    {new Date(event.date).toLocaleDateString("da-DK", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    ·{" "}
                    {new Date(event.date).toLocaleTimeString("da-DK", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="text-[var(--headlines)]/40">|</span>
                  <span className="text-[var(--headlines)] text-sm uppercase">{event.location}</span>
                </div>

                <p className="text-sm opacity-70 mb-20 p-2  ">{event.description}</p>

                <Button href={`/events/${event.slug}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-6 py-10 text-[var(--headlines)]">
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNumber = i + 1;
          return (
            <a key={pageNumber} href={`?page=${pageNumber}`} className={`text-sm transition hover:text-[var(--pink)] ${page === pageNumber ? "text-[var(--headlines)] border-b border-[var(--headlines)]" : "opacity-50"}`}>
              {pageNumber}
            </a>
          );
        })}

        {page < totalPages && (
          <a href={`?page=${page + 1}`} className="text-sm opacity-50 hover:opacity-100 hover:text-[var(--pink)] transition">
            næste →
          </a>
        )}
      </div>
    </>
  );
}

export default EventList;
