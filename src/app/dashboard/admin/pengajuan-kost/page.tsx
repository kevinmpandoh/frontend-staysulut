"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { KostService } from "@/services/kost.service";
import RejectKostModal from "./RejectKostModal";
import ConfirmDeleteModal from "@/components/ui/ConfirmModalDelete";

const AdminKostSubmissionsPage = () => {
  const router = useRouter();
  const [selectedKost, setSelectedKost] = useState<any>(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-kost-submissions"],
    queryFn: () => KostService.getKostSubmission(),
  });

  const { mutate: approveKost } = useMutation({
    mutationFn: (kostId: string) => KostService.approveKost(kostId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kost"] }); // Refresh booking list
    },
  });
  const { mutate: rejectKost } = useMutation({
    mutationFn: ({ kostId, reason }: { kostId: string; reason: string }) =>
      KostService.rejectKost(kostId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kost"] }); // Refresh booking list
    },
  });

  const kosts = data?.data || [];

  if (isLoading) return <p>Loading...</p>;

  const handleAccept = async () => {
    approveKost(selectedKost._id);

    setShowAcceptModal(false);
    refetch();
  };

  const handleReject = async (reason: string) => {
    rejectKost({ kostId: selectedKost._id, reason });

    setShowRejectModal(false);
    refetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pengajuan Kost Baru</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">No.</TableHead>
            <TableHead>Kost</TableHead>
            <TableHead>Nama Pemilik</TableHead>
            <TableHead>Tanggal Diajukan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kosts.map((kost: any, i: number) => (
            <TableRow
              key={kost._id}
              className="hover:bg-muted cursor-pointer"
              onClick={() =>
                router.push(`/dashboard/admin/pengajuan-kost/${kost._id}`)
              }
            >
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    alt="Room"
                    className="rounded-md object-cover"
                    height={80}
                    width={110}
                    src={kost.photos?.[0].url || "/kost.jpg"}
                  />
                  <div>
                    <span className="block font-medium text-gray-800 dark:text-white/90">
                      {`${kost.nama_kost} - ${kost.kost_type[0].nama_tipe}`}
                    </span>
                    {/* <div className="flex items-center gap-1 text-sm ">
                      <MapPin size={18} />
                      <span className="overflow-auto">
                        {`${kost.alamat.kabupaten_kota} ${kost.alamat.kecamatan}` ||
                          "Lokasi tidak tersedia"}
                      </span>
                    </div> */}
                  </div>
                </div>
              </TableCell>
              <TableCell>{kost.pemilik?.name || "-"}</TableCell>
              <TableCell>
                {kost.createdAt
                  ? format(new Date(kost.createdAt), "d MMMM yyyy", {
                      locale: id,
                    })
                  : "-"}
              </TableCell>
              <TableCell>
                <span className="text-yellow-600 font-semibold">
                  {kost.status || "Menunggu Konfirmasi"}
                </span>
              </TableCell>
              <TableCell>
                <div
                  className="flex gap-2 items-center justify-center px-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedKost(kost);
                      setShowRejectModal(true);
                    }}
                  >
                    Tolak
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedKost(kost);
                      setShowAcceptModal(true);
                    }}
                  >
                    Terima
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDeleteModal
        open={showAcceptModal}
        onCancel={() => setShowAcceptModal(false)}
        onConfirm={handleAccept}
        title="Terima Pengajuan Kost?"
        description={`Apakah Anda yakin ingin menerima pengajuan kost "${selectedKost?.nama_kost}"?`}
      />

      {/* Modal Tolak dengan alasan */}
      <RejectKostModal
        open={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleReject}
      />
    </div>
  );
};

export default AdminKostSubmissionsPage;
