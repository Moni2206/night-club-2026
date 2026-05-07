import Link from "next/link";

const Button = ({ slug }) => {
  return (
    <div className="flex justify-center mt-4">
      <Link href={`/events/${slug}`}>
        <button className="text-white px-4 py-2 border-y-2 border-white w-fit">Book Now</button>
      </Link>
    </div>
  );
};

export default Button;
