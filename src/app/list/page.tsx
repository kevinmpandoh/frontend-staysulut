"use client";
// import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import React from "react";

const page = () => {
  return (
    <div>
      {/* <ProtectedRoute> */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">StaySulut</div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Cari kost"
              className="border rounded-lg px-4 py-2 w-64"
            />
            <nav className="space-x-4">
              <a href="#" className="text-gray-700">
                Tentang Kami
              </a>
              <a href="#" className="text-gray-700">
                Kontak Kami
              </a>
            </nav>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Daftar
            </button>
            <button className="bg-teal-500 text-white px-4 py-2 rounded-lg">
              Daftar
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-lg px-4 py-2 w-full"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Cari Kost
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
              Filter <i className="fas fa-filter"></i>
            </button>
          </div>
          <div className="flex flex-wrap mt-4 space-x-2">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
              Urutkan <i className="fas fa-chevron-down"></i>
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
              Harga <i className="fas fa-chevron-down"></i>
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
              Rating <i className="fas fa-chevron-down"></i>
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
              Tipe Kost <i className="fas fa-chevron-down"></i>
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
              Fasilitas <i className="fas fa-chevron-down"></i>
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
              Peraturan <i className="fas fa-chevron-down"></i>
            </button>
          </div>
        </div>
        <div className="text-gray-700 mb-4">
          Ditemukan 38 Kost di Sulawesi Utara
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 16 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src="https://placehold.co/600x400"
                  alt="Room image"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-0 left-0 bg-orange-500 text-white px-2 py-1 text-xs">
                  Promo
                </div>
                <div className="absolute top-0 right-0 p-2">
                  <i className="far fa-heart text-gray-500"></i>
                </div>
              </div>
              <div className="p-4">
                <div className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full inline-block mb-2">
                  Kost Campur
                </div>
                <div className="text-lg font-semibold mb-1">Title</div>
                <div className="text-gray-500 text-sm mb-2">
                  <i className="fas fa-map-marker-alt"></i> Remboken, Minahasa
                </div>
                <div className="text-gray-500 text-sm mb-2">
                  <i className="fas fa-wifi"></i> WiFi{" "}
                  <i className="fas fa-utensils"></i> Dapur Umum{" "}
                  <i className="fas fa-parking"></i> Parkiran
                </div>
                <div className="text-gray-700 font-semibold">
                  Harga mulai dari
                </div>
                <div className="text-blue-600 text-xl font-bold">
                  Rp 1.200.000{" "}
                  <span className="text-gray-500 text-sm">/bulan</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-l-lg">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="bg-blue-500 text-white px-4 py-2">1</button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2">
            2
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2">
            3
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-r-lg">
            4
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-r-lg">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </main>
      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div className="text-2xl font-bold">StaySulut</div>
            <div className="space-x-4">
              <a href="#" className="text-white">
                Tentang Kami
              </a>
              <a href="#" className="text-white">
                Hubungi Kami
              </a>
            </div>
          </div>
          <div className="text-center mt-4">
            2025 StaySulut. All right reserved
          </div>
        </div>
      </footer>
      {/* </ProtectedRoute> */}
    </div>
  );
};

export default page;
