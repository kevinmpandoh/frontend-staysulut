"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC, useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  type: "terima" | "tolak" | null;
  kamarOptions?: { _id: string; nomor_kamar: string }[]; // untuk pilihan kamar
}

const KonfirmasiModal: FC<Props> = ({
  open,
  onClose,
  onConfirm,
  type,
  kamarOptions = [],
}) => {
  const [selectedKamar, setSelectedKamar] = useState<string>("");
  const [alasan, setAlasan] = useState<string>("");

  const handleSubmit = () => {
    if (type === "terima") {
      onConfirm({ kamarId: selectedKamar });
    } else {
      onConfirm({ alasan });
    }
  };

  useEffect(() => {
    setSelectedKamar("");
    setAlasan("");
  }, [type, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "terima" ? "Terima Pengajuan" : "Tolak Pengajuan"}
          </DialogTitle>
        </DialogHeader>

        {type === "terima" ? (
          <>
            <label className="text-sm font-medium">Pilih Kamar</label>
            <Select value={selectedKamar} onValueChange={setSelectedKamar}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kamar tersedia" />
              </SelectTrigger>
              <SelectContent>
                {kamarOptions.map((kamar: any) => (
                  <SelectItem
                    key={kamar._id}
                    value={kamar._id}
                    disabled={kamar.status_ketersediaan !== "Tersedia"}
                  >
                    {kamar.nomor_kamar} (Lantai {kamar.lantai}){" "}
                    {kamar.status_ketersediaan === "Tersedia"
                      ? ""
                      : " - Terisi"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        ) : (
          <>
            <label className="text-sm font-medium">Alasan Penolakan</label>
            <textarea
              placeholder="Tulis alasan penolakan"
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
            />
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>Konfirmasi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default KonfirmasiModal;
