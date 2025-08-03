import { AlarmClock } from "lucide-react";
import React from "react";

export const CountdownTimer = ({
  expiry_time,
  timeLeft,
}: {
  expiry_time: string;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  } | null;
}) => {
  const deadline = new Date(expiry_time).toLocaleString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formatTimeUnit = (val: number) => String(val).padStart(2, "0");

  return (
    <div className="bg-amber-50 p-4 mb-4 rounded-md flex items-center justify-between">
      <div className="flex items-start gap-3">
        <AlarmClock className="text-amber-600 w-5 h-5 mt-1" />
        <div className="text-brown-800">
          <p className="text-sm text-amber-700 mb-1">
            Selesaikan pembayaran sebelum:
          </p>
          <p className="text-md font-semibold text-brown-900">{deadline}</p>
        </div>
      </div>
      <div>
        {timeLeft ? (
          <p className="text-md font-semibold text-brown-900">
            {formatTimeUnit(timeLeft.hours)}:{formatTimeUnit(timeLeft.minutes)}:
            {formatTimeUnit(timeLeft.seconds)}
          </p>
        ) : (
          <p className="text-red-600 font-semibold">Waktu habis</p>
        )}
      </div>
    </div>
  );
};
