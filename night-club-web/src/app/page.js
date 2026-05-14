import Image from "next/image";
import Hero from "@/components/forsiden/Hero";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="absolute bottom-0 left-0 w-full">
        <Navbar />
      </div>
    </div>
  );
}
