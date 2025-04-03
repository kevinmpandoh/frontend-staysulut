// import Image from "next/image";

import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="bg-gray-50 ">
        <Navbar />

        <section className="bg-blue-100 text-slate-600  mx-auto py-20 flex justify-around">
          <div className="mt-10 md:w-1/3 ">
            <h1 className="text-5xl leading-14 font-bold mb-4 drop-shadow-2xl  ">
              Temukan{" "}
              <span className="text-primary font-bold">Kost Impianmu</span>{" "}
              dengan mudah dan cepat
            </h1>
            <p className="mb-8 font-semibold text-lg">
              Cari kost berdasarkan lokasi, harga, dan fasilitas yang kamu
              inginkan.
            </p>
            <div className="relative max-w-md mx-auto"></div>
          </div>
          <Image
            src="/apartment-rent.svg"
            alt="Illustration of houses and a magnifying glass"
            className="w-120 h-120"
            width={50}
            height={50}
          />
        </section>

        <section className="container  mx-auto  px-36 py-28 ">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Rekomendasi Kost Untuk Anda</h2>
            <a href="#" className="text-teal-500">
              Lihat Semua
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(2)].map((_, i) => (
              // <div
              //   key={i}
              //   className="border rounded-lg overflow-hidden shadow-lg"
              // >
              //   <div className="relative">
              //     <img
              //       src="https://placehold.co/400x300"
              //       alt="Room interior"
              //       className="w-full"
              //     />
              //     <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded">
              //       Promo
              //     </span>
              //     <i className="fas fa-heart absolute top-2 right-2 text-white"></i>
              //   </div>
              //   <div className="p-4">
              //     <h3 className="text-lg font-semibold mb-2">Kost Campur</h3>
              //     <p className="text-gray-600 mb-4">@ Remboken, Minahasa</p>
              //     <div className="flex items-center space-x-2 text-gray-600 mb-4">
              //       <i className="fas fa-bed"></i>
              //       <i className="fas fa-bath"></i>
              //       <i className="fas fa-parking"></i>
              //       <i className="fas fa-wifi"></i>
              //     </div>
              //     <p className="text-teal-500 font-bold">Rp 1.200.000 /bulan</p>
              //   </div>
              // </div>
              <div
                key={i}
                className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs"
              >
                <div className="relative">
                  <img
                    src="https://placehold.co/400x200"
                    alt="Room with a bed, pillows, and a wardrobe"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    Promo
                  </div>
                  <div className="absolute top-2 right-2">
                    <i className="far fa-heart text-gray-400"></i>
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mb-2">
                    Kost Campur
                  </span>
                  <h2 className="text-lg font-semibold mb-1">Title</h2>
                  <p className="text-gray-600 text-sm mb-2">
                    <i className="fas fa-map-marker-alt"></i> Remboken, Minahasa
                  </p>
                  <div className="flex flex-wrap text-gray-600 text-sm mb-2">
                    <div className="flex items-center mr-2 mb-1">
                      <i className="fas fa-wifi mr-1"></i> Wifi
                    </div>
                    <div className="flex items-center mr-2 mb-1">
                      <i className="fas fa-utensils mr-1"></i> Dapur Umum
                    </div>
                    <div className="flex items-center mr-2 mb-1">
                      <i className="fas fa-parking mr-1"></i> Parkiran
                    </div>
                    <div className="flex items-center mr-2 mb-1">
                      <i className="fas fa-parking mr-1"></i> Parkiran
                    </div>
                    <div className="flex items-center mr-2 mb-1">
                      <i className="fas fa-parking mr-1"></i> Parkiran
                    </div>
                    <div className="flex items-center mr-2 mb-1">
                      <i className="fas fa-parking mr-1"></i> Parkiran
                    </div>
                    <div className="flex items-center mr-2 mb-1">
                      <i className="fas fa-parking mr-1"></i> Parkiran
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Harga mulai dari</p>
                  <p className="text-2xl font-semibold">
                    Rp 1.200.000{" "}
                    <span className="text-sm font-normal">/bulan</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-36 py-16">
          <h2 className="text-2xl font-bold mb-8">
            Kota Populer di Sulawesi Utara
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Kota Manado",
              "Kota Tomohon",
              "Kotamobagu",
              "Kota Bitung",
              "Airmadidi",
              "Tondano",
            ].map((city, i) => (
              <div key={i} className="relative">
                <img
                  src="/manado.jpg"
                  alt={`View of ${city}`}
                  className="w-full rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 rounded-b-lg">
                  {city}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container  mx-auto px-36 py-16">
          <h2 className="text-2xl font-bold mb-8">Kost Dekat Kampus</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Universitas Negeri Manado",
              "Universitas Samratulangi Manado",
              "Universitas klabat",
              "Universitas Katolik De La Salle",
              "Politeknik Negeri Manado",
              "Universitas Kristen Indonesia Tomohon",
              "Sekolah Tinggi Theologi Indonesia Manado",
              "Universitas Prisma Manado",
            ].map((university, i) => (
              <div key={i} className="border rounded-lg p-4 text-center">
                <img
                  src="https://placehold.co/100x100"
                  alt={`Logo of ${university}`}
                  className="mx-auto mb-4"
                />
                <p>{university}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 px-36 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              Fitur Unggulan Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "fas fa-credit-card",
                  title: "Pembayaran Mudah",
                  description:
                    "Nikmati berbagai metode pembayaran seperti transfer bank, e-wallet, atau kartu kredit dengan proses yang cepat dan aman.",
                },
                {
                  icon: "fas fa-check-circle",
                  title: "Rekomendasi Kost yang Akurat",
                  description:
                    "Dapatkan rekomendasi kost terbaik yang sesuai dengan kebutuhan dan preferensi Anda menggunakan teknologi canggih kami.",
                },
                {
                  icon: "fas fa-undo",
                  title: "Pengembalian Dana (Refund)",
                  description:
                    "Jangan khawatir jika ada perubahan rencana, kami menyediakan fitur pengembalian dana yang transparan dan mudah.",
                },
                {
                  icon: "fas fa-shield-alt",
                  title: "Aman dan Terpercaya",
                  description:
                    "Kami menjamin keamanan transaksi dan memastikan setiap kost yang terdaftar telah diverifikasi, sehingga Anda bisa menyewa tanpa khawatir.",
                },
                {
                  icon: "fas fa-comments",
                  title: "Chat langsung dengan Pemilik Kost",
                  description:
                    "Fasilitas komunikasi langsung dengan pemilik kost untuk mendapatkan informasi yang jelas dan negosiasi mudah.",
                },
                {
                  icon: "fas fa-calendar-check",
                  title: "Booking Langsung",
                  description:
                    "Pesan kamar kost kapan saja dan di mana saja dengan hanya beberapa klik melalui aplikasi kami.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                >
                  <i
                    className={`${feature.icon} text-4xl text-teal-500 mb-4`}
                  ></i>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-blue-500 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-4">
              <span className="text-2xl font-bold">StaySulut</span>
            </div>
            <div className="flex justify-center space-x-8 mb-4">
              <a href="#" className="hover:underline">
                Tentang Kami
              </a>
              <a href="#" className="hover:underline">
                Hubungi Kami
              </a>
            </div>
            <p>2025 StaySulut. All right reserved</p>
          </div>
        </footer>
      </div>
    </>
  );
}
