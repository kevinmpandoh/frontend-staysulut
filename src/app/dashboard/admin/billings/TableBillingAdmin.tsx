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

const TableBillingOwner = ({ billings }: { billings: any }) => {
  console.log(billings);
  return (
    <>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead className="w-[100px]">No. Invoice</TableHead>
            <TableHead className="w-[100px]">Nama Penyewa</TableHead>
            <TableHead>Nama Kost</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Keterangan</TableHead>
            <TableHead>Jatuh Tempo</TableHead>
            <TableHead className="text-right">Total Tagihan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billings.map((billing: any, index: number) => (
            <TableRow key={billing.invoice}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{billing.invoice}</TableCell>
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
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {billing.tenantName ?? "-"}
                    </span>
                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                      {/* Opsional: Email atau no kamar */}
                      &nbsp;
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>Kost Vinshi Tipe A (Kamar 2)</TableCell>
              <TableCell>
                {billing.status} | {}
              </TableCell>
              <TableCell>
                {billing.is_due_today
                  ? "Jatuh tempo hari ini"
                  : billing.is_late
                  ? `Terlambat ${billing.days_late} hari`
                  : `Tersisa ${billing.days_remaining} hari`}
              </TableCell>
              <TableCell>1 Jan, 2025</TableCell>
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
