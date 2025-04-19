// components/KostSidebarCard.tsx
export default function KostSidebarCard({
  price,
  handleBookingClick,
}: {
  price: number;
  handleBookingClick: () => void;
}) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl p-6 border border-gray-200">
      <div className="text-2xl font-semibold text-gray-800 mb-2">
        Rp{price.toLocaleString("id-ID")}
        <span className="text-sm text-gray-500"> / bulan</span>
      </div>

      <div className="mb-4">
        <label
          htmlFor="tanggalMasuk"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tanggal Masuk
        </label>
        <input
          type="date"
          id="tanggalMasuk"
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="text-md text-gray-600 mb-4 space-y-2 flex flex-col gap-2">
        <div className="flex justify-between">
          <span>Harga Bulanan</span>
          <span>Rp{price.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span>Biaya Admin</span>
          <span>Rp10.000</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>Rp1.550.000</span>
        </div>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={handleBookingClick}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Booking Sekarang
        </button>
        <button className="w-full border border-blue-600 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition">
          Chat Pemilik
        </button>
      </div>
    </div>
  );
}
