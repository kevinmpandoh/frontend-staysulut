"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PayoutDetailDialogProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

export const PayoutDetailDialog = ({
  open,
  onClose,
  data,
}: PayoutDetailDialogProps) => {
  if (!data) return null;

  const rekening = data.owner?.rekening_bank;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detail Payout</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <p>
            <strong>Nama Pemilik:</strong> {data.owner?.name ?? "-"}
          </p>
          <p>
            <strong>Nama Kost:</strong> {data.kost_name ?? "-"}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize">{data.status}</span>
          </p>
          <p>
            <strong>Jumlah:</strong> Rp {data.jumlah?.toLocaleString("id-ID")}
          </p>
          <p>
            <strong>Tanggal Transfer:</strong>{" "}
            {data.tanggal_transfer
              ? new Date(data.tanggal_transfer).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "-"}
          </p>
          <p>
            <strong>Bank:</strong> {rekening?.nama_bank ?? "-"}
          </p>
          <p>
            <strong>No Rekening:</strong> {rekening?.nomor_rekening ?? "-"}
          </p>
          <p>
            <strong>Nama Pemilik Rekening:</strong>{" "}
            {rekening?.nama_pemilik ?? "-"}
          </p>
          <p>
            <strong>Catatan:</strong> {data.notes ?? "-"}
          </p>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={onClose}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
