// The big calenndar is either for a teacher or a student
// If it is for a teacher, we will fetch the lessons by going through the lessons table and filtering by the teacher id
// If it is for a student, we will fetch the lessons by going through the lessons table and filtering by the class id

import { prisma } from "src/lib/prisma";
import BigCalendar from "./BigCalendar";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {

  const resData = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });
  // this is unstructured data format, we need to convert it to the format that the calendar expects which is:
  // {
  //   title: "Math",
  //   allDay: false,
  //   start: new Date(2025, 2, 15, 8, 0),
  //   end: new Date(2025, 2, 15, 8, 45),
  // },

  const data = resData.map((lesson) => (
    {
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
    }
  ));

  return (
    <div className="w-full h-full">
      <BigCalendar data={data} />
    </div>
  );
};  

export default BigCalendarContainer;
