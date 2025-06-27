export type Billing = {
  id: string;
  total: number;
  status: "unpaid" | "paid" | "expired";
  dueDate: string;
  invoice: string;
  namaKost: string;
  fotoKamar: string;
  alamat: string;
  tanggalMasuk: string;
  tanggalKeluar: string;
  durasi: string;
  hasPayment: boolean;
};

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "success" | "failed" | "expired";
  payment_method: string;
  payment_type: string;
  transaction_time: string;
  expiry_time: string;
  bank: string | null;
  va_number: string | null;
  bill_key: string | null;
  biller_code: string | null;
  qris_url: string | null;
  deeplink: string | null;
};

export type CreatePaymentPayload = {
  provider: string;
};
