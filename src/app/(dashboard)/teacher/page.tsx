import Announcements from "src/components/Announcements";
import BigCalendarContainer from "src/components/BigCalendarContainer";
import { getUtils } from "src/lib/utils";

const TeacherPage = async () => {

  const { userId: teacherId } = await getUtils();

  return (
    <div className="flex flex-col gap-4 p-4 xl:flex-row">
      {/* LEFT PART */}
      <div className="flex flex-col w-full h-[144vh] rounded-xl bg-white">
        <h1 className="text-xl font-semibold p-4">Schedule (John Doe)</h1>
        <div className="p-4 flex-1 overflow-hidden">
          <BigCalendarContainer type="teacherId" id={teacherId!}/>
        </div>
      </div>
      {/* RIGHT PART */}
      <div className="flex w-full flex-col gap-8 xl:w-1/3">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
//Okay so, currently the teacher page fetches the lessons based off the time in the lesson table, but there is a problem with this. In any school management system, any teacher will have the same lessons everyy week but doesn't mean that they are going to update the lesson table every week. So, we need to
// 1. Update the date of the fetched lessons from the predefined week to current week, since every week the time table of the teacher is the same.
// 2. We need to fetch the lessons from the lesson table and then filter them based on the teacher id.

//Note: Calculations done in @/utils.ts file
