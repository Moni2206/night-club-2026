"use client";
import Navbar from "../../components/Navbar";

import { useState } from "react";

const BASE_URL = "https://night-club-th9v.onrender.com";

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

    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
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

      if (!res.ok) {
        throw new Error();
      }

      setSuccess("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
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
        className="relative h-64 md:h-80 flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/assets/bg/footerbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/85"></div>

        <h1 className="relative text-[32px] md:text-[38px] font-bold z-10 bg-[url('/assets/bottom_line.png')] bg-bottom bg-no-repeat pb-2 [background-size:140%_18px]">CONTACT US</h1>
      </div>

      {/* FORM */}
      <div className="px-4 md:px-20 xl:px-40 py-10">
        <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="p-3 bg-black border border-white w-full text-white" />

            <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} className="p-3 bg-black border border-white w-full text-white" />
          </div>

          <textarea name="message" placeholder="Your Comment" value={form.message} onChange={handleChange} className="p-3 h-40 bg-black border border-white w-full text-white resize-none" />

          {error && <p>{error}</p>}
          {success && <p>{success}</p>}

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="px-10 py-2 border-y-2 border-white w-fit">
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
