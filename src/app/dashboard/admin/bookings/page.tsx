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
import { Button } from "@/components/ui/button";
import { Eye, Pen } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { bookingService } from "@/services/booking.service";
import { BookingDetailDialog } from "./BookingDetailDialog";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter, useSearchParams } from "next/navigation";
import ReviewPagination from "../reviews/ReviewPagination";
import { BookingEditDialog } from "./BookingEditDialog";

const AdminBooking = () => {
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [editingBooking, setEditingBooking] = useState<any | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") ?? "1");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: bookingService.getAdminBookings,
  });

  const { mutate: updateBooking, isPending } = useMutation({
    mutationFn: ({ id, values }: { id: string; values: any }) =>
      bookingService.updateBooking(id, values),
    onSuccess: () => {
      // toast({ title: "Berhasil", description: "Booking berhasil diperbarui" });
      // setEditingBooking(null);
      // queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
    },
    onError: () => {},
  });

  const bookings = data?.data || [];

  const pagination = data?.pagination;

  const currentPage = Math.max(1, page);

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/dashboard/admin/bookings?${params.toString()}`);
  };
  return (
    <div className="bg-white w-full rounded-lg shadow-md p-6 mt-8 overflow-x-auto">
      <h2 className="font-semibold mb-4 text-xl">Payout ke Pemilik Kost</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Nama Penyewa</TableHead>
              <TableHead>Nama Kost</TableHead>
              <TableHead>Tanggal Masuk</TableHead>
              <TableHead>Tanggal Keluar</TableHead>
              <TableHead>Durasi</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking: any, index: number) => (
              <TableRow key={booking._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{booking.penyewa?.name ?? "-"}</TableCell>
                <TableCell>{booking.kost?.name ?? "-"}</TableCell>
                <TableCell>
                  {booking.tanggal_masuk
                    ? format(new Date(booking.tanggal_masuk), "dd MMM yyyy", {
                        locale: id,
                      })
                    : "-"}
                </TableCell>
                <TableCell>
                  {booking.tanggal_selesai
                    ? format(new Date(booking.tanggal_selesai), "dd MMM yyyy", {
                        locale: id,
                      })
                    : "-"}
                </TableCell>
                <TableCell>{booking.durasi ?? "-"} Bulan</TableCell>
                <TableCell>
                  Rp{" "}
                  {booking.total_harga?.toLocaleString("id-ID", {
                    minimumFractionDigits: 0,
                  })}
                </TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingBooking(booking)}
                    >
                      <Pen className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {!bookings.length && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  Tidak ada data booking saat ini.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Pagination Controls */}
      {pagination && (
        <div className="mt-6">
          <ReviewPagination
            page={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <BookingDetailDialog
        open={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        data={selectedBooking}
      />

      <BookingEditDialog
        open={!!editingBooking}
        onClose={() => setEditingBooking(null)}
        data={editingBooking}
        loading={isPending}
        onSubmit={(values) => updateBooking({ id: editingBooking._id, values })}
      />
    </div>
  );
};

export default AdminBooking;
