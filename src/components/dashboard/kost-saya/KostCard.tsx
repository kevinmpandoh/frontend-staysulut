import { Alert, AlertDescription } from "@/components/ui/alert2";
import Badge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ConfirmDeleteModal from "@/components/ui/ConfirmModalDelete";
import { DEFAULT_FACILITY_ICON, FACILITY_ICONS } from "@/constants/facilities";
import { KostService } from "@/services/kost.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export interface Kost {
  id: string;
  fotoKost: string | null;
  namaKost: string;
  jenisKost: string;
  alamat: string;
  status: string;
  alasan_penolakan?: string;
  nama_tipe: string[];
  fasilitas: string[];
  rating: number;
  total_kamar: number;
  kamar_tersedia: number;
  kamar_terisi: number;
  progress_step: number;
}

const KostCard = ({ kost }: { kost: Kost }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => KostService.deleteKost(kost.id),
    onSuccess: () => {
      toast.success("Tipe kost berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: ["kost-owner", "list"],
      });
      setShowDeleteModal(false);

      // bisa refetch atau update lokal list
    },
    onError: () => {
      toast.error("Gagal menghapus tipe kost");
    },
  });

  return (
    <div className="border bg-white shadow w-full border-gray-300 rounded-lg px-6 py-4 mb-6 ">
      <div className="flex justify-between items-center mb-2">
        <div className="min-w-[280px]">
          {kost.status === "Ditolak" && kost.alasan_penolakan && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4 text-center" />
              <AlertDescription>{kost.alasan_penolakan}</AlertDescription>
            </Alert>
          )}
        </div>
        <Badge variant={"light"} color="error" size={"md"}>
          {kost.status}
        </Badge>
      </div>
      <div className="flex gap-4 mb-4 w-full ">
        <Image
          alt="Room"
          className="w-[250px] h-[180px] rounded-md object-cover flex-shrink-0"
          height="90"
          src={kost.fotoKost || "/kost.jpg"}
          width="120"
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-[#1e40af] bg-[#e0e7ff] rounded px-2 py-0.5 select-none">
                {kost.jenisKost}
              </span>
            </div>
            <div className="flex justify-between gap-5">
              <div className="flex flex-col mb-2 space-y-2 ml-2">
                <h2 className="font-semibold text-lg text-black mb-1">
                  {kost.namaKost}
                </h2>
                <div className="flex items-center gap-1 text-sm capitalizes">
                  {kost.alamat && (
                    <>
                      <MapPin size={18} />
                      <span className="capitalize">{kost.alamat}</span>
                    </>
                  )}
                </div>
                {/* Fasilitas */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-2">
                  {kost.fasilitas.map((key, index) => {
                    const facility = FACILITY_ICONS[key];
                    const Icon = facility?.icon || DEFAULT_FACILITY_ICON;
                    const label = facility?.label || key;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm font-semibold text-slate-600"
                      >
                        <Icon className="w-5 h-5 text-primary" />
                        <span>{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex  mb-2">
                <div className="flex flex-col justify-center gap-2 border-l-2 border-gray-200 text-base text-gray-600 px-8">
                  <h3 className="text-lg font-semibold">Kamar</h3>

                  <span className="text-[#374151] font-semibold">
                    Tersedia: {kost.kamar_tersedia}
                  </span>
                  <span className="text-[#374151] font-semibold">
                    Kosong: {kost.kamar_terisi}
                  </span>
                </div>

                <div className="flex flex-col justify-center gap-2 border-l-2   border-gray-200 text-base text-[#6b7280] px-8 ">
                  <h3 className="text-lg font-semibold">Rata-Rata Rating</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-[#3b82f6]" />

                    <span className="text-[#374151] font-semibold">
                      4.8 (120 Ulasan)
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-2 border-l-2  border-gray-200 text-base text-[#6b7280] px-5">
                  <h3 className="text-lg font-semibold">Tipe Kamar</h3>

                  <span className="text-[#374151] font-semibold">
                    {kost.nama_tipe.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end gap-2 pt-4">
            {kost.status === "Aktif" && (
              <>
                <Button
                  size="default"
                  variant="outline"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Hapus
                </Button>
                <Button variant={"outline"}>
                  <Link
                    href={`/dashboard/edit-kost?kost_id=${kost.id}`}
                    type="button"
                  >
                    Edit Data Kost
                  </Link>
                </Button>
                <Button>
                  <Link
                    href={`kost-saya/${kost.id}`}
                    // className="text-[#3b49df] font-semibold text-sm border border-[#3b49df] rounded px-4 py-1 hover:bg-[#e6e8ff] transition"
                    type="button"
                  >
                    Kelola Data Kost
                  </Link>
                </Button>
              </>
            )}

            {kost.status === "Draft" && (
              <>
                <Button
                  size="default"
                  variant="outline"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Hapus
                </Button>
                <Button variant={"outline"}>
                  <Link
                    href={`/dashboard/tambah-kost?kost_id=${kost.id}&step=${kost.progress_step}`}
                    // className="text-[#3b49df] font-semibold text-sm border border-[#3b49df] rounded px-4 py-1 hover:bg-[#e6e8ff] transition"
                    type="button"
                  >
                    Lengkapi Data Kost
                  </Link>
                </Button>
              </>
            )}

            {kost.status === "Ditolak" && (
              <>
                <Button
                  size="default"
                  variant="outline"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Hapus
                </Button>
                <Button variant={"outline"}>
                  <Link
                    href={`/dashboard/tambah-kost?kost_id=${kost.id}`}
                    // className="text-[#3b49df] font-semibold text-sm border border-[#3b49df] rounded px-4 py-1 hover:bg-[#e6e8ff] transition"
                    type="button"
                  >
                    Edit Kost
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <ConfirmDeleteModal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          deleteMutation.mutate();
          // setShowDeleteModal(false);
        }}
        title={`Hapus ${kost.namaKost}?`}
        description="Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
};

export default KostCard;
