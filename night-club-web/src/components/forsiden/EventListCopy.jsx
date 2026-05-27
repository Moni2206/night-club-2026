import EventSlider from "./EventSlider";

const BASE_URL = "https://night-club-th9v.onrender.com";

async function getEvents() {
  try {
    const res = await fetch(`${BASE_URL}/events`, { cache: "no-store" });

    if (!res.ok) throw new Error(`Status: ${res.status}`);

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("API did not return JSON");
    }

    const events = await res.json();
    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
  } catch (error) {
    console.error("Error fetching events:", error.message);
    return [];
  }
}

export default async function ForsideEventList() {
  const allEvents = await getEvents();

  if (allEvents.length === 0) {
    return (
      <section id="events" className="py-20 text-center text-[var(--headlines)]">
        <p>Unable to load events at the moment. Please refresh the page in a moment.</p>
      </section>
    );
  }

  return (
    <section id="events" className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/bg/slider_bg_overlay.png')] bg-cover bg-center" />

      {/* Dark overlay  */}
      <div className="absolute inset-0 bg-[var(--background)]/50" />
      <div className="relative z-10 py-20 max-w-6xl mx-auto px-4 overflow-hidden">
        <div className="text-center mb-16 px-6 ">
          <h2 className="text-[32px] md:text-[38px] font-bold bg-[url('/assets/bottom_line.png')] bg-bottom bg-no-repeat pb-2 [background-size:140%_18px]">FEATURED EVENTS</h2>
        </div>

        <EventSlider initialEvents={allEvents} baseUrl={BASE_URL} />
      </div>
    </section>
  );
}
