"use client";
import { Button } from "@/components/ui/button";
import { useOwner } from "@/hooks/useOwner";
import { CircleUserRound, Loader2, Mail, Phone } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOwnerProfile } from "@/services/owner.service";
import { EditNameDialog } from "./EditNameDialog";
import { EditPhoneDialog } from "./EditPhoneDialog";

const OwnerProfile = () => {
  const [openEditName, setOpenEditName] = useState(false);
  const [openEditPhone, setOpenEditPhone] = useState(false);
  const queryClient = useQueryClient();

  // const { user } = useAuthStore();
  const { uploadPhoto, getCurrentOwner } = useOwner();

  const user = getCurrentOwner.data;

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: updateOwnerProfile,
    onSuccess: () => {
      // toast({ title: "Berhasil", description: "Profil diperbarui." });
      setOpenEditName(false);
      setOpenEditPhone(false);
      queryClient.invalidateQueries({ queryKey: ["ownerCurrent"] });
    },
  });

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // setPreview(URL.createObjectURL(file)); // instant preview
    uploadPhoto.mutate(file);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Profile Saya</h1>
      <p className="text-gray-600 mb-6">
        Atur informasi akun Anda, termasuk profil, keamanan, dan pembayaran.
      </p>
      {/* Content for Pengaturan Owner goes here */}
      <section className="flex">
        <div className="relative group mr-10">
          <Image
            alt="Foto Profil"
            className="w-32 h-32 rounded-2xl object-cover mb-2 transition-opacity"
            src={user?.foto_profil || "/profile-default.png"}
            width={120}
            height={120}
          />
          {uploadPhoto.isPending && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl">
              <Loader2 className="animate-spin w-6 h-6 text-gray-700" />
            </div>
          )}
          <label className="cursor-pointer text-sm text-blue-600 font-semibold">
            <span className="underline">Ganti Foto</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>
        <div className="space-y-6 w-[80%]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CircleUserRound className="text-gray-600 text-lg" />
              <div>
                <p className="text-base font-semibold text-gray-900 leading-tight">
                  Nama Lengkap
                </p>
                <p className="text-base text-gray-500 leading-tight">
                  {user?.name}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setOpenEditName(true)}>
              Ubah
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Phone className="text-gray-600 text-lg" />
              <div>
                <p className="text-base font-semibold text-gray-900 leading-tight">
                  Nomor Handphone
                </p>
                <p className="text-base text-gray-500 leading-tight">
                  {user?.phone}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setOpenEditPhone(true)}>
              Ubah
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="text-gray-600 text-lg" />
              <div>
                <p className="text-base font-semibold text-gray-900 leading-tight">
                  Email
                </p>
                <p className="text-base text-gray-500 leading-tight">
                  {user?.email}
                </p>
              </div>
            </div>
            {/* <Button variant={"outline"}>Verifikasi</Button> */}
          </div>
        </div>
      </section>
      <EditNameDialog
        open={openEditName}
        onClose={() => setOpenEditName(false)}
        defaultName={user?.name || ""}
        loading={isPending}
        onSubmit={(values) => {
          if (!user) return;
          updateProfile({ name: values.name, phone: user?.phone });
        }}
      />

      <EditPhoneDialog
        open={openEditPhone}
        onClose={() => setOpenEditPhone(false)}
        defaultPhone={user?.phone || ""}
        loading={isPending}
        onSubmit={(values) => {
          if (!user) return;
          updateProfile({ name: user?.name, phone: values.phone });
        }}
      />
    </>
  );
};

export default OwnerProfile;
