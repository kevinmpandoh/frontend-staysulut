import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ModalKonfirmasiBerhenti from "./ModalKonfirmasiBerhenti";
import { useStopRentActions } from "@/hooks/useStopRentRequest";

const TenantCard = ({ booking }: { booking: any }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState<"accept" | "reject" | null>(null);
  const { acceptMutation, rejectMutation } = useStopRentActions(booking.id);

  return (
    <div className="border bg-white shadow w-full border-gray-300 rounded-lg p-6 mb-6 ">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-semibold text-[#b45309] bg-[#fef3c7] rounded-full px-2 py-0.5 select-none">
          {booking.status}
        </span>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Image
                src={booking.avatar || "/profile-default.png"}
                alt="Profile Image"
                className="w-12 h-12 rounded-full object-contain"
                width={40}
                height={40}
              />
              <div>
                <span className="block font-semibold text-gray-700 text-base dark:text-gray-400">
                  {booking.tenantName}
                </span>
                <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400">
                  {booking.namaKost}
                </span>
              </div>
            </div>

            <div className="flex gap-0 mb-2">
              <div className="flex flex-col gap-2 border-l-2 border-gray-200 text-sm text-[#6b7280] px-10">
                <h3 className="text-lg font-semibold">Mulai Sewa</h3>

                <span className="text-[#374151] font-semibold">
                  {booking.tanggalMasuk}
                </span>
              </div>

              <div className="flex flex-col gap-2 border-l-2 border-gray-200 text-sm text-[#6b7280] px-10">
                <h3 className="text-lg font-semibold">Durasi</h3>

                <span className="text-[#374151] font-semibold">
                  {booking.durasi} Bulan
                </span>
              </div>

              <div className="flex items-center gap-2 border-l-2 border-gray-200 text-sm text-[#6b7280] px-10 ">
                <Button variant={"link"}>
                  <Link href={`penyewa/${booking.id}`}>Lihat Detail</Link>
                </Button>
              </div>

              {booking.berhentiSewa &&
                booking.berhentiSewa?.status === "pending_approval" && (
                  <div className="flex flex-col items-center gap-2 border-l-2  border-gray-200 text-sm text-[#6b7280] px-4 ">
                    <h3 className="text-lg font-semibold">Konfirmasi </h3>

                    <div className="flex gap-2">
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          setModalMode("reject");
                          setOpenModal(true);
                        }}
                      >
                        Tolak
                      </Button>
                      <Button
                        onClick={() => {
                          setModalMode("accept");
                          setOpenModal(true);
                        }}
                      >
                        Terima
                      </Button>
                    </div>
                  </div>
                )}
            </div>
          </div>

          {booking.berhentiSewa?.status && (
            <div className="mt-4 rounded-md bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 text-sm flex items-center gap-2">
              <svg
                className="w-5 h-5 text-yellow-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <span>
                Penyewa mengajukan berhenti sewa pada{" "}
                <span className="font-semibold">
                  {booking.berhentiSewa?.stopDate}
                </span>
                {booking.berhentiSewa?.status === "pending_approval" && (
                  <span className="ml-2 font-semibold text-yellow-700">
                    (Menunggu Persetujuan)
                  </span>
                )}
                {booking.berhentiSewa?.status === "Disetujui" && (
                  <span className="ml-2 font-semibold text-green-700">
                    (Pengajuan berhenti sewa telah{" "}
                    <span className="underline">disetujui</span>)
                  </span>
                )}
                {booking.berhentiSewa?.status === "Ditolak" && (
                  <span className="ml-2 font-semibold text-red-700">
                    (Pengajuan berhenti sewa{" "}
                    <span className="underline">ditolak</span>)
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
      <ModalKonfirmasiBerhenti
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={(reason) => {
          if (modalMode === "accept") {
            acceptMutation.mutate();
          } else if (modalMode === "reject" && reason) {
            rejectMutation.mutate(reason);
          }
          setOpenModal(false);
        }}
        mode={modalMode!}
      />
    </div>
  );
};

export default TenantCard;
