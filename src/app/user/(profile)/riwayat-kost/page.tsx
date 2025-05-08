import React from "react";
import BookingHistoryList from "./BookingHistoryList";

const page = () => {
  return (
    <>
      <div className=" w-full">
        <h1 className="text-base font-bold text-gray-900 mb-6 select-none">
          Riwayat Kost
        </h1>

        <BookingHistoryList />
      </div>
    </>
  );
};

export default page;
