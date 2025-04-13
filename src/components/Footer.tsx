import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-10">
        {/* Logo & Deskripsi */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src="/logo.svg" alt="Kostku Logo" width={32} height={32} />
            <span className="text-xl font-semibold">Kostku</span>
          </div>
          <p className="text-sm text-gray-400">
            Platform terbaik untuk mencari dan mengelola kost di Sulawesi Utara.
            Mudah, cepat, dan terpercaya.
          </p>
        </div>

        {/* Navigasi - Penyewa */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Untuk Penyewa</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/kost">Cari Kost</Link>
            </li>
            <li>
              <Link href="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link href="/faq">Bantuan</Link>
            </li>
          </ul>
        </div>

        {/* Navigasi - Pemilik */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Untuk Pemilik</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/daftar-pemilik">Daftarkan Kost</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard Pemilik</Link>
            </li>
            <li>
              <Link href="/faq">Bantuan</Link>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Kontak Kami</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <MapPin size={16} />
              Jl. Sam Ratulangi No.123, Manado
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              0812-3456-7890
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              support@kostku.com
            </li>
            <li className="flex gap-3 mt-2">
              <a href="#">
                <Facebook size={20} />
              </a>
              <a href="#">
                <Instagram size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bawah */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Kostku. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
