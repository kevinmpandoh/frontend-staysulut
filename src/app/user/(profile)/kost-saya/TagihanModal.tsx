"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import BillingList from "./[bookingId]/tagihan/BillingList";

export const TagihanModal = ({
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
          <DialogTitle>Tagihan Kost</DialogTitle>
        </DialogHeader>
        <div>
          <Tabs defaultValue="unpaid" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="unpaid">Belum Dibayar</TabsTrigger>
              <TabsTrigger value="paid">Sudah Dibayar</TabsTrigger>
            </TabsList>

            <TabsContent value="unpaid">
              <BillingList bookingId={bookingId} status="unpaid" />
            </TabsContent>

            <TabsContent value="paid">
              <BillingList bookingId={bookingId} status="paid" />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
