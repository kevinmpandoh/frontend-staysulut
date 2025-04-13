import Image from "next/image";
import Link from "next/link";

const DownloadAppSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 items-center gap-12">
        {/* Gambar HP / Ilustrasi */}
        <div className="flex justify-center md:justify-start">
          <Image
            src="/mockup-app.png" // Ganti dengan screenshot atau ilustrasi app kamu
            alt="Aplikasi Kostku"
            width={400}
            height={600}
            className="w-full max-w-xs"
          />
        </div>

        {/* Konten */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Unduh Aplikasi Kostku Sekarang
          </h2>
          <p className="text-gray-600 mb-6">
            Dapatkan kemudahan mencari, menyewa, dan mengelola kost langsung
            dari smartphone kamu. Fitur lengkap dalam genggaman!
          </p>

          <div className="flex gap-4 flex-wrap">
            {/* Tombol Google Play */}
            <Link
              href="#"
              // className="bg-black text-white rounded-lg px-4 py-3 flex items-center gap-3 shadow hover:bg-gray-800 transition"
            >
              <Image
                src="/logos/google-play.png"
                alt="Google Play"
                width={200}
                height={200}
                className="w-48 h-auto"
              />
            </Link>

            {/* Tombol App Store */}
            <Link
              href="#"
              // className="bg-black text-white rounded-lg px-4 py-3 flex items-center gap-3 shadow hover:bg-gray-800 transition"
            >
              <Image
                src="/logos/app-store.svg"
                alt="App Store"
                width={200}
                height={100}
                className="w-48 h-auto"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
