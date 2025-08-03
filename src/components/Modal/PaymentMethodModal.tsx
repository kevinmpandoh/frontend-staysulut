"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export type PaymentMethod = {
  name: string;
  logo: string;
  value: string;
};

type PaymentMethodCategory = {
  category: string;
  methods: PaymentMethod[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selected: PaymentMethod | null;
  setSelected: (method: PaymentMethod) => void;
  methods: PaymentMethodCategory[];
};

export const PaymentMethodDialog = ({
  isOpen,
  onClose,
  onConfirm,
  selected,
  setSelected,
  methods,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pilih Metode Pembayaran</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4 max-h-[60vh] overflow-y-auto">
          {methods.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold mb-2 text-gray-600">
                {group.category}
              </h3>
              <div className="space-y-2">
                {group.methods.map((method) => {
                  const isSelected = selected?.value === method.value;
                  return (
                    <label
                      key={method.value}
                      className={`w-full cursor-pointer flex items-center justify-between border rounded-md px-4 py-3 gap-2 transition ${
                        isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      {/* Kiri: Logo dan Nama */}
                      <div className="flex items-center gap-2">
                        <Image
                          src={method.logo}
                          alt={method.name}
                          className="object-contain"
                          width={24}
                          height={24}
                        />
                        <span>{method.name}</span>
                      </div>

                      {/* Kanan: Radio Button */}
                      <input
                        type="radio"
                        name="payment-method"
                        value={method.value}
                        checked={isSelected}
                        onChange={() => setSelected(method)}
                        className="accent-indigo-600 w-4 h-4"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button disabled={!selected} onClick={onConfirm}>
            Pilih
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
