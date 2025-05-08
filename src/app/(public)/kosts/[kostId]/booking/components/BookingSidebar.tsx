import React from "react";

interface BookingSidebarProps {
  kost: {
    name: string;
    address: string;
    image: string;
    price: number;
  };
}

const BookingSidebar = ({ kost }: BookingSidebarProps) => {
  const biayaAdmin = 10000;

  const total = kost.price + biayaAdmin;
  return (
    <div className="sticky top-24 bg-white border p-6 rounded-2xl shadow select-none">
      <div className="flex space-x-4 mb-4">
        <img
          src="https://placehold.co/100x80/png?text=Room+Interior+with+bed+and+wardrobe"
          alt="Room interior with a bed, white linens, purple pillows, yellow curtains, and a brown wardrobe"
          className="w-[100px] h-[80px] rounded-md object-cover"
        />
        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md mb-1 w-max">
            Kost Campur
          </span>
          <h3 className="font-semibold text-sm leading-tight">{kost.name}</h3>
          <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
            <i className="fas fa-map-marker-alt text-gray-600 text-xs"></i>{" "}
            Remboken, Minahasa
          </p>
        </div>
      </div>

      <hr className="border-gray-200 mb-4" />

      <h4 className="font-semibold mb-3">Rincian Pembayaran</h4>
      <div className="flex justify-between text-sm mb-2">
        <span>Biaya sewa per bulan</span>
        <span>Rp 700.000</span>
      </div>

      <div className="flex justify-between text-sm mb-4">
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
