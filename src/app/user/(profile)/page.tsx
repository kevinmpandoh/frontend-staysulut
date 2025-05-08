import React from "react";

const userPage = () => {
  return (
    <>
      <section
        aria-label="Profile information"
        className="bg-white rounded-lg p-8 flex-1"
        style={{ boxShadow: "0 4px 8px rgb(0 0 0 / 0.05)" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-[#000000]">Profil Saya</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mb-8">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
            <img
              alt="Profile picture of Kevin Pandoh, young person with short curly hair and pink background"
              className="w-full h-full object-cover"
              height="96"
              src="https://storage.googleapis.com/a1aa/image/fde928fd-a9db-4f90-8821-e32c8c2e3c0d.jpg"
              width="96"
            />
            <button
              aria-label="Edit profile picture"
              className="absolute bottom-0 right-0 bg-[#14B8A6] text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white hover:bg-[#0f766e]"
              type="button"
            >
              <i className="fas fa-pen text-xs"></i>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-w-xl">
          <div className="flex justify-between">
            <span className="font-semibold text-sm text-[#000000]">Nama</span>
            <span className="text-sm text-[#1E293B]">
              : Kevin Mclaren Pandoh
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-sm text-[#000000]">
              Jenis Kelamin
            </span>
            <span className="text-sm text-[#1E293B]">: Laki-laki</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-sm text-[#000000]">
              Tanggal Lahir
            </span>
            <span className="text-sm text-[#1E293B]">: 1 Desember 2001</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-sm text-[#000000]">
              Pekerjaan
            </span>
            <span className="text-sm text-[#1E293B]">: 1 Desember 2001</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-sm text-[#000000]">
              Kota Asal
            </span>
            <span className="text-sm text-[#1E293B]">: 1 Desember 2001</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-[#000000]">
              Nomor Kontak Darurat
            </span>
            <span className="text-sm text-[#1E293B]">: 089510465800</span>
            <button
              className="ml-6 bg-[#3B5AFE] text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-[#2c43d9] focus:outline-none focus:ring-2 focus:ring-[#3B5AFE]"
              type="button"
            >
              Edit Profile
            </button>
          </div>
        </div>
        <nav className="mt-8 flex border-b border-[#CBD5E1] text-sm font-semibold text-[#64748B]">
          <a
            aria-current="page"
            className="text-[#3B5AFE] border-b-2 border-[#3B5AFE] pb-2 mr-8"
            href="#"
          >
            Informasi Akun
          </a>
          <a className="pb-2" href="#">
            Password &amp; Verifikasi
          </a>
        </nav>
      </section>
    </>
  );
};

export default userPage;
