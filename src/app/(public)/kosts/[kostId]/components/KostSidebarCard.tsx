"use client";

import SimpleCalendar from "@/components/ui/calender";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useLoginModal } from "@/stores/loginModal.store";
import { useChat } from "@/hooks/useChat";
// components/KostSidebarCard.tsx
export default function KostSidebarCard({
  price,
  kostId,
  handleBookingClick,
}: {
  price: number;
  kostId: string;
  handleBookingClick: (tanggalMasuk: string) => void;
}) {
  const { isLoggedIn, user } = useAuthStore();
  const { open } = useLoginModal();
  const { startChat } = useChat();

  const [tanggalMasuk, setTanggalMasuk] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleSelectDate = (date: Date) => {
    setTanggalMasuk(date);
    setShowCalendar(false);
  };

  const handleChatClick = async (kostId: string) => {
    if (!isLoggedIn) {
      open();
      return;
    }
    startChat(kostId);
  };

  // Detect click outside calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl p-6 border border-gray-200">
      <div className="text-2xl font-semibold text-gray-800 mb-2">
        Rp{price.toLocaleString("id-ID")}
        <span className="text-sm text-gray-500"> / bulan</span>
      </div>
      {user?.role !== "owner" && (
        <div className="mb-4 space-y-4">
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Masuk
            </label>
            <input
              readOnly
              type="text"
              value={
                tanggalMasuk
                  ? format(tanggalMasuk, "dd MMMM yyyy", { locale: id })
                  : ""
              }
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Pilih tanggal masuk"
            />
            <Calendar
              size={18}
              className="absolute right-3 top-10  text-gray-500"
            />
          </div>

          {showCalendar && (
            <div
              ref={calendarRef}
              className="absolute z-20 mt-2 bg-white shadow-lg border rounded-xl p-4"
            >
              <SimpleCalendar
                selectedDate={tanggalMasuk ?? undefined}
                onSelect={handleSelectDate}
              />
            </div>
          )}
        </div>
      )}

      <div className="text-md text-gray-600 mb-4 space-y-2 flex flex-col gap-2">
        <div className="flex justify-between">
          <span>Harga Bulanan</span>
          <span>Rp{price.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span>Biaya Admin</span>
          <span>Rp10.000</span>
        </div>
        <div className="border-t text-lg pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>Rp {(price + 10000).toLocaleString("id-ID")}</span>
        </div>
      </div>

      {user?.role !== "owner" && (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() =>
              tanggalMasuk &&
              handleBookingClick(
                format(tanggalMasuk, "yyyy-MM-dd", { locale: id })
              )
            }
            disabled={!tanggalMasuk}
            className={`w-full font-semibold py-2 rounded-lg transition ${
              tanggalMasuk
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Booking Sekarang
          </button>
          <button
            onClick={() => handleChatClick(kostId)}
            className="w-full border border-blue-600 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition"
          >
            Chat Pemilik
          </button>
        </div>
      )}
    </div>
  );
}
