import Announcements from "src/components/Announcements";
import BigCalendarContainer from "src/components/BigCalendarContainer";
import EventCalendar from "src/components/EventCalendar";
import { prisma } from "src/lib/prisma";
import { getUtils } from "src/lib/utils";

const StudentPage = async () => {

  const { userId } = await getUtils();
  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    }
  });

  return (
    <div className="flex flex-col gap-4 p-4 xl:flex-row">
      {/* LEFT PART */}
      <div className="flex flex-col w-full rounded-xl bg-white">
        <h1 className="text-xl font-semibold p-4">Schedule (4A)</h1>
        <div className="p-4 flex-1 overflow-hidden">
          <BigCalendarContainer type="classId" id={classItem[0].id} />
        </div>
      </div>
      {/* RIGHT PART */}
      <div className="flex w-full flex-col gap-8 xl:w-1/3">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
