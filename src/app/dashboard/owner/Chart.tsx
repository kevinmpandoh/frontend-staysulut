"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
// import ChartTab from "./ChartTab";

// Lazy load chart (no SSR)
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type PendapatanPerBulan = { _id: number; total: number };

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export default function Chart({ data }: { data: PendapatanPerBulan[] }) {
  // mapping data pendapatan ke bulan 1–12
  const seriesData = new Array(12).fill(0);
  data.forEach((item) => {
    if (item._id >= 1 && item._id <= 12) {
      seriesData[item._id - 1] = item.total;
    }
  });

  const options: ApexOptions = {
    legend: { show: false },
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: [2],
    },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.55, opacityTo: 0 },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value: number) => {
          return `Rp ${value.toLocaleString("id-ID")}`;
        },
      },
      x: { format: "MMMM" },
    },
    xaxis: {
      type: "category",
      categories: monthLabels,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
        formatter: (value: number) => `Rp ${value.toLocaleString("id-ID")}`,
      },

      title: { text: "", style: { fontSize: "0px" } },
    },
  };

  const series = [
    {
      name: "Pendapatan",
      data: seriesData,
    },
  ];

  const total = seriesData.reduce((acc, cur) => acc + cur, 0);

  return (
    <div className="rounded-2xl border w-full border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Total Pendapatan
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Rp {total.toLocaleString("id-ID")}
          </p>
        </div>
        {/* <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab />
        </div> */}
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={310}
          />
        </div>
      </div>
    </div>
  );
}
