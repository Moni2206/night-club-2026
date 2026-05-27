"use client";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { z } from "zod";

const BASE_URL = "https://night-club-th9v.onrender.com";

/* Zod validation */
const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(5),
});

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    /* client-side validation (Zod) */
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      setError("Please enter a valid name, email and message.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/contact_messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      /*  brugervenlige API-fejl */
      if (res.status === 409) {
        setError("This email has already been used.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess("Your message has been sent successfully!");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <div
        className="relative h-64 md:h-80 flex items-center justify-center text-[var(--headlines)]"
        style={{
          backgroundImage: "url('/assets/bg/footerbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[var(--background)]/85"></div>

        <h1 className="relative text-[32px] md:text-[38px] font-bold z-10 bg-[url('/assets/bottom_line.png')] bg-bottom bg-no-repeat pb-2 [background-size:140%_18px]">CONTACT US</h1>
      </div>

      {/* FORM */}
      <div className="px-6 md:px-45 py-10 max-w-3xl md:max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-4">
            <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} disabled={loading} className="p-3 bg--[var(--background)] border border-[var(--headlines)] w-full text-[var(--headlines)]" />

            <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} disabled={loading} className="p-3 bg--[var(--background)] border border-[var(--headlines)] w-full text-[var(--headlines)]" />
          </div>

          <textarea name="message" placeholder="Your Comment" value={form.message} onChange={handleChange} disabled={loading} className="p-3 h-60 bg--[var(--background)] border border-[var(--headlines)] w-full text-[var(--headlines)] resize-none" />

          {/* FEEDBACK */}
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="px-10 py-2 border-y-2 border-[var(--headlines)] w-fit">
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
