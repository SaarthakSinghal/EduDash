import { Prisma} from "@prisma/client";
import Image from "next/image";
import FormModal from "src/components/FormModal";
import Pagination from "src/components/Pagination";
import ReusableTable from "src/components/ReusableTable";
import TableSearch from "src/components/TableSearch";
import { role } from "src/lib/data";
import { prisma } from "src/lib/prisma";
import { ITEM_PER_PAGE } from "src/lib/settings";

// Creating youi own type using the method we've been using till now would be tedious, so create your own type.
// type ResultList = Result & {
//   student: Student;
// };

type ResultList = {
  id: number;
  score: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  className: string;
  startTime: Date;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const renderRow = (item: ResultList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4 font-semibold">{item.title}</td>
    <td className="">{item.studentName + " " + item.studentSurname}</td>
    <td className="hidden md:table-cell">{item.score}</td>
    <td className="hidden md:table-cell">{item.teacherName}</td>
    <td className="hidden md:table-cell">{item.className}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.startTime || "")}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="result" type="update" data={item} />
            <FormModal table="result" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ResultsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page = "1", ...queryParams } = searchParams || {};
  const currentPage = parseInt(page);

  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId": // student's exams
            query.studentId = value;
            break;
          case "search":
            query.OR = [
                { exam: { title: { contains: value, mode: "insensitive" } } },
                { assignment: { title: { contains: value, mode: "insensitive" } } },
                { student: { name: { contains: value, mode: "insensitive" } } },
                { student: { surname: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

 //Explanation for two include queries and watch results part again
  /*
  Since there are 2 types of results, exams and assignments, we need to include them seperately in the include query

  Wrong one, since to include two types of results, we need to create a include inside the include query
  you need to explicitly use include for each level of relation you want to traverse before using select on the final fields
  include is used to specify which relations to include in the result
  select is used to specify which fields to include from a model
  When dealing with nested relations, you need to:
    Use include to navigate through each relation level
    Use select only at the level where you want to filter specific fields

  When you write exam: { lesson: { select: ... } }, Prisma doesn't know how to interpret this because:

    You're trying to include the exam relation

    But then you're trying to directly select fields from the lesson relation without first including it

  The correct pattern for deeply nested relations is:
  include: { relationA: { include: { relationB: { select: { field1: true } } } } }
*/

  // named it dataResponse because when exam data is their, assignment data is null and when assignment data is their, exam data is null
  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true } },
              },
            },
          },
        },
      },
      orderBy: { id: "asc" },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (currentPage - 1),
    }),
    prisma.result.count({
      where: query,
    }),
  ]);

  const data = dataRes.map((result) => {
    const assessment = result.exam || result.assignment;
    if (!assessment) return null;

    const isExam = "startTime" in assessment;

    return {
      id: result.id,
      score: result.score,
      title: assessment.title, // because not in result but in exam or assignment
      studentName: result.student.name,
      studentSurname: result.student.surname,
      teacherName: assessment.lesson.teacher.name,
      className: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.dueDate,
    };
  });

  return (
    <div className="m-4 mt-0 flex-1 rounded-lg bg-white p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Results</h1>
        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flex items-center justify-end gap-4 self-end">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="/" width={14} height={14} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="/" width={14} height={14} />
            </button>
            <FormModal table="result" type="create" />
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

export default ResultsListPage;
