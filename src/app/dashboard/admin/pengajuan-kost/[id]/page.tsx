"use client";

import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RejectKostModal from "../RejectKostModal";
import ConfirmDeleteModal from "@/components/ui/ConfirmModalDelete";
import { KostService } from "@/services/kost.service";

const AdminKostDetailPage = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-kost-detail", id],
    queryFn: () => KostService.getKostDetailAdmin(id as string),
    enabled: !!id,
  });

  // const { mutate: approveKost, isPending: isApproving } = useMutation({
  //   mutationFn: (kostId: string) => KostService.approveKost(kostId),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["kost"] }); // Refresh booking list
  //   },
  // });
  const { mutate: rejectKost } = useMutation({
    mutationFn: ({ kostId, reason }: { kostId: string; reason: string }) =>
      KostService.rejectKost(kostId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kost"] }); // Refresh booking list
    },
  });

  const kost = data;

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleAccept = async () => {
    // await kostService.acceptKost(id as string);
    setShowAcceptModal(false);
    refetch();
  };

  const handleReject = async (reason: string) => {
    rejectKost({ kostId: "asd", reason });
    // await kostService.rejectKost(id as string, reason);
    setShowRejectModal(false);
    refetch();
  };

  if (isLoading || !kost) return <p>Loading...</p>;

  console.log(data, "DATA");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow">
      <h1 className="text-2xl font-bold mb-2">{kost.nama_kost}</h1>
      <p className="text-sm text-gray-600 mb-4">{kost.alamat.detail_alamat}</p>

      <div className="flex items-center gap-3 mb-4">
        <Image
          src={kost.owner?.avatar || "/profile-default.png"}
          width={40}
          height={40}
          alt="Owner"
          className="rounded-full"
        />
        <div>
          <p className="font-semibold">{kost.owner?.name}</p>
          <p className="text-sm text-gray-500">{kost.owner?.email}</p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-2">
        Diajukan pada: 1 Desember 2024
      </p>

      <h2 className="text-lg font-semibold mt-4 mb-1">Deskripsi</h2>
      <p className="mb-4">{kost.deskripsi}</p>

      <h2 className="text-lg font-semibold mb-1">Jenis Kost</h2>
      <p className="mb-4">{kost.jenis_kost}</p>

      <h2 className="text-lg font-semibold mb-1">Fasilitas</h2>
      <ul className="list-disc list-inside mb-4">
        {kost.fasilitas_kost?.map((f: any, index: number) => (
          <li key={index}>{f.nama_fasilitas}</li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mb-2">Foto Kost</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {kost.foto_kost?.map((photo: any, idx: number) => (
          <Image
            key={idx}
            src={photo.url}
            width={200}
            height={150}
            alt={`photo-${idx}`}
            className="rounded-md object-cover w-full h-[150px]"
          />
        ))}
      </div>

      {kost.status === "Menunggu Verifikasi" && (
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => setShowRejectModal(true)}>
            Tolak
          </Button>
          <Button onClick={() => setShowAcceptModal(true)}>Terima</Button>
        </div>
      )}

      {/* Modal Konfirmasi Terima */}
      <ConfirmDeleteModal
        open={showAcceptModal}
        onCancel={() => setShowAcceptModal(false)}
        onConfirm={handleAccept}
        title="Terima Pengajuan Kost"
        description="Apakah Anda yakin ingin menerima pengajuan kost ini?"
      />

      {/* Modal Tolak dengan Alasan */}
      <RejectKostModal
        open={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleReject}
      />
    </div>
  );
};

export default AdminKostDetailPage;
