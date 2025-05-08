"use client";

import { Mail, Phone } from "lucide-react";
import { useState } from "react";

import { useAuthStore } from "@/stores/auth.store";
import { ProfilePicture } from "./ProfilePicture";
import { EditProfileModal } from "./EditProfileModal";
import { UserProfileInfo } from "./UserProfileInfo";
import { useTenant } from "@/hooks/useTenant";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "@/validation/tenant.validation";
import { useForm } from "react-hook-form";

export default function InformasiAkun() {
  const user = useAuthStore((state) => state.user);
  const { updateProfile, updatetingProfile, changePassword, isChanging } =
    useTenant();

  const [openEdit, setOpenEdit] = useState(false);

  const handleUpdateProfile = (data: any) => {
    updateProfile(data); // akan trigger ke backend dan re-fetch data
    setOpenEdit(false);
  };

  const handleSubmitPassword = (data: any) => {
    changePassword({
      password: data.old_password,
      newPassword: data.new_password,
    });
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  return (
    <>
      <main className="flex flex-col sm:flex-row gap-8 max-w-4xl w-full relative item">
        <section className="p-6 flex flex-col items-center justify-center text-center sm:w-56">
          <ProfilePicture src={user?.foto_profile ?? "/profile-default.png"} />

          <div className="text-gray-600 text-sm space-y-2">
            <p className="flex items-center justify-center gap-2">
              <Mail size={18} />
              {user?.email}
            </p>
            <p className="flex items-center justify-center gap-2">
              <Phone size={18} />
              {user?.phone}
            </p>
          </div>
        </section>

        <div className="hidden sm:block w-px bg-gray-200" />

        <section className=" flex-1 ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl text-[#0F172A]">Detail Akun</h2>
            <EditProfileModal
              open={openEdit}
              onOpenChange={setOpenEdit}
              user={user}
              onSubmit={handleUpdateProfile}
              isLoading={updatetingProfile}
            />
          </div>

          <UserProfileInfo
            name={user?.name ?? "User"}
            gender={user?.jenis_kelamin ?? null}
            pekerjaan={user?.pekerjaan ?? null}
            kota_asal={user?.kota_asal ?? null}
            kontakDarurat={user?.kontak_darurat ?? null}
            tanggal_lahir={user?.tanggal_lahir ?? null}
          />
        </section>
      </main>
      <hr className="my-6" />
      <section className="w-full mb-4">
        <h2 className="font-bold text-xl text-[#0F172A] mb-4">
          Ganti Kata Sandi
        </h2>
        <form
          onSubmit={handleSubmit(handleSubmitPassword)}
          className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-y-4 gap-x-6 max-w-2xl"
        >
          <label
            className="text-sm font-semibold text-[#1E293B] self-center"
            htmlFor="old-password"
          >
            Password Lama
          </label>
          <div>
            <input
              {...register("old_password")}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
              id="old-password"
              type="password"
            />
            {errors.old_password && (
              <p className="text-red-500 text-sm">
                {errors.old_password.message}
              </p>
            )}
          </div>

          <label
            className="text-sm font-semibold text-[#1E293B] self-center"
            htmlFor="new-password"
          >
            Password Baru
          </label>
          <div>
            <input
              {...register("new_password")}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
              id="new-password"
              type="password"
            />
            {errors.new_password && (
              <p className="text-red-500 text-sm">
                {errors.new_password.message}
              </p>
            )}
          </div>

          <label
            className="text-sm font-semibold text-[#1E293B] self-center"
            htmlFor="confirm-password"
          >
            Konfirmasi Password
          </label>
          <div>
            <input
              {...register("confirm_password")}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
              id="confirm-password"
              type="password"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <div></div>
          <button
            className="self-center sm:self-start bg-blue-600 text-white text-xs font-semibold rounded-md px-4 py-2 hover:bg-blue-700 transition"
            type="submit"
            disabled={isChanging}
          >
            {isChanging ? "Mengubah..." : "Ganti Password"}
          </button>
        </form>
      </section>
      <hr className="my-6" />
      <section className="mb-4">
        <h2 className="font-bold text-xl text-[#0F172A] mb-4">
          Verifikasi Akun
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail size={24} />
              <div className="text-lg">
                <p className="font-semibold text-[#1E293B]">Email</p>
                <p className="text-sm font-bold text-[#475569]">
                  {user?.isVerified ? "Terverifikasi" : "Belum Verifikasi"}
                </p>
              </div>
            </div>
            <button
              className="text-blue-600 border border-blue-600 rounded-md text-sm font-semibold px-4 py-1 hover:bg-blue-50 transition"
              type="button"
            >
              {user?.isVerified ? "Ubah Email" : "Verifikasi Sekarang"}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Phone />
              <div className="text-lg">
                <p className="font-semibold text-[#1E293B]">Nomor Handphone</p>
                <p className="text-sm font-bold text-[#475569]">
                  Belum Verifikasi
                </p>
              </div>
            </div>
            <button
              className="text-blue-600 border border-blue-600 rounded-md text-xs font-semibold px-4 py-1 hover:bg-blue-50 transition"
              type="button"
            >
              Verifikasi
            </button>
          </div>
        </div>
      </section>
      <hr className="my-6" />
      <section className="">
        <h2 className="font-bold text-xl text-[#0F172A] mb-4">Hapus Akun</h2>
        <div className="flex items-center justify-between ">
          <p className="text-sm font-semibold text-[#1E293B]">
            Hapus Akun Permanen
          </p>
          <button
            className="text-red-600 border border-red-600 rounded-md text-xs font-bold px-4 py-1 hover:bg-red-50 transition"
            type="button"
          >
            Hapus
          </button>
        </div>
      </section>
    </>
  );
}
