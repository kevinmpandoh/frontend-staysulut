"use client";

import { useState } from "react";
import Modal from "@/components/common/Modal";
// import TanggalMasukCalendar from "@/components/ui/calender";
import SimpleCalendar from "@/components/ui/calender";
// import { Calendar } from "@/components/ui/calendar";

export default function TanggalMasukModal({
  isOpen,
  onClose,
  onSave,
  initialDate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (date: Date) => void;
  initialDate: Date | string | undefined;
}) {
  const initial =
    typeof initialDate === "string" ? new Date(initialDate) : initialDate;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initial);

  const handleSave = () => {
    if (selectedDate) {
      onSave(selectedDate);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-10">
        <h2 className="text-xl font-semibold mb-4">Pilih Tanggal Masuk</h2>
        {/* <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        fromDate={new Date()} // Tidak bisa pilih tanggal sebelum hari ini
      /> */}
        {/* <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          disabled={{ before: new Date() }}
          required
        /> */}
        {/* <div className="flex justify-center items-center mt-4">
          <input
            type="date"
            value={selectedDate?.toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="border rounded-md p-2 w-full"
            min={new Date().toISOString().split("T")[0]} // tidak bisa pilih sebelum hari ini
            autoFocus // langsung muncul keyboard (di mobile) atau fokus ke input
          />
        </div> */}

        <SimpleCalendar
          selectedDate={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
        />
        <button
          onClick={handleSave}
          className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Simpan Tanggal
        </button>
      </div>
    </Modal>
  );
}
