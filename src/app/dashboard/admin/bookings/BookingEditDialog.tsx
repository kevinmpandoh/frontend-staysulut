"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  data: any;
  onSubmit: (values: { status: string; tanggal_keluar?: string }) => void;
  loading?: boolean;
}

export const BookingEditDialog = ({
  open,
  onClose,
  data,
  onSubmit,
  loading,
}: Props) => {
  const [status, setStatus] = useState(data?.status || "");
  const [tanggalKeluar, setTanggalKeluar] = useState(
    data?.tanggal_keluar
      ? new Date(data.tanggal_keluar).toISOString().split("T")[0]
      : ""
  );

  const handleSubmit = () => {
    onSubmit({ status, tanggal_keluar: tanggalKeluar });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <Label>Tanggal Masuk (Opsional)</Label>
            <Input
              type="date"
              value={tanggalKeluar}
              onChange={(e) => setTanggalKeluar(e.target.value)}
            />
          </div>

          <div>
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Menunggu Pembayaran">
                  Menunggu Pembayaran
                </SelectItem>
                <SelectItem value="Menunggu Check-In">
                  Menunggu Check-In
                </SelectItem>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Berhenti">Berhenti</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
