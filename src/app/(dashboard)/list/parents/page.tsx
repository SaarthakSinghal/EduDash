import { Parent, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import FormModal from "src/components/FormModal";
import Pagination from "src/components/Pagination";
import ReusableTable from "src/components/ReusableTable";
import TableSearch from "src/components/TableSearch";
import { prisma } from "src/lib/prisma";
import { ITEM_PER_PAGE } from "src/lib/settings";
import { getUtils } from "src/lib/utils";

type ParentList = Parent & { students: Student[] };

const ParentsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page = "1", ...queryParams } = searchParams || {};
  const currentPage = parseInt(page);

  const query: Prisma.ParentWhereInput = {};
  const role = (await (getUtils())).role;

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student Names",
      accessor: "students",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
      className: `${role === "admin" ? "" : "hidden"}`,
    },
  ];
  
  const renderRow = (item: ParentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {item.students.map((s) => s.name).join(",") || "N/A"}
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="parent" type="update" data={item} />
              <FormModal table="parent" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.parent.findMany({
      where: query,
      include: {
        students: { select: { name: true } },
      },
      orderBy: { id: "asc" },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (currentPage - 1),
    }),
    prisma.parent.count({
      where: query,
    }),
  ]);

  return (
    <div className="m-4 mt-0 flex-1 rounded-lg bg-white p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Parents</h1>
        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flex items-center justify-end gap-4 self-end">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="/" width={14} height={14} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="/" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="parent" type="create" />}
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

export default ParentsListPage;
