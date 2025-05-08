"use client";
import { useAuthStore } from "@/stores/auth.store";
import React, { useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DurasiSelector from "./DurasiSelector";
import UploadDocument from "./UploadDocument";
import TanggalMasukModal from "./BookingDateModal";
import { useBooking } from "@/hooks/useBooking";

interface BookingFormProps {
  kostId: string; // id kost yang mau di-booking
  onSuccess: () => void;
}

interface FormValues {
  durasi: number;
  tanggalMasuk: string;
  ktp?: File | null | undefined; // ktp boleh null
  catatan?: string | null; // bukan opsional lagi
}

const schema = yup.object({
  durasi: yup.number().min(1, "Minimal 1 bulan").required(),
  tanggalMasuk: yup.string().required("Tanggal masuk wajib diisi"),
  // ktp: yup.mixed().nullable(), // nullable karena bisa null
  // catatan: yup.string().nullable(),
});

const BookingForm = ({ kostId, onSuccess }: BookingFormProps) => {
  const user = useAuthStore((state) => state.user);

  const { createBooking, creating } = useBooking();

  const [isTanggalModalOpen, setIsTanggalModalOpen] = useState(false);

  const openTanggalModal = () => setIsTanggalModalOpen(true);
  const closeTanggalModal = () => setIsTanggalModalOpen(false);

  const onSubmit = async (data: FormValues) => {
    const date = new Date(data.tanggalMasuk);

    // Tetap dalam zona waktu lokal (misal GMT+8)
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // bulan 0-based
    const dd = String(date.getDate()).padStart(2, "0");

    const localDate = `${yyyy}-${mm}-${dd}`;

    try {
      await createBooking({
        durasi: data.durasi,
        kost_type: kostId,
        tanggal_masuk: localDate,
      });

      onSuccess(); // Kalau berhasil booking, trigger success
    } catch (error) {
      console.error(error);
      // Bisa kasih toast error atau alert kalau mau
    }
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      durasi: 1,
      tanggalMasuk: new Date().toISOString().split("T")[0],
      ktp: null, // ini bisa null
      catatan: "", // opsional
    },
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Pengajuan Sewa Kost</h1>
      {/* Informasi Peneywa */}

      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">Informasi Peneywa</h2>
        <a
          href="#"
          className="text-gray-700 text-sm font-semibold hover:underline"
        >
          Ubah Data Diri
        </a>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nama Lengkap</label>
          <div className="mt-1">{user?.name}</div>
        </div>
        <div>
          <label className="block text-sm font-medium">Nomor HP</label>
          <div className="mt-1">{user?.phone}</div>
        </div>
        <div>
          <label className="block text-sm font-medium">Jenis Kelamin</label>
          <div className="mt-1">{user?.jenis_kelamin} Laki-Laki </div>
        </div>
        <hr className="my-8 border-gray-200" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Durasi sewa kost
          </label>
          <Controller
            name="durasi"
            control={control}
            render={({ field }) => (
              <DurasiSelector value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.durasi && (
            <p className="text-red-500 text-sm mt-1">{errors.durasi.message}</p>
          )}
        </div>
        <hr className="my-8 border-gray-200" />

        <div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">
              Tanggal Masuk Kost
            </label>
            <button
              type="button"
              onClick={openTanggalModal}
              className="text-blue-600 text-sm"
            >
              Ubah Tanggal
            </button>
          </div>
          <p className="mt-2 text-gray-800">
            {watch("tanggalMasuk")
              ? new Date(watch("tanggalMasuk")).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "-"}
          </p>
        </div>

        <hr className="my-8 border-gray-200" />

        {/* Upload KTP */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Dokumen Persyaratan
          </label>
          <Controller
            name="ktp"
            control={control}
            render={({ field }) => <UploadDocument onChange={field.onChange} />}
          />
        </div>

        <hr className="my-8 border-gray-200" />
        <div>
          <label className="block text-sm font-medium">
            Catatan Tambahan (Opsional)
          </label>
          <textarea
            {...register("catatan")}
            className="w-full border rounded-lg px-3 py-2 mt-1"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={creating}
          className={`w-full bg-blue-600 text-white py-2 rounded-lg transition ${
            creating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {creating ? "Mengajukan..." : "Ajukan Sewa"}
        </button>
      </form>
      {/* Modal Tanggal Masuk */}
      <TanggalMasukModal
        isOpen={isTanggalModalOpen}
        onClose={closeTanggalModal}
        initialDate={watch("tanggalMasuk") || new Date()}
        onSave={(date) => {
          setValue("tanggalMasuk", date.toString());
        }}
      />
    </>
  );
};

export default BookingForm;
