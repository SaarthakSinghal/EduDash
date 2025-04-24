import Announcements from "src/components/Announcements";
import BigCalendar from "src/components/BigCalendar";
import EventCalendar from "src/components/EventCalendar";

const StudentPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 xl:flex-row">
      {/* LEFT PART */}
      <div className="flex flex-col w-full rounded-xl bg-white">
        <h1 className="text-xl font-semibold p-4">Schedule (4A)</h1>
        <div className="p-4 flex-1 overflow-hidden">
          <BigCalendar/>
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
