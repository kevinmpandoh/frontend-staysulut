"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roomService } from "@/services/room.service";
import { ModalTambahEditRoom } from "./ModalTambahEditRoom";
import ConfirmDeleteModal from "@/components/ui/ConfirmModalDelete";
// import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

const KetersediaanKamarPage = () => {
  const params = useParams();
  const kostTypeId = params.kostTypeId as string;
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10; // jumlah data per halaman
  const [filterStatus, setFilterStatus] = useState("all");
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

  const { data: rooms, isLoading } = useQuery({
    queryKey: ["owner-room", kostTypeId],
    queryFn: () => roomService.getRoomsByKostType(kostTypeId),
    enabled: !!kostTypeId,
  });

  useEffect(() => {
    setPage(1);
  }, [search, filterStatus]);

  const deleteMutation = useMutation({
    mutationFn: (roomId: string) => roomService.deleteRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner-room", kostTypeId] });
      setRoomToDelete(null);
    },
  });

  const filteredRooms = (rooms || []).filter((kamar: any) => {
    const matchesSearch = kamar.nomor_kamar
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      kamar.status_ketersediaan.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const paginatedRooms = filteredRooms.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredRooms.length / limit);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Atur Ketersediaan Kamar</h1>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Cari nama atau nomor kamar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="Tersedia">Tersedia</SelectItem>
              <SelectItem value="Terisi">Terisi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ModalTambahEditRoom kostTypeId={kostTypeId} />
      </div>

      <div className="bg-white rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nomor Kamar</TableHead>
              <TableHead>Lantai</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading && paginatedRooms.length > 0 ? (
              paginatedRooms.map((kamar: any, index: number) => (
                <TableRow
                  key={kamar._id}
                  className={index % 2 === 1 ? "bg-muted" : ""}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{kamar.nomor_kamar}</TableCell>
                  <TableCell>{kamar.lantai}</TableCell>
                  <TableCell>
                    <span
                      className={`text-base px-2 py-1 rounded ${
                        kamar.status_ketersediaan === "Tersedia"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {kamar.status_ketersediaan}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <ModalTambahEditRoom
                      kostTypeId={kostTypeId}
                      defaultValues={{
                        _id: kamar._id,
                        nomor_kamar: kamar.nomor_kamar,
                        lantai: kamar.lantai,
                        status_ketersediaan: kamar.status_ketersediaan,
                      }}
                      trigger={
                        <Button variant="ghost" size={"icon"}>
                          <SquarePen size={24} className="text-primary" />
                        </Button>
                      }
                    />
                    <Button
                      variant="ghost"
                      size={"icon"}
                      onClick={() => setRoomToDelete(kamar._id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  {isLoading ? "Memuat data..." : "Tidak ada kamar ditemukan."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Sebelumnya
          </Button>

          <span className="text-sm">
            Halaman {page} dari {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Berikutnya
          </Button>
        </div>
      )}

      {/* Modal konfirmasi hapus */}
      <ConfirmDeleteModal
        open={!!roomToDelete}
        onConfirm={() => {
          if (roomToDelete) deleteMutation.mutate(roomToDelete);
        }}
        onCancel={() => setRoomToDelete(null)}
        // loading={deleteMutation.isPending}
        title="Hapus Kamar"
        description="Apakah Anda yakin ingin menghapus kamar ini?"
      />
    </div>
  );
};

export default KetersediaanKamarPage;
