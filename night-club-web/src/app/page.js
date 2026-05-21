import Hero from "@/components/forsiden/Hero";
import Navbar from "../components/Navbar";
import Sektion1 from "@/components/forsiden/Sektion1";
import ForsideEventList from "@/components/forsiden/EventListCopy";
import Sektion3 from "@/components/forsiden/Sektion3";

export default async function Page({ searchParams }) {
  const params = await searchParams;

  const page = Number(params?.page || 1);

  return (
    <main className="max-w-screen-2xl mx-auto">
      <Hero />

      <div className="left-0 w-full">
        <Navbar />
      </div>

      <section className="relative md:px-30 py-10">
        <h2 className="relative mt-8 text-[32px] text-center md:text-[38px] font-bold z-10 bg-[url('/assets/bottom_line.png')] bg-bottom bg-no-repeat pb-2 [background-size:140%_18px]">WELCOME IN NIGHTCLUB</h2>

        <Sektion1 />

        <ForsideEventList />
      </section>
      <Sektion3 />
    </main>
  );
}
