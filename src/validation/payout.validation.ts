// validations/payoutSchema.ts
import * as yup from "yup";

export const payoutSchema = yup.object({
  bank_name: yup.string().required("Nama bank wajib diisi"),
  account_number: yup
    .string()
    .required("Nomor rekening wajib diisi")
    .matches(/^\d+$/, "Nomor rekening harus berupa angka"),
  account_name: yup.string().required("Nama pemilik wajib diisi"),
});
