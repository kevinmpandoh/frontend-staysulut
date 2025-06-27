"use client";

import { useState } from "react";
import { usePayout } from "@/hooks/usePayout";
// import PayoutModal from "@/components/owner/payout/PayoutModal";
import PayoutModal from "./PayoutModal";
import { Button } from "@/components/ui/button";
import { CreditCard, Landmark, SquareUser } from "lucide-react";
import { useBanks } from "@/hooks/useBanks";

export default function Page() {
  const { data: payoutData, isLoading } = usePayout();
  const [open, setOpen] = useState(false);

  const { data: banks } = useBanks();

  const selectedBank = banks?.find(
    (bank: any) => bank.code === payoutData?.rekening_bank?.nama_bank
  );
  const bankDisplayName = selectedBank?.name || "-";

  const hasData =
    payoutData?.rekening_bank?.nama_bank &&
    payoutData?.rekening_bank?.nomor_rekening &&
    payoutData?.rekening_bank?.nama_pemilik;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>
      <p className="text-gray-600 mb-6">
        Atur informasi pembayaran Anda untuk transaksi yang lebih mudah dan
        cepat.
        <br />
        Pastikan informasi yang Anda masukkan akurat untuk menghindari masalah
        dalam proses pembayaran.
      </p>

      {!isLoading && hasData ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Landmark className="text-gray-600" />
            <div>
              <p className="font-semibold text-gray-900">Nama Bank</p>
              <p className="text-gray-500">{bankDisplayName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CreditCard className="text-gray-600" />
            <div>
              <p className="font-semibold text-gray-900">Nomor Rekening</p>
              <p className="text-gray-500">
                {payoutData?.rekening_bank?.nomor_rekening}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <SquareUser className="text-gray-600" />
            <div>
              <p className="font-semibold text-gray-900">Nama Pemilik</p>
              <p className="text-gray-500">
                {payoutData?.rekening_bank?.nama_pemilik}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 mb-6">
          Belum ada informasi pembayaran.
        </div>
      )}

      <div className="mt-6">
        <Button onClick={() => setOpen(true)} className="w-full">
          {hasData
            ? "Ubah Informasi Pembayaran"
            : "Tambah Informasi Pembayaran"}
        </Button>
      </div>

      <PayoutModal
        open={open}
        onOpenChange={setOpen}
        defaultValues={
          hasData
            ? {
                bank_name: payoutData?.rekening_bank?.nama_bank,
                account_number: payoutData?.rekening_bank?.nomor_rekening,
                account_name: payoutData?.rekening_bank?.nama_pemilik,
              }
            : { bank_name: "", account_number: "", account_name: "" }
        }
      />
    </div>
  );
}
