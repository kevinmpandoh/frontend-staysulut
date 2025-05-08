import { Billing } from "@/types/billing.type";
import { MapPin } from "lucide-react";
import Image from "next/image";

// components/payment/PaymentSummary.tsx
export function PaymentSummary({ unpaidBilling }: { unpaidBilling: Billing }) {
  return (
    <aside className="flex-1 max-w-md border border-gray-200 rounded-lg p-6 select-text">
      <div className="flex gap-4 mb-6">
        <Image
          src={unpaidBilling.fotoKamar}
          alt="Room with a bed, white sheets, purple pillows, yellow curtain, and wooden wardrobe"
          className="w-30 h-22 rounded-md object-cover"
          width={120}
          height={90}
        />
        <div className="flex flex-col justify-center space-y-2">
          <span className="text-xs font-semibold text-indigo-400 bg-indigo-100 rounded px-2 py-0.5 mb-1 select-text">
            Kost Campur
          </span>
          <h3 className="font-bold text-base leading-tight select-text">
            {unpaidBilling.namaKost}
          </h3>
          <p className="text-sm font-semibold text-gray-700 flex items-center gap-1 select-text">
            <MapPin size={18} />
            {unpaidBilling.alamat}
          </p>
        </div>
      </div>

      <hr className="border-t border-gray-200 mb-6" />

      <dl className="mb-6 text-gray-900 text-sm space-y-3">
        <div className="flex justify-between">
          <dt>Tanggal Masuk</dt>
          <dd>{unpaidBilling.tanggalMasuk}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Tanggal Selesai</dt>
          <dd>{unpaidBilling.tanggalKeluar}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Durasi Sewa</dt>
          <dd>{unpaidBilling.durasi} bulan</dd>
        </div>
      </dl>

      <hr className="border-t border-gray-200 mb-6" />

      <h4 className="font-bold text-lg mb-4 select-text">Rincian Pembayaran</h4>

      <dl className="text-sm text-gray-900 space-y-3 mb-6">
        <div className="flex justify-between">
          <dt>Biaya sewa per bulan</dt>
          <dd className="font-semibold">
            Rp {unpaidBilling.total.toLocaleString("id-ID")}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>Biaya Layanan</dt>
          <dd className="font-semibold">Rp 10.000</dd>
        </div>
      </dl>

      <hr className="border-t border-gray-200 mb-6" />

      <div className="flex justify-between text-gray-700 text-lg font-extrabold select-text">
        <span>Total Pembayaran</span>
        <span className="text-indigo-600">
          Rp {unpaidBilling.total.toLocaleString("id-ID")}
        </span>
      </div>
    </aside>
  );
}
