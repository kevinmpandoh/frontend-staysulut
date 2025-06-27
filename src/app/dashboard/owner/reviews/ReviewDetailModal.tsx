// components/review/ReviewDetailModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { reviewService } from "@/services/review.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  data: any | null;
};

export const ReviewDetailModal = ({ open, onClose, data }: Props) => {
  const [balasan, setBalasan] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => reviewService.replyReview(data._id, balasan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner-review"] });
      onClose();
    },
  });

  if (!data) return null;

  const ratingStars = Array.from({ length: data.rating });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex items-center gap-3">
            <Image
              src={"/profile-default.png"}
              alt="Foto Penyewa"
              width={40}
              height={40}
              className="rounded-full w-10 h-10 object-cover"
            />
            <div>
              <div className="font-semibold">
                {data.penyewa?.nama || "Penyewa"}
              </div>
              <div className="text-xs text-gray-500">
                Kamar: {data.booking.room.nomor_kamar}
              </div>
            </div>
          </div>

          <div>
            <strong>Kost:</strong> {data.kost_type?.nama_tipe ?? "-"}
          </div>

          <div className="flex items-center gap-1">
            <strong>Rating:</strong>
            {ratingStars.map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>

          <div>
            <strong>Tanggal Review:</strong>
            <br />
            {format(new Date(data.createdAt), "dd MMMM yyyy", { locale: id })}
          </div>

          <div>
            <strong>Komentar:</strong>
            <p className="mt-1 whitespace-pre-line">{data.komentar}</p>
          </div>

          {data.reply ? (
            <div className="border rounded p-3 bg-gray-50">
              <strong>Balasan:</strong> <br />
              <span>{data.reply.message}</span>
            </div>
          ) : (
            <div className="space-y-2">
              <Textarea
                placeholder="Tulis balasan..."
                value={balasan}
                onChange={(e) => setBalasan(e.target.value)}
              />
              <DialogFooter>
                <Button
                  onClick={() => mutate()}
                  disabled={!balasan || isPending}
                >
                  {isPending ? "Mengirim..." : "Kirim Balasan"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </div>

        {/* <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};
