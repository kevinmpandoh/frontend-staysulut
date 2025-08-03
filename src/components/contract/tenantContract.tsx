"use client";

import { useBooking } from "@/hooks/useBooking";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";

type Props = {
  bookingId: string;
};

const KontrakClient = ({ bookingId }: Props) => {
  const { stopBooking, stopingBooking } = useBooking();
  const [open, setOpen] = useState(false);
  const [stopDate, setStopDate] = useState("");
  const [reason, setReason] = useState("");

  const { activeBooking: data } = useBooking();

  const handleSubmit = () => {
    if (!stopDate || !reason) return;
    stopBooking({ id: bookingId, data: { reason, stopDate } });
    setOpen(false);
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex space-x-4 mb-6">
        <Image
          alt="Room"
          className="w-30 h-22 rounded-lg object-cover flex-shrink-0"
          height="90"
          src={data.fotoKost}
          width="120"
        />
        <div className="flex flex-col justify-start">
          <span className="text-xs font-semibold text-white bg-blue-300 rounded px-2 py-0.5 mb-1 w-max select-none">
            {data.jenisKost}
          </span>
          <h2 className="font-bold text-lg leading-tight">{data.namaKost}</h2>
          <span className="text-gray-600 text-sm mt-1">{data.alamat}</span>
          <a
            className="mt-2 text-sm font-semibold text-gray-800 underline hover:text-gray-900"
            href="#"
          >
            Lihat Detail Kost
          </a>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div>
          <p className="font-semibold text-sm">Total Biaya Sewa</p>
          <p className="mt-1 text-base font-normal">
            Rp {data.harga.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-sm">Tanggal Penagihan</p>
          <p className="mt-1 text-base font-normal">1 Desember 2025</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-base">
          <span>Mulai Sewa</span>
          <span className="font-semibold">1 Desember 2024</span>
        </div>
        <div className="flex justify-between text-base">
          <span>Durasi Sewa</span>
          <span className="font-semibold">2 Bulan</span>
        </div>
        <div className="flex justify-between text-base">
          <span>Sewa Berakhir</span>
          <span className="font-semibold">1 Februari 2025</span>
        </div>
      </div>

      {/* Dialog Button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Ajukan Berhenti Sewa
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajukan Berhenti Sewa</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="stop-date" className="text-sm font-medium">
                Tanggal Berhenti
              </label>
              <Input
                id="stop-date"
                type="date"
                value={stopDate}
                onChange={(e) => setStopDate(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="reason" className="text-sm font-medium">
                Alasan
              </label>
              <textarea
                id="reason"
                placeholder="Masukkan alasan berhenti sewa..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmit} disabled={stopingBooking}>
              {stopingBooking ? "Memproses..." : "Kirim"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KontrakClient;
