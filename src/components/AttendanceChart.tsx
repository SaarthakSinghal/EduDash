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

const AttendanceChart = ({
  data,
}: {
  data: { name: string; Present: number; Absent: number }[];
}) => {
  return (
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
  );
};

export default AttendanceChart;
