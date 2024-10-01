export default function Button({ type }: { type: string }) {
  switch (type) {
    case "primary":
      return (
        <button className="font-bold rounded-lg text-md  w-40 h-10 bg-[#2471ec] text-[#ffffff] justify-center">
          Primary
        </button>
      );
    case "active":
      return (
        <button className="font-bold rounded-lg text-md  w-40 h-10 bg-[#18c661] text-[#ffffff] justify-center">
          Active
        </button>
      );
    default:
      return (
        <button className="font-bold rounded-lg text-md  w-40 h-10 bg-[#374151] text-[#ffffff] justify-center">
          Default
        </button>
      );
  }
}
