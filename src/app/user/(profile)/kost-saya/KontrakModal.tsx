"use client";

import KontrakClient from "@/components/contract/tenantContract";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

export const KontrakModal = ({
  open,
  onClose,
  bookingId,
}: {
  open: boolean;
  onClose: () => void;
  bookingId: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kontrak Kost</DialogTitle>
        </DialogHeader>
        {/* Ganti ini dengan isi kontrak sebenarnya */}
        <KontrakClient bookingId={bookingId} />
      </DialogContent>
    </Dialog>
  );
};
