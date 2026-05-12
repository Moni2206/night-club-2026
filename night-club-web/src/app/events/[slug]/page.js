import Comments from "@/components/events/Comments";
import Link from "next/link";

const BASE_URL = "https://night-club-th9v.onrender.com";
export default async function EventPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const res = await fetch(`${BASE_URL}/events`, {
    cache: "no-store",
  });

  const events = await res.json();

  const event = events.find((e) => e.slug === slug);

  if (!event) return <p>Event Not found</p>;

  return (
    <div>
      <div className="text-white p-10">
        {/* HERO IMAGE */}
        <img src={`${BASE_URL}${event.heroAsset.url}`} alt={event.heroAsset.alt} className="w-full h-[500px] object-cover rounded-[30px] border-4 border-pink-500 mb-10" />

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] mt-10 gap-10">
          {/* LEFT SIDE */}
          <div>
            <h3 className="text-3xl font-bold mb-6">
              {event.title} {new Date(event.date).toLocaleDateString("da-DK")}
            </h3>

            <p className="text-base mb-10">
              <span className="text-pink-500 font-bold">Sted</span> {event.location}
            </p>

            {/* TIME INFO */}
            <div className="border-t border-b border-pink-500 py-8 space-y-6">
              <p className="text-base">
                <span className="text-pink-500 font-bold">Doors open:</span>{" "}
                {new Date(event.doorsOpen).toLocaleTimeString("da-DK", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <p className="text-base">
                <span className="text-pink-500 font-bold">Starttidspunkt:</span>{" "}
                {new Date(event.date).toLocaleTimeString("da-DK", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* SCHEDULE */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-pink-500 mb-6">Schedule</h2>

              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="text-base">
                    <p>
                      - {item.time} {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* BUTTON */}
            <div className="mt-8">
              <Link href={`/book-table?event=${event.id}`} className="border-y-2 border-white px-12 py-3 text-base uppercase w-full block text-center">
                Book Now
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="border-l-0 md:border-l-4 border-pink-500 pl-0 md:pl-10">
            <div className="grid grid-cols-2 gap-8 mb-5">
              <div>
                {/* PRICE */}
                <div>
                  <p className="text-pink-500 text-base font-bold">Price</p>

                  <p className="text-base">{event.price}</p>
                </div>
                {/* AGE */}
                <div>
                  <p className="text-pink-500 text-base font-bold">AgeLimit</p>

                  <p className="text-base">{event.ageLimit}</p>
                </div>

                {/* CATEGORY */}
                <div>
                  <p className="text-pink-500 text-base font-bold">kategori</p>

                  <p className="text-base">{event.category}</p>
                </div>
              </div>
              {/* LINEUP */}
              <div>
                <h2 className="text-pink-500 text-base font-bold mb-2">Lineup</h2>

                {event.lineup.map((artist, index) => (
                  <p key={index} className="text-base">
                    {artist}
                  </p>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h2 className="text-pink-500 text-xl font-bold mb-4">Description</h2>

              <p className="whitespace-pre-line text-base">{event.content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* COMMENTS */}
      <Comments eventId={event.id} />
    </div>
  );
}
