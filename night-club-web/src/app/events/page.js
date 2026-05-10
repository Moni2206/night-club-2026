import { Suspense } from "react";
import EventList from "@/components/events/EventList";

export default async function EventsPage({ searchParams }) {
  const page = Number((await searchParams)?.page || 1);
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <div
        className="relative h-50 flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/assets/bg/footerbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/85"></div>

        <h1 className="relative text-[32px] md:text-[38px] font-bold z-10 bg-[url('/assets/bottom_line.png')] bg-bottom bg-no-repeat pb-2 [background-size:140%_18px]">Events</h1>
      </div>

      {/* EVENTS */}
      <div className="md:px-24 py-10">
        <Suspense fallback={<p className="text-white">Fetching data...</p>}>
          <EventList page={page} />
        </Suspense>
      </div>
    </div>
  );
}
