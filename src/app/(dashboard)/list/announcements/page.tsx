import { Announcement, Class, Prisma } from "@prisma/client";
import Image from "next/image";
import FormModal from "src/components/FormModal";
import Pagination from "src/components/Pagination";
import ReusableTable from "src/components/ReusableTable";
import TableSearch from "src/components/TableSearch";
import { prisma } from "src/lib/prisma";
import { ITEM_PER_PAGE } from "src/lib/settings";
import { getUtils } from "src/lib/utils";

type AnnouncementList = Announcement & { class: Class };

const AnnouncementsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page = "1", ...queryParams } = searchParams || {};
  const currentPage = parseInt(page);

  const query: Prisma.AnnouncementWhereInput = {};
  const role = (await getUtils()).role;
  const currentUserId = (await getUtils()).userId;

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
      className: `${role === "admin" || role === "teacher" ? "" : "hidden"}`,
    },
  ];

  const renderRow = async (item: AnnouncementList) => {
    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-lamaPurpleLight"
      >
        <td className="flex items-center gap-4 p-4 font-semibold">
          {item.title}
        </td>
        <td className="">{item.class?.name || "-" }</td>
        <td className="hidden md:table-cell">
          {new Intl.DateTimeFormat("en-US").format(item.date || "")}
        </td>
        <td>
          <div className="flex items-center gap-2">
            {(role === "admin" || role === "teacher") && (
              <>
                <FormModal table="announcement" type="update" data={item} />
                <FormModal table="announcement" type="delete" data={item.id} />
              </>
            )}
          </div>
        </td>
      </tr>
    );
  };

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }
  // Role Conditions
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: currentUserId! } } },
    student: { students: { some: { id: currentUserId! } } },
    parent: { students: { some: { parentId: currentUserId! } } },
  };
  query.OR = [
    { classId: null },
    {
      class: roleConditions[role as keyof typeof roleConditions] || {},
    },
  ];

  const [data, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: { select: { name: true } },
      },
      orderBy: { id: "asc" },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (currentPage - 1),
    }),
    prisma.announcement.count({
      where: query,
    }),
  ]);

  return (
    <div className="m-4 mt-0 flex-1 rounded-lg bg-white p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">
          All Announcements
        </h1>
        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flex items-center justify-end gap-4 self-end">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="/" width={14} height={14} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="/" width={14} height={14} />
            </button>
            <FormModal table="announcement" type="create" />
          </div>
        </div>
      </div>
      {/* LIST */}
      <ReusableTable columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={currentPage} count={count} />
    </div>
  );
};

export default AnnouncementsListPage;
