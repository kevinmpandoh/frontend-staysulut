"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface BillingItem {
  penyewa: string;
  tipe_kost: string;
  kamar: string;
  jumlah_tagihan: number;
  jatuh_tempo: string;
  invoice: string;
}

export const BillingHistory = ({
  data,
}: {
  data: BillingItem[] | undefined;
}) => {
  const total = data?.reduce((acc, item) => acc + item.jumlah_tagihan, 0) ?? 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-base md:text-lg">
          Tagihan Belum Dibayar di bulan ini
        </h2>
        {data && data.length > 0 && (
          <Link
            href="/owner/billing"
            className="text-sm text-brand-600 hover:underline"
          >
            Lihat Semua
          </Link>
        )}
      </div>

      {data && data.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">Nama Penyewa</TableHead>
              <TableHead>Kost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Jatuh Tempo</TableHead>
              <TableHead className="text-right">Total Tagihan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.invoice}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <Image
                        width={40}
                        height={40}
                        src={"/profile-default.png"}
                        alt="Foto Penyewa"
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm">
                        {item.penyewa}
                      </span>
                      <span className="block text-gray-500 text-theme-xs">
                        {item.invoice}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <span className="block font-medium text-gray-800 text-theme-sm">
                      {item.tipe_kost}
                    </span>
                    <span className="block text-gray-500 text-theme-xs">
                      Kamar {item.kamar}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-yellow-600 font-medium text-sm">
                    Belum Bayar
                  </span>
                </TableCell>
                <TableCell>
                  {format(new Date(item.jatuh_tempo), "dd MMMM yyyy", {
                    locale: id,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  Rp {item.jumlah_tagihan.toLocaleString("id-ID")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">
                Rp {total.toLocaleString("id-ID")}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="text-center text-gray-500 py-10">
          <p>Tidak ada tagihan yang belum dibayar.</p>
        </div>
      )}
    </div>
  );
};
