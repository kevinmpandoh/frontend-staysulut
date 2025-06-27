import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Billing = {
  id: string;
  invoice: string;
  dueDate: string;
  status: "paid" | "unpaid";
  monthNumber: number;
  total: number;
  days_remaining: number;
  is_due_today: boolean;
  is_late: boolean;
  days_late: number;
};

type Props = {
  billing: Billing;
};

const BillingCard: React.FC<Props> = ({ billing }) => {
  const canPay =
    billing.status === "unpaid" &&
    !billing.is_late &&
    billing.days_remaining <= 14;

  const renderDueStatus = () => {
    if (billing.status === "paid") return null;
    if (billing.is_late) {
      return (
        <p className="text-red-600 text-sm">
          Telat {billing.days_late} hari dari jatuh tempo
        </p>
      );
    } else if (billing.is_due_today) {
      return <p className="text-orange-500 text-sm">Hari ini jatuh tempo</p>;
    } else {
      return (
        <p className="text-gray-600 text-sm">
          Jatuh tempo dalam {billing.days_remaining} hari
        </p>
      );
    }
  };

  return (
    <div className="rounded-lg border shadow-sm p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{billing.invoice}</span>
        <span
          className={`font-semibold ${
            billing.status === "paid" ? "text-green-500" : "text-orange-500"
          }`}
        >
          {billing.status === "paid" ? "Sudah Dibayar" : "Menunggu Pembayaran"}
        </span>
      </div>
      <div className="flex justify-between mt-2">
        <div>
          <p className="font-semibold text-gray-900">Kost Vinshi</p>
          <p className="text-xs text-gray-500">
            Pembayaran bulan ke-{billing.monthNumber}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Jatuh Tempo</p>
          <p className="text-sm text-gray-800">{billing?.dueDate}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Total Pembayaran</p>
          <p className="text-base font-bold text-gray-900">{billing?.total}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          {renderDueStatus()}
          {/* <p className="text-sm text-red-600">{statusText}</p> */}
        </div>
        {canPay && (
          <Button>
            <Link href={`/user/pembayaran?invoice=${billing.invoice}`}>
              Bayar Sekarang
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default BillingCard;
