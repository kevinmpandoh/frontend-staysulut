import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React from "react";

const TableBillingOwner = ({
  billings,
  status,
}: {
  billings: any;
  status: string;
}) => {
  return (
    <>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[100px]">No. Invoice</TableHead> */}
            <TableHead className="w-[100px]">Nama Penyewa</TableHead>
            <TableHead>Status</TableHead>
            {status === "unpaid" && (
              <>
                <TableHead>Jatuh Tempo</TableHead>
                <TableHead>Keterlambatan</TableHead>
              </>
            )}
            {status === "paid" && (
              <>
                <TableHead>Tanggal Pembayaran</TableHead>
              </>
            )}
            <TableHead className="text-right">Total Tagihan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billings.map((billing: any) => (
            <TableRow key={billing.invoice}>
              {/* <TableCell>{billing.invoice}</TableCell> */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    <Image
                      width={40}
                      height={40}
                      src={"/profile-default.png"}
                      alt={"FOTO"}
                    />
                  </div>
                  <div>
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {billing.tenantName} | {billing.namaKost}
                    </span>
                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                      {billing.nomor_kamar} {billing.lantai}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {billing.status === "paid" ? (
                  <h1>
                    {billing.status_payout === "pending"
                      ? "Sedang Diporses Admin"
                      : billing.status_payout === "success"
                      ? "Sudah di transfer ke rekening Anda"
                      : "Di bayar di luar aplikasi"}
                  </h1>
                ) : (
                  "Belum Bayar"
                )}
              </TableCell>

              {status === "unpaid" && (
                <>
                  <TableCell>{billing.dueDate}</TableCell>
                  <TableCell>
                    {/* {billing.is_late
                      ? `${billing.days_late || 0} hari terlambat`
                      : billing.is_due_today
                      ? "Jatuh Tempo Hari Ini"
                      : "-"} */}

                    {billing.is_due_today ? (
                      <span className="text-yellow-600 dark:text-yellow-400">
                        Jatuh tempo hari ini
                      </span>
                    ) : billing.is_late ? (
                      <span className="text-red-600 dark:text-red-400">
                        Terlambat {billing.days_late} hari
                      </span>
                    ) : (
                      <span className="text-gray-800 dark:text-white/90">
                        Tenggat {billing.days_remaining} hari lagi
                      </span>
                    )}
                  </TableCell>
                </>
              )}

              {status === "paid" && (
                <>
                  <TableCell>
                    {/* Misalnya pakai billing.paidAt atau billing.updatedAt */}
                    {billing.dueDate ?? "-"}
                  </TableCell>
                </>
              )}

              <TableCell className="text-right">
                Rp {billing.total.toLocaleString("id-ID")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableBillingOwner;
