import Announcements from "src/components/Announcements";
import AttendanceChartContainer from "src/components/AttendanceChartContainer";
import CountChartContainer from "src/components/CountChartContainer";
import EventCalendarContainer from "src/components/EventCalendarContainer";
import FinanceChart from "src/components/FinanceChart";
import UserCard from "src/components/UserCard";

// We can reach the searchParams from the URL only from the pages not from the individual components
const AdminPage = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* LEFT PART */}
      <div className="w-full flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between">
          <UserCard type="admin" />
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
        </div>
        {/* MIDDLE CARDS */}
        <div className="flex flex-col lg:flex-row gap-4">
            {/* COUNT CHART */}
            <div className="w-full lg:w-2/5 h-96">
                <CountChartContainer/>
            </div>
            {/* ATTENDANCE CHART */}
            <div className="w-full lg:w-3/5 h-96">
                <AttendanceChartContainer/>
            </div>
        </div>
        {/* BOTTOM CARD */}
        <div className="w-full h-96">
            <FinanceChart/>
        </div>
      </div>
      {/* RIGHT PART */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams}/>
        <Announcements/>
      </div>
    </div>
  );
};

export default AdminPage;
