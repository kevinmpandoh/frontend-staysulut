import * as yup from "yup";

export const editProfileSchema = yup.object({
  name: yup
    .string()
    .min(2, "Nama minimal 2 karakter")
    .required("Nama wajib diisi"),
  jenis_kelamin: yup
    .string()
    .oneOf(["Laki-laki", "Perempuan"], "Pilih jenis kelamin")
    .required("Jenis kelamin wajib diisi"),
  pekerjaan: yup.string().required("Pekerjaan wajib diisi"),
  pekerjaan_lainnya: yup.string().when("pekerjaan", {
    is: "Lainnya",
    then: () => yup.string().required("Pekerjaan lainnya wajib diisi"),
    otherwise: () => yup.string().nullable(),
  }),
  kota_asal: yup
    .string()
    .min(2, "Kota Asal minimal 2 karakter")
    .required("Kota Asal wajib diisi"),
  tanggal_lahir: yup
    .string()
    .required("Tanggal lahir wajib diisi")
    .test("valid-date", "Tanggal lahir tidak valid", (value) => {
      return !isNaN(Date.parse(value ?? ""));
    }),
  kontak_darurat: yup
    .string()
    .matches(/^[0-9]+$/, "Kontak darurat harus berupa angka")
    .min(8, "Minimal 8 digit")
    .required("Kontak darurat wajib diisi"),
});

export const changePasswordSchema = yup.object({
  old_password: yup.string().required("Password lama wajib diisi"),
  new_password: yup
    .string()
    .min(6, "Password minimal 6 karakter")
    .required("Password baru wajib diisi"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Konfirmasi password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
});
