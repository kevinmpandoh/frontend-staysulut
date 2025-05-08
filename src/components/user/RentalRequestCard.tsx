import { useBooking } from "@/hooks/useBooking";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
}) => {
  const { checkIn, checkingIn } = useBooking(); // gunakan hook

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
                Rp {price.toLocaleString("id-ID")}
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
        {/* <button
          className="text-[#3b49df] font-semibold text-sm border border-[#3b49df] rounded px-4 py-1 hover:bg-[#e6e8ff] transition"
          type="button"
        >
          Lihat detail
        </button> */}
        {status === "pending" && (
          <Link
            href={"/kosts"}
            className="text-[#3b49df] font-semibold text-sm border border-[#3b49df] rounded px-4 py-1 hover:bg-[#e6e8ff] transition"
            type="button"
          >
            Cari Kost Lain
          </Link>
        )}
        {status === "Menunggu Pembayaran" && (
          <Link
            href={`/user/pembayaran?bookingId=${id}`}
            className="bg-[#3b49df] text-white font-semibold text-sm rounded px-4 py-2 hover:bg-[#2a37b8] transition"
            type="button"
          >
            Bayar Sekarang
          </Link>
        )}
        {status === "Menunggu Check-In" && (
          <>
            <button
              className=" border border-[#3b49df] cursor-pointer text-primary font-semibold text-sm rounded px-4 py-2 transition"
              type="button"
            >
              Ajukan Pengembalian
            </button>
            <button
              onClick={handleCheckIn}
              disabled={checkingIn}
              className="bg-[#3b49df] cursor-pointer text-white font-semibold text-sm rounded px-4 py-2 hover:bg-[#2a37b8] transition"
              type="button"
            >
              {checkingIn ? "Memproses..." : "Check-In Sekarang"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RentalRequestCard;
