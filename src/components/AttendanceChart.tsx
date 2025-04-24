"use client";

import Image from "next/image";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Mon",
    Present: 42,
    Absent: 20,
  },
  {
    name: "Tue",
    Present: 30,
    Absent: 20,
  },
  {
    name: "Wed",
    Present: 20,
    Absent: 20,
  },
  {
    name: "Thu",
    Present: 27,
    Absent: 20,
  },
  {
    name: "Fri",
    Present: 18,
    Absent: 20,
  },
  {
    name: "Sat",
    Present: 23,
    Absent: 20,
  },
];

const AttendanceChart = () => {
  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-4">
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">Attendance</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>
      {/* ATTENDANCE CHART */}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} margin={{ left: -30 }}>
          <CartesianGrid strokeDasharray="1" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1dbd8", fontSize: "12" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1dbd8", fontSize: "12" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{
              paddingTop: "20px",
              paddingBottom: "40px",
              marginLeft: "30px",
              fontSize: "12px",
            }}
          />
          <Bar
            dataKey="Present"
            fill="#FAE27C"
            barSize="8"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="Absent"
            fill="#C3EBFA"
            barSize="8"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
