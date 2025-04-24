import Announcements from "src/components/Announcements";
import AttendanceChart from "src/components/AttendanceChart";
import CountChart from "src/components/CountChart";
import EventCalendar from "src/components/EventCalendar";
import FinanceChart from "src/components/FinanceChart";
import UserCard from "src/components/UserCard";

const AdminPage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* LEFT PART */}
      <div className="w-full flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>
        {/* MIDDLE CARDS */}
        <div className="flex flex-col lg:flex-row gap-4">
            {/* COUNT CHART */}
            <div className="w-full lg:w-2/5 h-96">
                <CountChart/>
            </div>
            {/* ATTENDANCE CHART */}
            <div className="w-full lg:w-3/5 h-96">
                <AttendanceChart/>
            </div>
        </div>
        {/* BOTTOM CARD */}
        <div className="w-full h-96">
            <FinanceChart/>
        </div>
      </div>
      {/* RIGHT PART */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar/>
        <Announcements/>
      </div>
    </div>
  );
};

export default AdminPage;
