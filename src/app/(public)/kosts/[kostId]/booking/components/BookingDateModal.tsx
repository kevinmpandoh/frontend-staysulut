"use client";

import { useState } from "react";
import Modal from "@/components/common/Modal";
import { Calendar } from "@/components/ui/calendar";

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
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Pilih Tanggal Masuk</h2>
        {/* <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        fromDate={new Date()} // Tidak bisa pilih tanggal sebelum hari ini
      /> */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          disabled={{ before: new Date() }}
          required
        />
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Simpan Tanggal
        </button>
      </div>
    </Modal>
  );
}
