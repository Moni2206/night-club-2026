import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full max-w-7xl px-6 md:px-16">
      {/* HERO */}
      <div
        className="relative h-50 flex items-center justify-center"
        style={{
          backgroundImage: "url('/assets/bg/footerbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/85"></div>

        <h1 className="relative text-[32px] md:text-[38px] font-bold z-10 bg-[url('/assets/bottom_line.png')] bg-bottom bg-no-repeat pb-2 [background-size:140%_18px]">HOME</h1>
      </div>
    </div>
  );
}
