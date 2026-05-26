"use client";
import { useState } from "react";
import Button from "../events/Button";

const BASE_URL = "https://night-club-th9v.onrender.com";

export default function Sektion7() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsError(true);
      setMessage("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/newsletters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setIsError(false);
        setMessage("You have successfully subscribed!");
        setEmail("");
      } else if (res.status === 409) {
        setIsError(true);
        setMessage("This email is already subscribed.");
      } else {
        setIsError(true);
        setMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setIsError(true);
      setMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative mt-20 px-6 md:px-16">
      <div className="text-center mb-10">
        <h2 className="text-[18px] md:text-[24px] font-bold pb-2">WANT THE LATEST NIGHT CLUB NEWS</h2>
        <p className="text-[var(--headlines)] mt-4 pr-12">
          Subscribe to our newsletter and never miss an <span className="  text-[var(--pink)]">Event</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col gap-6">
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          className="w-full bg-transparent border-b border-[var(--headlines)] py-4 px-2 text-[var(--headlines)] outline-none placeholder:text-[var(--headlines)]  focus:border-[var(--pink)] transition"
        />

        {message && <p className={`text-center text-sm ${isError ? "text-red-400" : "text-green-400"}`}>{message}</p>}

        <div className="flex justify-center md:justify-end">
          <Button onClick={handleSubmit}>{loading ? "Sending..." : "Subscribe"}</Button>
        </div>
      </form>
    </section>
  );
}
