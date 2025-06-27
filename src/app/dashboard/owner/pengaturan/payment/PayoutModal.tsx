"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { payoutSchema } from "@/validation/payout.validation";
import { useUpdatePayout } from "@/hooks/usePayout";
import { useBanks } from "@/hooks/useBanks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
// import { useUpdatePayout } from "@/hooks/usePayout";

export default function PayoutModal({
  open,
  onOpenChange,
  defaultValues,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  defaultValues?: {
    bank_name: string;
    account_number: string;
    account_name: string;
  };
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(payoutSchema),
    defaultValues,
  });

  const { mutate, isPending } = useUpdatePayout();
  const { data: banks } = useBanks();
  useEffect(() => {
    if (open && defaultValues) {
      reset(defaultValues);
    }
  }, [open, defaultValues, reset]);

  const onSubmit = (data: any) => {
    mutate(
      {
        nama_bank: data.bank_name,
        nama_pemilik: data.account_name,
        nomor_rekening: data.account_number,
      },
      {
        onSuccess: () => onOpenChange(false),
      }
    );
  };

  const selectedBankCode = watch("bank_name");
  // const selectedBank = banks?.find((b: any) => b.code === selectedBankCode);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informasi Pembayaran</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Nama Bank</label>
            <Select
              onValueChange={(value) => setValue("bank_name", value)}
              defaultValue={defaultValues?.bank_name}
              value={selectedBankCode}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Bank" />
              </SelectTrigger>
              <SelectContent>
                {banks?.map((bank: any) => (
                  <SelectItem key={bank.code} value={bank.code}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.bank_name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.bank_name.message}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder="Nomor Rekening"
              {...register("account_number")}
            />
            {errors.account_number && (
              <p className="text-sm text-red-500">
                {errors.account_number.message}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder="Nama Pemilik Rekening"
              {...register("account_name")}
            />
            {errors.account_name && (
              <p className="text-sm text-red-500">
                {errors.account_name.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
