// app/user/profile/page.tsx

"use client";

import { useState } from "react";

import InformasiAkun from "@/components/user/InformasiAkun";
import PreferensiPengguna from "@/components/user/UserPreference";
import ProfileTabs from "@/components/user/ProfileTabs";

export default function UserProfilePage() {
  const [tab, setTab] = useState("Informasi Akun");

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Profil Saya</h2>

      <ProfileTabs onChange={setTab} />
      <hr className="border-t border-[#E4E4E7] my-4" />

      {tab === "Informasi Akun" && <InformasiAkun />}
      {tab === "Preferensi" && <PreferensiPengguna />}
    </>
  );
}
