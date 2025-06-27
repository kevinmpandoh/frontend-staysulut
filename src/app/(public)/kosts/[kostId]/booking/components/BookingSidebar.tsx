import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

interface BookingSidebarProps {
  kost: {
    name: string;
    type: string;
    address: string;
    image: string;
    price: number;
  };
}

const BookingSidebar = ({ kost }: BookingSidebarProps) => {
  const biayaAdmin = 10000;

  const total = kost.price + biayaAdmin;
  return (
    <div className="sticky top-30 bg-white border p-6 rounded-2xl shadow select-none">
      <div className="flex space-x-4 mb-4">
        <Image
          src={kost.image}
          alt="Room interior with a bed, white linens, purple pillows, yellow curtains, and a brown wardrobe"
          className="w-[100px] h-[80px] rounded-md object-cover"
          width={100}
          height={80}
        />
        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md mb-1 w-max">
            {kost.type}
          </span>
          <h3 className="font-semibold text-md leading-tight">{kost.name}</h3>
          <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            {kost.address}
          </p>
        </div>
      </div>

      <hr className="border-gray-200 mb-4" />

      <h4 className="font-semibold mb-3">Rincian Pembayaran</h4>
      <div className="flex justify-between text-md mb-2">
        <span>Biaya sewa per bulan</span>
        <span>Rp {kost.price.toLocaleString("id-ID")}</span>
      </div>

      <div className="flex justify-between text-md mb-4">
        <span>Biaya Layanan</span>
        <span>Rp 10.000</span>
      </div>
      <hr className="border-gray-200 mb-4" />
      <div className="flex justify-between font-semibold text-lg">
        <span>Total Pembayaran</span>
        <span>Rp{total.toLocaleString("id-ID")}</span>
      </div>
    </div>
  );
};

export default BookingSidebar;
