import { prisma } from "src/lib/prisma";
import { getUtils } from "src/lib/utils";

const Announcements = async () => {
  const { role, userId } = await getUtils();

  // the given code has an issue
  // when the user is an admin, the query will not return any data other than the ones with classId as null because of class: {}, so it is better to remove the admin from the roleConditions and specify a different case for the admin
  // const roleConditions = {
  //   admin: {},
  //   teacher: { lessons: { some: { teacherId: userId! } } },
  //   student: { students: { some: { id: userId! } } },
  //   parent: { students: { some: { parentId: userId! } } },
  // };

  // const data = await prisma.announcement.findMany({
  //   where: {
  //     OR: [
  //       {classId: null},
  //       {class: roleConditions[role as keyof typeof roleConditions] || {}}
  //     ]
  //   }
  // });

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  // it is necessary to put {} after the where condition, hence we have to use the role !== "admin" condition with the destructuring of the roleConditions object
  // In the case of the admin, we will basically get all the announcements by not applying any condition
  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: {
      date: "desc",
    },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  return (
    <div className="rounded-xl bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <p className="text-sm text-gray-300">View All</p>
      </div>
      {/* ANNOUNCEMENT CARDS */}
      <div className="mt-4 flex flex-col gap-4">
        {/* CARD 1 */}
        {data[0] && (
          <div className="rounded-md border-2 border-lamaSky bg-white p-4">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{data[0].title}</h1>
              <h4 className="text-sm text-gray-400">
                {data[0].date.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </h4>
            </div>
            <div className="mt-2 text-sm text-gray-300">
              {data[0].description}
            </div>
          </div>
        )}
        {/* CARD 2 */}
        {data[1] && (
          <div className="rounded-md border-2 border-lamaYellow bg-white p-4">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{data[1].title}</h1>
              <h4 className="text-sm text-gray-400">
                {data[1].date.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </h4>
            </div>
            <div className="mt-2 text-sm text-gray-300">
              {data[1].description}
            </div>
          </div>
        )}
        {/* CARD 3 */}
        {data[2] && (
          <div className="rounded-md border-2 border-lamaPurple bg-white p-4">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{data[2].title}</h1>
              <h4 className="text-sm text-gray-400">
                {data[2].date.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </h4>
            </div>
            <div className="mt-2 text-sm text-gray-300">
              {data[2].description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
