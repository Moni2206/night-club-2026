// Gallery.jsx (SERVER COMPONENT - ingen "use client")

import GalleryClient from "./GalleryClient";

const BASE_URL = "https://night-club-th9v.onrender.com";

async function getGallery() {
  const res = await fetch(`${BASE_URL}/gallery`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}

export default async function Gallery() {
  const images = await getGallery();

  return <GalleryClient images={images} />;
}
