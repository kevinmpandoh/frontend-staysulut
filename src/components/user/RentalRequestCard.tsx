import { useBooking } from "@/hooks/useBooking";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { parse, isAfter, differenceInSeconds } from "date-fns";
import { id as ind } from "date-fns/locale";
import { Button } from "../ui/button";

type RentalRequestCardProps = {
  id?: string;
  date: string;
  status: string;
  kostName: string;
  address: string;
  category: string;
  checkInDate: string;
  duration: string;
  imageUrl: string;
  price: number;
  expireDate: string;
  invoice: string;
  reason?: string;
};

const RentalRequestCard: React.FC<RentalRequestCardProps> = ({
  id,
  date,
  status,
  kostName,
  address,
  category,
  checkInDate,
  duration,
  imageUrl,
  price,
  expireDate,
  invoice,
  reason,
}) => {
  const { checkIn, checkingIn } = useBooking(); // gunakan hook

  const [canCheckIn, setCanCheckIn] = useState(false);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!checkInDate) return;
    // parsing tanggalMasuk misal "27 Mei 2025"
    const parsedCheckInDate = parse(checkInDate, "d MMMM yyyy", new Date(), {
      locale: ind,
    });

    const interval = setInterval(() => {
      const now = new Date();
      if (isAfter(now, parsedCheckInDate) || +now === +parsedCheckInDate) {
        setCanCheckIn(true);
        setCountdown("");
        clearInterval(interval);
      } else {
        const diffSeconds = differenceInSeconds(parsedCheckInDate, now);
        const hours = Math.floor(diffSeconds / 3600)
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor((diffSeconds % 3600) / 60)
          .toString()
          .padStart(2, "0");
        const seconds = (diffSeconds % 60).toString().padStart(2, "0");
        setCountdown(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [checkInDate]);

  useEffect(() => {
    if (status !== "waiting_for_payment" || !expireDate) return;

    try {
      const expire = parse(expireDate, "d MMMM yyyy HH:mm", new Date(), {
        locale: ind,
      });

      const interval = setInterval(() => {
        const now = new Date();
        const diff = differenceInSeconds(expire, now);

        if (diff <= 0) {
          setCountdown("Waktu habis");
          clearInterval(interval);
        } else {
          const hours = Math.floor(diff / 3600)
            .toString()
            .padStart(2, "0");
          const minutes = Math.floor((diff % 3600) / 60)
            .toString()
            .padStart(2, "0");
          const seconds = (diff % 60).toString().padStart(2, "0");
          setCountdown(`${hours}:${minutes}:${seconds}`);
        }
      }, 1000);

      return () => clearInterval(interval);
    } catch (err) {
      console.error("Gagal parse expireDate:", expireDate, err);
    }
  }, [status, expireDate]);

  const handleCheckIn = () => {
    if (id) {
      checkIn(id);
    }
  };
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-6 max-w-3xl">
      <div className="flex justify-between items-start mb-2">
        <p className="text-md font-semibold text-black">{date}</p>
        <span className="text-xs font-semibold text-[#b45309] bg-[#fef3c7] rounded-full px-2 py-0.5 select-none">
          {status === "pending" ? "Menunggu Persetujuan" : status}
        </span>
      </div>
      <div className="flex gap-4">
        <Image
          alt="Room"
          className="w-[120px] h-[100px] rounded-md object-cover flex-shrink-0"
          height="90"
          src={imageUrl || "/kost.jpg"}
          width="120"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-[#1e40af] bg-[#e0e7ff] rounded px-2 py-0.5 select-none">
              {category}
            </span>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col mb-2">
              <h2 className="font-semibold text-xl text-black mb-1">
                {kostName}
              </h2>
              <div className="flex items-center gap-1 text-sm ">
                <MapPin size={18} />
                <span>{address}</span>
              </div>
              <p className="text-sm text-[#16a34a] font-semibold mt-1">
                Rp {price?.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="flex gap-8 mb-2">
              <div className="flex flex-col gap-2 text-sm text-gray-600 mb-1">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>Tanggal Masuk</span>
                </div>

                <span className="text-[#374151] font-semibold">
                  {checkInDate}
                </span>
              </div>
              <div className="flex flex-col gap-2 text-sm text-[#6b7280] mb-1">
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span className="font-semibold">Durasi</span>
                </div>
                <span className="text-[#374151] font-semibold">
                  {duration} Bulan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        {reason && (
          <div className="text-red-500 text-sm bg-red-50 px-2 py-1.5 rounded">
            {reason}
          </div>
        )}
        {status === "pending" && (
          <Link
            href={"/kosts"}
            className="text-[#3b49df] font-semibold text-sm border border-[#3b49df] rounded px-4 py-1 hover:bg-[#e6e8ff] transition"
            type="button"
          >
            Cari Kost Lain
          </Link>
        )}
        {status === "waiting_for_payment" && (
          <div className="flex flex-col items-end">
            <span className="text-xs text-red-600 mt-1">
              Sisa waktu pembayaran: {countdown || "Waktu Habis"}
            </span>
            <Link
              href={`/user/pembayaran?invoice=${invoice}`}
              className="bg-[#3b49df] text-white font-semibold text-sm rounded px-4 py-2 hover:bg-[#2a37b8] transition"
              type="button"
            >
              Bayar Sekarang
            </Link>
          </div>
        )}
        {status === "waiting_for_checkin" && (
          <>
            {!canCheckIn && countdown && (
              <span className="text-xs text-gray-500 mt-1">
                Check-in tersedia dalam {countdown}
              </span>
            )}
            <button
              className=" border border-[#3b49df] cursor-pointer text-primary font-semibold text-sm rounded px-4 py-2 transition"
              type="button"
            >
              Ajukan Pengembalian
            </button>
            <button
              onClick={handleCheckIn}
              disabled={!canCheckIn || checkingIn}
              className={`${
                canCheckIn
                  ? "bg-[#3b49df] hover:bg-[#2a37b8] cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white font-semibold text-sm rounded px-4 py-2 transition`}
              // className="bg-[#3b49df] cursor-pointer text-white font-semibold text-sm rounded px-4 py-2 hover:bg-[#2a37b8] transition"
              type="button"
            >
              {checkingIn
                ? "Memproses..."
                : canCheckIn
                ? "Check-In Sekarang"
                : "Belum Bisa Check-In"}
            </button>
          </>
        )}
        {status === "Aktif" && (
          <>
            <Button>
              <Link href={"/user/kost-saya"}>Kost Saya</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RentalRequestCard;
