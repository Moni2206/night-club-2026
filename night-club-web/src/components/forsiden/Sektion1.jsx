import { FaConciergeBell } from "react-icons/fa";
import { FaChampagneGlasses } from "react-icons/fa6";

const cards = [
  {
    title: "Night Club",
    icon: "/assets/icon/favicon.png",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    img: "/assets/content-img/reastaurant_1.jpg",
  },
  {
    title: "Restaurant",
    icon: FaConciergeBell,
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.",
    img: "/assets/content-img/thumb1.jpg",
  },
  {
    title: "Bar",
    icon: FaChampagneGlasses,
    text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin.",
    img: "/assets/content-img/thumb2.jpg",
  },
];

const Sektion1 = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.title} className="relative overflow-hidden group h-[500px]">
            <img src={card.img} alt={card.title} className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-[var(--background)] opacity-0 group-hover:opacity-100 transition-all duration-[1500ms]" />

            <div className="absolute top-0 left-[-100%] w-full h-[2px] bg-[var(--pink)] group-hover:left-0 transition-all duration-[1500ms]" />
            <div className="absolute bottom-0 right-[-100%] w-full h-[2px] bg-[var(--pink)] group-hover:right-0 transition-all duration-[1500ms]" />

            <div className="absolute top-0 left-0 w-20 h-20 bg-[var(--pink)] [clip-path:polygon(0_0,100%_0,0_100%)] opacity-0 group-hover:opacity-100 transition-all duration-[1500ms]" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-[var(--pink)] [clip-path:polygon(100%_0,100%_100%,0_100%)] opacity-0 group-hover:opacity-100 transition-all duration-[1500ms]" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 opacity-0 group-hover:opacity-100 transition-all duration-[1500ms]">
              <div className="border-2 border-[var(--pink)] p-6 mb-6">{typeof card.icon === "string" ? <img src={card.icon} alt={card.title} className="w-[50px] h-[50px] object-contain" /> : <Icon size={50} className="text-[var(--pink)]" />}</div>

              <h3 className="text-[ var(--headlines)] text-2xl font-bold mb-6">{card.title}</h3>

              <p className="text-[var(--text)] text-base leading-8 opacity-0 translate-x-20 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[1500ms] delay-300">{card.text}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Sektion1;
