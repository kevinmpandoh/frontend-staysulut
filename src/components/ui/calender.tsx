"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type SimpleCalendarProps = {
  selectedDate?: Date;
  onSelect: (date: Date) => void;
};

export default function SimpleCalendar({
  selectedDate,
  onSelect,
}: SimpleCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 0);
  const minDate = today;

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date < minDate;
  };

  const isAfterMaxDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date > maxDate;
  };

  const isToday = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date.toDateString() === today.toDateString();
  };

  const handlePrevMonth = () => {
    const prev = new Date(currentYear, currentMonth - 1);
    setCurrentMonth(prev.getMonth());
    setCurrentYear(prev.getFullYear());
  };

  const handleNextMonth = () => {
    const next = new Date(currentYear, currentMonth + 1);
    setCurrentMonth(next.getMonth());
    setCurrentYear(next.getFullYear());
  };

  const isPrevDisabled =
    new Date(currentYear, currentMonth, 1) <=
    new Date(today.getFullYear(), today.getMonth(), 1);
  const isNextDisabled = new Date(currentYear, currentMonth + 1, 0) >= maxDate;

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isDisabled = isPastDate(day) || isAfterMaxDate(day);
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const todayClass = isToday(day) ? "border-2 border-primary" : "";

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && onSelect(date)}
          disabled={isDisabled}
          className={`p-2 rounded text-md ${todayClass} ${
            isDisabled
              ? "text-gray-400 cursor-not-allowed"
              : isSelected
              ? "bg-primary text-white"
              : "hover:bg-blue-100"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevMonth}
          disabled={isPrevDisabled}
          className={`px-2 py-1 rounded ${
            isPrevDisabled
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100 cursor-pointer"
          }`}
        >
          <ChevronLeft />
        </button>
        <div className="font-medium">
          {new Date(currentYear, currentMonth).toLocaleString("id-ID", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button
          onClick={handleNextMonth}
          disabled={isNextDisabled}
          className={`px-2 py-1 rounded ${
            isNextDisabled
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100 cursor-pointer"
          }`}
        >
          <ChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
          <div key={d} className="font-bold text-sm">
            {d}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
}
