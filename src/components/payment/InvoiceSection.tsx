import React from "react";

export const InvoiceSection = ({ invoice }: { invoice: string }) => (
  <>
    <div className="mb-8">
      <h2 className="font-semibold mb-2 select-text">No. Invoice</h2>
      <p className="text-gray-900 select-text">{invoice}</p>
      <hr className="border-t border-gray-200 mt-6" />
    </div>
    <div className="mb-8">
      <h2 className="font-semibold mb-2 select-text">Jenis Pembayaran</h2>
      <p className="text-gray-900 select-text">Bayar Kost</p>
      <hr className="border-t border-gray-200 mt-6" />
    </div>
  </>
);
