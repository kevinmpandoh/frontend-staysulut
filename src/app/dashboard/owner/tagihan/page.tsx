"use client";
import React, { useMemo } from "react";
import TableBillingOwner from "./TableBillingOwner";
import { useOwnerBilling } from "@/hooks/useBillingOwner";
import { useRouter, useSearchParams } from "next/navigation";
import { parse, format } from "date-fns";
import { id } from "date-fns/locale";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SimpleMonthPicker from "./MonthPicker";
import { Calendar } from "lucide-react";

const BillingOwner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "unpaid";

  const search = searchParams.get("search") || "";
  const monthParam = searchParams.get("month") || ""; // format "2025-06"

  // Convert to Date if valid
  const selectedMonth = useMemo(() => {
    if (!monthParam) return new Date(); // bulan ini
    const parsed = parse(monthParam, "yyyy-MM", new Date());
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [monthParam]);

  const { billings, loadingBillings } = useOwnerBilling({
    status,
    search,
    month: monthParam,
  });

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  const handleMonthSelect = (date: Date) => {
    const formatted = format(date, "yyyy-MM");
    handleFilter("month", formatted);
  };

  if (loadingBillings) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">Memuat data tagihan...</span>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Tagihan Sewa</h1>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
        <div className="relative max-w-md w-full">
          <input
            type="text"
            defaultValue={search}
            placeholder="Cari nama penyewa..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFilter("search", (e.target as HTMLInputElement).value);
              }
            }}
            className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary focus:border-primary text-gray-700 placeholder-gray-400"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white text-sm px-3 py-1.5 rounded-md hover:bg-primary/90"
            onClick={() => {
              const input = document.querySelector<HTMLInputElement>(
                'input[placeholder="Cari nama penyewa..."]'
              );
              if (input) {
                handleFilter("search", input.value);
              }
            }}
          >
            Cari
          </button>
        </div>

        {/* Month Picker */}
        <Popover>
          <PopoverTrigger asChild>
            {/* <button className="border px-3 py-2 rounded text-base hover:bg-gray-100">
              {selectedMonth
                ? format(selectedMonth, "MMMM yyyy", { locale: id })
                : "Pilih Bulan"}
            </button> */}
            <button className="flex items-center justify-between border px-4 py-2 rounded-md text-base text-gray-700 hover:bg-gray-100 w-full md:w-[300px]">
              <span>
                {selectedMonth
                  ? format(selectedMonth, "MMMM yyyy", { locale: id })
                  : "Pilih Bulan"}
              </span>
              <Calendar className="w-5 h-5 text-gray-500 ml-2" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-auto p-2">
            <SimpleMonthPicker
              selectedDate={selectedMonth ?? undefined}
              onSelect={handleMonthSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="bg-white p-6 rounded-lg overflow-x-auto">
        {/* Filter & Pencarian */}

        <div className="flex flex-wrap gap-2 items-center">
          {["unpaid", "paid"].map((s) => (
            <button
              key={s}
              onClick={() => handleFilter("status", s)}
              className={`py-1 px-3 rounded font-semibold border-2 ${
                status === s
                  ? "bg-primary border-primary text-white"
                  : "text-[#5e6c84] border-gray-300"
              }`}
            >
              {s === "all"
                ? "Semua"
                : s === "unpaid"
                ? "Belum Bayar"
                : "Sudah Bayar"}
            </button>
          ))}
        </div>

        {/* Tabel Tagihan */}
        {!billings || billings.length === 0 ? (
          <div className="mt-6 text-center text-gray-500">
            Tidak ada data tagihan
          </div>
        ) : (
          <div className="mt-6">
            <TableBillingOwner billings={billings} status={status} />
          </div>
        )}
      </div>
    </>
  );
};

export default BillingOwner;
