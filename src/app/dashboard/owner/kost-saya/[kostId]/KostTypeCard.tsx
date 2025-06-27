import { Button } from "@/components/ui/button";
import ConfirmDeleteModal from "@/components/ui/ConfirmModalDelete";
import { kostTypeService } from "@/services/kostType.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const KostTypeCard = ({ kostType, kostId }: any) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => kostTypeService.deleteKostType(kostType.id),
    onSuccess: () => {
      toast.success("Tipe kost berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: ["kost", kostId, "detail"],
      });
      // bisa refetch atau update lokal list
    },
    onError: () => {
      toast.error("Gagal menghapus tipe kost");
    },
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex-shrink-0 w-full max-w-[370px] ">
      <div className="px-4 pt-4">
        <span className="inline-block bg-[#F9DDB3] text-[#D87D2A] text-xs font-semibold rounded px-2 py-0.5 select-none">
          {kostType.status}
        </span>
      </div>
      <Image
        alt="Room image"
        className="w-full h-44 object-cover rounded-lg mt-3 px-4"
        src={kostType?.foto?.[0]?.url || "/kost.jpg"}
        height={220}
        width={320}
      />
      <div className="px-4 pt-4 pb-6">
        <h3 className="font-bold text-lg leading-5 text-black">
          {kostType?.nama_tipe}
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          Ukuran Kamar: {kostType?.ukuran_kamar} M
        </p>

        <div className="mt-4 flex px-4 space-x-4 border border-gray-200 rounded-md p-2 text-xs text-gray-600">
          <div className="flex-1">
            <p className="text-gray-400 text-base">Kamar Terisi</p>
            <p className="font-semibold text-base text-black">
              {kostType?.kamar_terisi} Kamar
            </p>
          </div>
          <div className="flex-1">
            <p className="text-gray-400 text-base">Kamar Kosong</p>
            <p className="font-semibold text-base text-black">
              {kostType?.kamar_kosong} Kamar
            </p>
          </div>
        </div>

        {/* FASILITAS & REVIEW hanya tampil saat showDetails = true */}
        {showDetails && (
          <>
            <div className="mt-4 flex px-4 space-x-4 border border-gray-200 rounded-md p-2 text-xs text-gray-600">
              <div className="flex-1">
                <p className="text-gray-500 text-base">Review</p>
                {kostType.total_review > 0 ? (
                  <div className="text-base font-semibold">
                    {kostType.average_rating}{" "}
                    <span className="text-yellow-500">★</span> (
                    {kostType.total_review} Reviews)
                  </div>
                ) : (
                  "-"
                )}
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-700">
              <p className="font-semibold text-sm mb-1">Fasilitas Kamar</p>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-gray-600 text-sm">
                {kostType.fasilitas.length > 0 ? (
                  kostType.fasilitas.map((fasilitas: any, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {fasilitas.nama}
                    </span>
                  ))
                ) : (
                  <div>-</div>
                )}
              </div>
            </div>
          </>
        )}

        <div className="mt-4 text-xs text-gray-700">
          <p className="font-semibold text-base mb-1">Harga</p>
          <div className="font-bold text-xl w-full">
            {kostType.harga ? (
              <>
                Rp
                <span className="text-xl ml-2">
                  {kostType?.harga?.toLocaleString("id-ID")}
                </span>
                <span className="font-normal">/bulan</span>
              </>
            ) : (
              <div>-</div>
            )}
          </div>
        </div>

        <div className="w-full space-y-1.5 mt-4">
          {kostType.status === "Draft" && (
            <div className="flex space-x-2 justify-center w-full">
              <Button
                className="w-[48%]"
                size="default"
                variant="outline"
                onClick={() => setShowDeleteModal(true)}
              >
                Hapus
              </Button>
              <Button className="w-[48%]" size="default" variant="outline">
                <Link
                  href={`/dashboard/kost-type/create?kost_id=${kostId}&kost_type_id=${kostType.id}&step=${kostType.progress_step}`}
                >
                  Lengkapi Data
                </Link>
              </Button>
            </div>
          )}

          {kostType.status === "Aktif" && (
            <>
              <Button className="w-full" size="default" variant="outline">
                <Link href={`${kostType.id}/rooms`}>
                  Atur Ketersediaan Kamar
                </Link>
              </Button>
              <div className="flex space-x-2 justify-center w-full">
                <Button
                  className="w-[48%]"
                  size="default"
                  variant="outline"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Hapus
                </Button>
                <Button className="w-[48%]" size="default" variant="outline">
                  <Link
                    href={`/dashboard/kost-type/edit?kost_id=${kostId}&kost_type_id=${kostType.id}`}
                  >
                    Edit
                  </Link>
                </Button>
              </div>
              <Button
                className="w-full"
                size="default"
                variant="link"
                onClick={() => setShowDetails((prev) => !prev)}
              >
                {showDetails ? "Sembunyikan" : "Lihat Selengkapnya"}
              </Button>
            </>
          )}
        </div>
      </div>
      <ConfirmDeleteModal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          deleteMutation.mutate();
          setShowDeleteModal(false);
        }}
        title={`Hapus ${kostType.nama_tipe}?`}
        description="Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
};

export default KostTypeCard;
