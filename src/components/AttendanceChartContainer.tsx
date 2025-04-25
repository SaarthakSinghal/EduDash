import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import { prisma } from "src/lib/prisma";

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date();
  lastMonday.setDate(today.getDate() - daysSinceMonday);

  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Initialize attendance map for each day of the week
  // Even if the day is not present, it will be initialized with 0
  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
      Sat: { present: 0, absent: 0 },
    };

  //We can't use GroupBy because each date is unique, so we need to iterate through
  //the data
  resData.forEach((item) => {
    const itemDate = new Date(item.date);
    const itemDay = itemDate.getDay();

    if (itemDay >= 1 && itemDay <= 6) {
      const day = daysOfWeek[itemDay - 1];
      if (item.present) {
        attendanceMap[day].present++;
      } else {
        attendanceMap[day].absent++;
      }
    };
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    Present: attendanceMap[day].present,
    Absent: attendanceMap[day].absent,
  }));

  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-4">
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>
      {/* ATTENDANCE CHART */}
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;
