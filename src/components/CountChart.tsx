"use client";
import Image from "next/image";

import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Total",
    count: 60,
    fill: "#fff",
  },
  {
    name: "Boys",
    count: 29,
    fill: "#C3EBFA",
  },
  {
    name: "Girls",
    count: 31,
    fill: "#FAE27C",
  },
];

const CountChart = () => {
  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-white p-4">
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">Students</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>
      {/* COUNT CHART */}
      <div className="relative h-3/4 w-full">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={20}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt="male and female image"
          width={40}
          height={40}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM LABEL */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="h-5 w-5 rounded-full bg-lamaSky"></div>
          <h1 className="text-sm font-bold">29</h1>
          <h4 className="text-xs text-gray-300">49.99%</h4>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-5 w-5 rounded-full bg-lamaYellow"></div>
          <h1 className="text-sm font-bold">31</h1>
          <h4 className="text-xs text-gray-300">50.01%</h4>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
