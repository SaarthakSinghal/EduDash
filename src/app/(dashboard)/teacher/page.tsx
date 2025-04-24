import Announcements from "src/components/Announcements";
import BigCalendar from "src/components/BigCalendar";

const TeacherPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 xl:flex-row">
      {/* LEFT PART */}
      <div className="flex flex-col w-full h-[144vh] rounded-xl bg-white">
        <h1 className="text-xl font-semibold p-4">Schedule (John Doe)</h1>
        <div className="p-4 flex-1 overflow-hidden">
          <BigCalendar/>
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
