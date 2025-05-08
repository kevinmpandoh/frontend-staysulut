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
  return (
    <div className="mb-6">
      <p className="font-semibold text-base mb-1">Bayar Sebelum</p>
      <p className="text-red-600 font-semibold text-sm">
        {new Date(expiry_time).toLocaleString("id-ID", {
          dateStyle: "short",
          timeStyle: "medium",
        })}
      </p>
      {timeLeft ? (
        <p className="text-sm text-gray-700 mt-1">
          Sisa waktu: {timeLeft.hours}j {timeLeft.minutes}m {timeLeft.seconds}s
        </p>
      ) : (
        <p className="text-sm text-red-500 mt-1">
          Waktu pembayaran telah habis
        </p>
      )}
    </div>
  );
};
