import Image from "next/image";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-32">
      <div className="flex items-center justify-between">
        <span className="text-xs text-green-600 bg-white rounded-full px-2 py-1">
          05/2020
        </span>
        <Image src="/more.png" alt="more" width={20} height={20} />
      </div>
      <h1 className="font-semibold my-4 text-2xl">4536</h1>
      <h2 className="font-medium text-sm text-gray-500 capitalize">{type}s</h2>
    </div>
  );
};

export default UserCard;
