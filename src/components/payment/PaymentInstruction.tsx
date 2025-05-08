import Image from "next/image";
import React from "react";
import type { Payment } from "@/types/billing.type";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { Copy } from "lucide-react";

interface PaymentInstructionProps {
  payment: Payment;
}

export const PaymentInstruction = ({ payment }: PaymentInstructionProps) => {
  return (
    <div className="mb-8">
      <p className="font-semibold mb-4">Silahkan bayar melalui</p>

      <div className="flex flex-col space-y-4 text-base font-normal">
        <div className="flex items-center justify-between">
          <span>Nama Bank</span>
          <span className="flex items-center space-x-1">
            <Image
              src="/logos/bank/bni.png"
              alt="BNI bank logo in orange and blue"
              width={38}
              height={38}
              className="w-8 h-8 object-contain"
            />
            <span>Bank BNI</span>
          </span>
        </div>

        {payment.payment_type === "echannel" ? (
          <>
            <div className="flex items-center justify-between">
              <span>Kode Perusahaan</span>
              <button
                onClick={() => copyToClipboard("70012")}
                className="flex items-center space-x-1 font-semibold text-gray-700 cursor-pointer"
              >
                <Copy size={18} />
                <span>{payment.biller_code}</span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span>Nomor Virtual Account</span>
              <button
                onClick={() => copyToClipboard("0812391823791283")}
                className="flex items-center space-x-1 font-semibold text-gray-700 cursor-pointer"
              >
                <Copy size={18} className="text-gray-600" />
                <span>{payment.bill_key}</span>
              </button>
            </div>
          </>
        ) : payment.payment_type === "bank_transfer" ? (
          <>
            <div className="flex items-center justify-between">
              <span>Nomor Virtual Account</span>
              <button
                onClick={() => copyToClipboard(payment.va_number)}
                className="flex items-center space-x-1 font-semibold text-gray-700 cursor-pointer"
              >
                <Copy size={18} className="text-gray-600" />
                <span>{payment.va_number}</span>
              </button>
            </div>
          </>
        ) : payment.payment_type === "gopay" ? (
          <div>
            <p>Scan QR Code berikut:</p>
            <img
              src={payment?.qris_url || ""}
              alt="QR Code"
              width={300}
              height={300}
            />
          </div>
        ) : null}

        <div className="flex items-center justify-between">
          <span>Total Pembayaran</span>
          <button
            onClick={() => copyToClipboard(payment.amount.toString())}
            className="flex items-center space-x-1 font-bold text-gray-700 cursor-pointer"
          >
            <Copy size={18} />
            <span>Rp {payment.amount.toLocaleString("id-ID")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
