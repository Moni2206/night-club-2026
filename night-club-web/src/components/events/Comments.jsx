const BASE_URL = "https://night-club-th9v.onrender.com";

const Comments = async ({ eventId }) => {
  const res = await fetch(`${BASE_URL}/comments`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Kunne ikke hente comments");

  const comments = await res.json();

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h2 className="text-xl font-bold">{comment.name} </h2>
          <p className="text-xl text[#FF2A70] opacity-70">{comment.date}</p>
          <p className="text-sm opacity-70">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
