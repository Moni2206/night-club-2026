import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-white dark:bg-black">Home</h1>
      <img src="/assets/bg/header_bg_2.jpg" alt="header" className="h-auto w-auto" />
    </div>
  );
}
