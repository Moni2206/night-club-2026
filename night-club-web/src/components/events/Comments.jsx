import { revalidatePath } from "next/cache";

const BASE_URL = "https://night-club-th9v.onrender.com";

const Comments = async ({ eventId }) => {
  async function createComment(formData) {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");
    const content = formData.get("content");

    await fetch(`${BASE_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        eventId,
        name,
        email,
        content,
        date: new Date().toISOString(),
      }),
    });

    revalidatePath(`/events`);
  }

  const res = await fetch(`${BASE_URL}/comments?eventId=${eventId}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Kunne ikke hente comments");

  const comments = await res.json();

  return (
    <div className="text-white p-10">
      {comments.map((comment) => (
        <div key={comment.id} className="mb-6">
          <h2 className="text-xl font-bold">{comment.name}</h2>

          <p className="text-pink-500 opacity-70">{new Date(comment.date).toLocaleDateString("da-DK")}</p>

          <p className="text-sm opacity-70">{comment.content}</p>
        </div>
      ))}

      <h2 className=" text-4xl text-white">Leave a comment</h2>

      <form action={createComment} className="mt-10 flex flex-col gap-4">
        <div className="flex gap-4">
          <input type="text" name="name" placeholder="Your Name" className="p-3 bg-black border border-white w-full" />

          <input type="email" name="email" placeholder="Your Email" className="p-3 bg-black border border-white w-full" />
        </div>

        <textarea name="content" placeholder="Your Comment" className="pb-58 bg-black border border-white"></textarea>

        <div className="flex justify-end">
          <button className="text-white px-10 py-2 border-y-2 border-white w-fit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
