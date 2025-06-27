"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type SimpleMonthPickerProps = {
  selectedDate?: Date;
  onSelect: (date: Date) => void;
};

const monthLabels = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function SimpleMonthPicker({
  selectedDate,
  onSelect,
}: SimpleMonthPickerProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handlePrevYear = () => setCurrentYear((prev) => prev - 1);
  const handleNextYear = () => setCurrentYear((prev) => prev + 1);

  const isSelected = (monthIndex: number) =>
    selectedDate?.getFullYear() === currentYear &&
    selectedDate?.getMonth() === monthIndex;

  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevYear}
          className="px-2 py-1 rounded hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>
        <div className="font-semibold text-lg">{currentYear}</div>
        <button
          onClick={handleNextYear}
          className="px-2 py-1 rounded hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {monthLabels.map((label, index) => {
          const selected = isSelected(index);
          return (
            <button
              key={label}
              onClick={() => onSelect(new Date(currentYear, index, 1))}
              className={`py-2 rounded-md text-sm font-medium
                ${selected ? "bg-primary text-white" : "hover:bg-gray-100"}
              `}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
