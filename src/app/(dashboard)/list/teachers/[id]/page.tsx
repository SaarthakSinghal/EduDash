import Image from "next/image";
import Link from "next/link";
import Announcements from "src/components/Announcements";
import BigCalendarContainer from "src/components/BigCalendarContainer";
import FormModal from "src/components/FormModal";
import Performance from "src/components/Performance";
import { getUtils } from "src/lib/utils";

const SingleTeacherPage = async () => {
  const { userId } = await getUtils();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* USER INFO CARD */}
          <div className="flex flex-1 gap-4 rounded-md bg-lamaSky px-4 py-6">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                width={144}
                height={144}
                className="h-36 w-36 rounded-full object-cover"
              />
            </div>
            <div className="flex w-2/3 flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Leonard Snyder</h1>
                <FormModal
                  table="teacher"
                  type="update"
                  data={{
                    username: "Leonard Snyder",
                    email: "leonard.snyder@example.com",
                    password: "password",
                    firstname: "Leonard",
                    lastname: "Snyder",
                    phone: "+1 234 567",
                    address: "123 Main St, Anytown, USA",
                    bloodType: "A+",
                    birthday: new Date(),
                    sex: "male",
                    img: null,
                  }}
                />
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium">
                <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>A+</span>
                </div>
                <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>January 2025</span>
                </div>
                <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>user@gmail.com</span>
                </div>
                <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>+1 234 567</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex flex-1 flex-wrap justify-between gap-4 xl:gap-3">
            {/* CARD */}
            <div className="flex w-full gap-4 rounded-md bg-white p-4 sm:w-[48%] xl:w-[48%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* CARD */}
            <div className="flex w-full gap-4 rounded-md bg-white p-4 sm:w-[48%] xl:w-[48%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">2</h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
            {/* CARD */}
            <div className="flex w-full gap-4 rounded-md bg-white p-4 sm:w-[48%] xl:w-[48%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* CARD */}
            <div className="flex w-full gap-4 rounded-md bg-white p-4 sm:w-[48%] xl:w-[48%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 flex h-[800px] flex-col rounded-md bg-white p-4">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <div className="flex-1 overflow-hidden">
            <BigCalendarContainer type="teacherId" id={userId!} />
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="flex h-screen w-full flex-col gap-4 xl:w-1/3">
        <div className="rounded-md bg-white p-4">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
            <Link
              href={`/list/classes?supervisorId=${"teacher2"}`}
              className="flex gap-2 rounded-md bg-lamaSkyLight p-3"
            >
              <Image
                src="/class.png"
                alt=""
                width={12}
                height={12}
                className="h-4 w-4"
              />
              <span>Classes</span>
            </Link>
            <Link
              href={`/list/students?teacherId=${"teacher2"}`}
              className="flex gap-2 rounded-md bg-lamaPurpleLight p-3"
            >
              <Image
                src="/student.png"
                alt=""
                width={12}
                height={12}
                className="h-4 w-4"
              />
              <span>Students</span>
            </Link>
            <Link
              href={`/list/lessons?teacherId=${"teacher2"}`}
              className="flex gap-2 rounded-md bg-lamaYellowLight p-3"
            >
              <Image
                src="/lesson.png"
                alt=""
                width={12}
                height={12}
                className="h-4 w-4"
              />
              <span>Lessons</span>
            </Link>
            <Link
              href={`/list/exams?teacherId=${"teacher2"}`}
              className="flex gap-2 rounded-md bg-pink-50 p-3"
            >
              <Image
                src="/exam.png"
                alt=""
                width={12}
                height={12}
                className="h-4 w-4"
              />
              <span>Exams</span>
            </Link>
            <Link
              href={`/list/assignments?teacherId=${"teacher2"}`}
              className="flex gap-2 rounded-md bg-lamaSkyLight p-3"
            >
              <Image
                src="/assignment.png"
                alt=""
                width={12}
                height={12}
                className="h-4 w-4"
              />
              <span>Assignments</span>
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
