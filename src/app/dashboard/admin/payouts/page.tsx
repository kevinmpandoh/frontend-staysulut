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
import { getAllPayout, sendPayout } from "@/services/payout.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { SendPayoutDialog } from "./SendPayoutDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PayoutDetailDialog } from "./PayoutDetailDialog";

const AdminPayout = () => {
  const [selectedPayoutId, setSelectedPayoutId] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<any | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-payouts"],
    queryFn: () => getAllPayout(),
  });

  const { mutate: send, isPending } = useMutation({
    mutationFn: sendPayout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-payouts"] });
      setSelectedPayoutId(null);
    },
  });

  const payouts = data || [];

  console.log(payouts);

  return (
    <div className="bg-white w-full rounded-lg shadow-md p-6 mt-8 overflow-x-auto">
      <h2 className="font-semibold mb-4 text-xl">Payout ke Pemilik Kost</h2>

      {isLoading && <h1>Loading</h1>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Nama Pemilik</TableHead>
            <TableHead>Nama Kost</TableHead>
            <TableHead>Rekening</TableHead>
            <TableHead>Tanggal Payout</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payouts.map((payout: any, index: number) => {
            const owner = payout.owner;
            const rekeningLengkap =
              owner?.rekening_bank?.nama_bank &&
              owner?.rekening_bank?.nomor_rekening;
            const status = payout.status;

            return (
              <TableRow key={payout._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{owner?.name ?? "-"}</TableCell>
                <TableCell>{payout.kost_name ?? "-"}</TableCell>
                <TableCell>
                  {rekeningLengkap ? (
                    <>
                      <div className="font-medium">
                        {owner?.rekening_bank?.nama_bank}
                      </div>
                      <div className="text-sm text-gray-500">
                        {owner?.rekening_bank?.nomor_rekening}
                      </div>
                    </>
                  ) : (
                    <span className="text-red-500 italic text-sm">
                      Belum diisi
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {format(new Date(payout.tanggal_transfer), "dd MMM yyyy", {
                    locale: id,
                  })}
                </TableCell>
                <TableCell>
                  Rp{" "}
                  {payout.jumlah?.toLocaleString("id-ID", {
                    minimumFractionDigits: 0,
                  })}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      status === "success" && "bg-green-100 text-green-700",
                      status === "Menunggu Rekening" &&
                        "bg-yellow-100 text-yellow-700",
                      status === "Gagal" && "bg-red-100 text-red-700",
                      status === "processed" && "bg-blue-100 text-blue-700"
                    )}
                  >
                    {status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedDetail(payout)}
                        >
                          Lihat Detail
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Lihat detail informasi payout</p>
                      </TooltipContent>
                    </Tooltip>

                    {(status === "failed" ||
                      (status === "pending" && rekeningLengkap)) && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant={
                              status === "failed" ? "outline" : "default"
                            }
                            onClick={() => setSelectedPayoutId(payout._id)}
                          >
                            {status === "failed" ? "Retry" : "Kirim"}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {status === "failed"
                              ? "Coba kirim ulang payout yang gagal"
                              : "Kirim payout ke pemilik"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {!payouts.length && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4 text-black">
                Tidak ada data payout saat ini.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <SendPayoutDialog
        open={!!selectedPayoutId}
        onClose={() => setSelectedPayoutId(null)}
        onConfirm={() => selectedPayoutId && send(selectedPayoutId)}
        loading={isPending}
      />
      <PayoutDetailDialog
        open={!!selectedDetail}
        onClose={() => setSelectedDetail(null)}
        data={selectedDetail}
      />
    </div>
  );
};

export default AdminPayout;
