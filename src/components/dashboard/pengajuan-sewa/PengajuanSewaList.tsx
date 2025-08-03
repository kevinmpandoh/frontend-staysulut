"use client";
import Avatar from "@/components/ui/avatar";
import Badge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBookingOwner } from "@/hooks/useBookingOwner";

import React, { useEffect, useState } from "react";
import KonfirmasiModal from "./KonfirmasiModal";
import { useRoom } from "@/hooks/useRoom";
import { useRouter, useSearchParams } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import { useKost } from "@/hooks/useKost";

const PengajuanSewaList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modalType, setModalType] = useState<"terima" | "tolak" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  const itemsPerPage = 5;
  const [daftarKost, setDaftarKost] = useState<any[]>([]);
  const [selectedKostId, setSelectedKostId] = useState<string | null>(null);

  const { getRoomsByKostType } = useRoom(
    selectedBooking ? selectedBooking.kost.kostTypeId : ""
  );
  const { booking, isLoading, approveBooking, rejectBooking } = useBookingOwner(
    { status }
  );
  const { kostOwner } = useKost({});

  const { getChatTenant } = useChat();

  const router = useRouter();

  const currentStatus = searchParams.get("status") || "all";

  useEffect(() => {
    setCurrentPage(1);
  }, [booking]);
  useEffect(() => {
    console.log(kostOwner);
    if (kostOwner) {
      setDaftarKost(kostOwner);
    }
  }, [kostOwner]);

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  const statusList = [
    { key: "all", label: "Semua" },
    { key: "pending", label: "Butuh Konfirmasi" },
    { key: "waiting_for_payment", label: "Menunggu Pembayaran" },
    { key: "waiting_for_checkin", label: "Menunggu Check In" },
    { key: "completed", label: "Sewa Berakhir" },
    { key: "rejected", label: "Ditolak" },
    { key: "dibatalkan", label: "Dibatalkan" },
    { key: "expired", label: "Kadaluarsa" },
  ];

  const handleOpenModal = (booking: any, type: "terima" | "tolak") => {
    setSelectedBooking(booking);
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
    setModalType(null);
  };

  const handleKostSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const kostId = e.target.value;

    if (kostId === "all") {
      setSelectedKostId(null);
    } else {
      setSelectedKostId(kostId);
    }

    const params = new URLSearchParams(searchParams.toString());
    if (kostId === "all") {
      params.delete("kostId");
    } else {
      params.set("kostId", kostId);
    }

    router.push(`?${params.toString()}`);
  };

  const handleConfirm = (data: any) => {
    if (!selectedBooking || !modalType) return;

    if (modalType === "terima") {
      approveBooking({
        id: selectedBooking.id,
        room: data.kamarId,
      });
    } else {
      rejectBooking({
        bookingId: selectedBooking.id,
        data: {
          rejectionReason: data.alasan,
        },
      });
    }

    handleCloseModal();
  };

  const filteredBooking = selectedKostId
    ? booking.filter((b: any) => b.kost.kostId === selectedKostId)
    : booking;

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  const paginatedBooking = filteredBooking.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(booking.length / itemsPerPage);

  if (!booking) {
    return (
      <div className="flex w-full items-center justify-center h-full">
        <h1 className="text-gray-500">Tidak ada pengajuan sewa</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-start sm:items-center mb-4">
        <div className="w-full items-center flex flex-wrap gap-2">
          {statusList.map((statusItem) => (
            <button
              key={statusItem.key}
              onClick={() => handleFilter("status", statusItem.key)}
              className={`py-1 px-2.5 rounded font-semibold border-2 ${
                currentStatus === statusItem.key ||
                (statusItem.key === "all" && !searchParams.get("status"))
                  ? "bg-primary border-primary text-white"
                  : "text-[#5e6c84] border-gray-300"
              }`}
            >
              {statusItem.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1>Cari berdasarkan Kost</h1>

        {/* Select Input */}
        <select
          onChange={handleKostSelect}
          value={selectedKostId || "all"}
          className="w-full sm:w-[300px] rounded-lg border border-gray-200 bg-gray-100 text-gray-700 text-[14px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
        >
          <option value="all">Semua Kost</option>
          {daftarKost.map((kost) => (
            <option key={kost.id} value={kost.id}>
              {kost.namaKost}
            </option>
          ))}
        </select>
      </div>

      {booking.length === 0 && (
        <div className="flex w-full items-center justify-center h-[120px]">
          <h1 className="text-gray-500">Tidak ada pengajuan sewa</h1>
        </div>
      )}

      {paginatedBooking.map((booking: any, index: number) => (
        <div
          key={index}
          className="border bg-white shadow w-full border-gray-300 rounded-lg p-6 mb-6 "
        >
          <div className="flex justify-between items-start mb-4">
            <Badge variant={"light"} color={"warning"}>
              {booking.status}
            </Badge>
            {booking.status === "pending" && (
              <Badge color={"warning"}>
                Konfirmasi sebelum {booking.expireDate}
              </Badge>
            )}
          </div>
          {/* <div className="flex gap-4"> */}
          <div className="flex-1">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Avatar src={"/profile-default.png"} />
                <div>
                  <span className="block font-semibold text-gray-700 text-base dark:text-gray-400">
                    {booking.tenant.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400">
                    {booking.kost.namaKost}
                  </span>
                </div>
              </div>

              <div className="flex gap-10 mb-2">
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

                <div className="flex gap-2 items-center justify-center border-l-2 border-gray-200 text-sm text-[#6b7280] px-10">
                  {booking.status === "pending" ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => handleOpenModal(booking, "tolak")}
                      >
                        Tolak
                      </Button>
                      <Button
                        onClick={() => handleOpenModal(booking, "terima")}
                      >
                        Terima
                      </Button>
                    </>
                  ) : booking.status === "Menunggu Pembayaran" ||
                    booking.status === "Menunggu Check-In" ? (
                    <Button
                      variant="outline"
                      onClick={() =>
                        getChatTenant({
                          kostTypeId: booking.kost.kostTypeId,
                          tenantId: booking.tenant.id,
                        })
                      }
                    >
                      Chat Penyewa
                    </Button>
                  ) : (
                    <Button variant="link">Lihat Detail</Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center items-center gap-2 mt-6">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Sebelumnya
        </Button>

        <span className="text-sm text-gray-600">
          Halaman {currentPage} dari {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Selanjutnya
        </Button>
      </div>

      <KonfirmasiModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        type={modalType}
        kamarOptions={getRoomsByKostType} // nanti ganti sesuai booking terkait
      />
    </>
  );
};

export default PengajuanSewaList;
