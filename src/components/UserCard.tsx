import Image from "next/image";
import { prisma } from "src/lib/prisma";

type UserType = "admin" | "teacher" | "student" | "parent";

const UserCard = async ({ type }: { type: UserType }) => {

  // The modelMapper object associates each user type with its respective Prisma model.
  // The count method is called on the selected model to get the number of users of the specified type.
  // Using Record to define the type of an object with fixed keys ("admin", "teacher", etc.) and fixed value types 
  const modelMapper: Record<UserType, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const data = await modelMapper[type].count();
  
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-32">
      <div className="flex items-center justify-between">
        <span className="text-xs text-green-600 bg-white rounded-full px-2 py-1">
          05/2020
        </span>
        <Image src="/more.png" alt="more" width={20} height={20} />
      </div>
      <h1 className="font-semibold my-4 text-2xl">{data}</h1>
      <h2 className="font-medium text-sm text-gray-500 capitalize">{type}s</h2>
    </div>
  );
};

export default UserCard;
