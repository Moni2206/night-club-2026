import EventSlider from "./EventSlider";

const BASE_URL = "https://night-club-th9v.onrender.com";

async function getEvents() {
  try {
    const res = await fetch(`${BASE_URL}/events`, { cache: "no-store" });

    if (!res.ok) throw new Error(`Status: ${res.status}`);

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("API returnerede ikke JSON");
    }

    const events = await res.json();
    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
  } catch (error) {
    console.error("Fejl ved hentning af events:", error.message);
    return [];
  }
}

export default async function ForsideEventList() {
  const allEvents = await getEvents();

  if (allEvents.length === 0) {
    return (
      <section id="events" className="py-20 text-center text-white">
        <p>Kunne ikke hente events lige nu. Prøv at genopfriske siden om et øjeblik.</p>
      </section>
    );
  }

  return (
    <section id="events" className="py-20 max-w-6xl mx-auto px-4 overflow-hidden">
      <div className="text-center mb-16 px-6">
        <h2 className="text-[32px] md:text-[38px] font-bold bg-[url('/assets/bottom_line.png')] bg-bottom bg-no-repeat pb-2 [background-size:140%_18px]">FEATURED EVENTS</h2>
      </div>

      <EventSlider initialEvents={allEvents} baseUrl={BASE_URL} />
    </section>
  );
}
