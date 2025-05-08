import { PaymentMethod } from "@/types/paymentMethod.type";
import React from "react";

export const PaymentCTA = ({
  creatingPayment,
  handleClick,
  confirmedMethod,
}: {
  creatingPayment: boolean;
  handleClick: () => void;
  confirmedMethod: PaymentMethod | null;
}) => {
  return (
    <button
      onClick={handleClick}
      disabled={creatingPayment || !confirmedMethod}
      className="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-colors duration-200 select-none"
    >
      {creatingPayment ? "Memproses..." : "Bayar Sekarang"}
    </button>
  );
};
