"use server";

const BASE_URL = "https://night-club-th9v.onrender.com";

export async function createReservation(data) {
  const res = await fetch(`${BASE_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Reservation failed");
  }

  return res.json();
}
