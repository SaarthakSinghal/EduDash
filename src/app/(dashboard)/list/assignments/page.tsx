import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import FormModal from "src/components/FormModal";
import Pagination from "src/components/Pagination";
import ReusableTable from "src/components/ReusableTable";
import TableSearch from "src/components/TableSearch";
import { prisma } from "src/lib/prisma";
import { ITEM_PER_PAGE } from "src/lib/settings";
import { getUtils } from "src/lib/utils";

type AssignmentList = Assignment & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

const AssignmentsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page = "1", ...queryParams } = searchParams || {};
  const currentPage = parseInt(page);

  const query: Prisma.AssignmentWhereInput = {};
  const role = (await getUtils()).role;
  const currentUserId = (await getUtils()).userId;

  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
      className: `${role === "admin" || role === "teacher" ? "" : "hidden"}`,
    },
  ];

  const renderRow = (item: AssignmentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4 font-semibold">
        {item.lesson.subject.name}
      </td>
      <td className="">{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">{item.lesson.teacher.name}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.dueDate || "")}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModal table="assignment" type="update" data={item} />
              <FormModal table="assignment" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  // initialising the object for easier syntax
  query.lesson = {};

  // URL PARAMS CONDITION
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        // Old syntax
        // switch (key) {
        //   case "classId": // student's exams
        //     query.lesson = { classId: parseInt(value) };
        //     break;
        //   case "teacherId": // teacher's exams
        //     query.lesson = { teacherId: value };
        //     break;
        //   case "search":
        //     query.lesson = {
        //       subject: {
        //         name: { contains: value, mode: "insensitive" },
        //       },
        //     };
        //     break;
        //   default:
        //     break;
        switch (key) {
          case "classId": // student's exams
            query.lesson.classId = parseInt(value);
            break;
          // case "teacherId": // teacher's exams
          //   query.lesson.teacherId = value ;
          //   break;
          case "search":
            query.lesson.subject = {
                name: { contains: value, mode: "insensitive" },
            };
            break;
          default:
            break;
        }
      }
    }
  };

  // ROLE CONDITION
  // we are using ! because we can only show the assignments once the teacher is logged in, then we'll get the currentUserId and then we can show the assignments
  switch(role) {
    case "admin":
      break;
    case "teacher":
      query.lesson.teacherId = currentUserId!;
      break;
    case "student":
      query.lesson.class = {
        students : { some : { id: currentUserId! } }
      };
      break;
    case "parent":
      query.lesson.class = {
        students : { some : { parentId: currentUserId! } }
      };
      break;
    default:
      break;
  }

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            class: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
          },
        },
      },
      orderBy: { id: "asc" },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (currentPage - 1),
    }),
    prisma.assignment.count({
      where: query,
    }),
  ]);

  return (
    <div className="m-4 mt-0 flex-1 rounded-lg bg-white p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">
          All Assignments
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
            {( role === "admin" || role === "teacher" ) ? <FormModal table="assignment" type="create" /> : "" }
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

export default AssignmentsListPage;
