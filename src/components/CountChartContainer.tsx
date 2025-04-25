import Image from "next/image";
import CountChart from "./CountChart";
import { prisma } from "src/lib/prisma";

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((item) => item.sex === "MALE")?._count || 0;
  const girls = data.find((item) => item.sex === "FEMALE")?._count || 0;

  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-white p-4">
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>
      {/* CHART */}
      <CountChart boys={boys} girls={girls} />
      {/* BOTTOM LABEL */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="h-5 w-5 rounded-full bg-lamaSky"></div>
          <h1 className="text-sm font-bold">{boys}</h1>
          <h4 className="text-xs text-gray-300">
            ({Math.round((boys / (boys + girls)) * 100)}%)
          </h4>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-5 w-5 rounded-full bg-lamaYellow"></div>
          <h1 className="text-sm font-bold">{girls}</h1>
          <h4 className="text-xs text-gray-300">
            ({Math.round((girls / (boys + girls)) * 100)}%)
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
