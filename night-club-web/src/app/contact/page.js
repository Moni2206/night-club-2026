import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <div
        className="relative h-50 flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/assets/bg/footerbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/85"></div>

        <h1 className="relative text-[32px] md:text-[38px] font-bold z-10 bg-[url('/assets/bottom_line.png')] bg-bottom bg-no-repeat pb-2 [background-size:140%_18px]">Contact Us</h1>
      </div>
    </div>
  );
}
