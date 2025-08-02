// components/ProfilePicture.tsx
"use client";

import { ChangeEvent } from "react";
import { useTenant } from "@/hooks/useTenant";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface ProfilePictureProps {
  src: string;
}

export const ProfilePicture = ({ src }: ProfilePictureProps) => {
  const { uploadPhoto } = useTenant();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // setPreview(URL.createObjectURL(file)); // instant preview
    uploadPhoto.mutate(file);
  };

  return (
    <div className="relative group">
      <Image
        alt="Foto Profil"
        className="w-32 h-32 rounded-2xl object-cover mb-2 transition-opacity"
        src={src}
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
  );
};
