import Comments from "@/components/events/Comments";
const BASE_URL = "https://night-club-th9v.onrender.com";

export default async function EventPage({ params }) {
  const { slug } = await params;

  const res = await fetch(`${BASE_URL}/events`, {
    cache: "no-store",
  });

  const events = await res.json();

  const event = events.find((e) => e.slug === slug);

  if (!event) return <p>Event Not found </p>;

  return (
    <div>
      <div className="text-white p-10">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <img src={`${BASE_URL}${event.asset.url}`} />

        <p>{event.description}</p>
        <p>{event.location}</p>
      </div>
      <Comments eventId={event.id} />
    </div>
  );
}
