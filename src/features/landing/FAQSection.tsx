"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const penyewaFaqs = [
  {
    question: "Bagaimana cara menyewa kost?",
    answer:
      'Cari kost sesuai preferensi, klik "Ajukan Sewa", isi data, lalu tunggu persetujuan dari pemilik.',
  },
  {
    question: "Apakah saya bisa menyimpan kost favorit?",
    answer:
      "Bisa. Klik ikon hati di kartu kost untuk menambah ke wishlist kamu.",
  },
  {
    question: "Bagaimana jika saya telat membayar?",
    answer:
      "Akan ada pengingat otomatis. Denda berlaku sesuai ketentuan pemilik kost.",
  },
];

const pemilikFaqs = [
  {
    question: "Bagaimana cara mendaftarkan kost saya?",
    answer:
      "Klik “Daftarkan Kost”, isi detail kost, fasilitas, harga, lalu publish.",
  },
  {
    question: "Apakah saya bisa melihat riwayat sewa penyewa?",
    answer:
      "Ya. Di dashboard tersedia informasi penyewa aktif dan riwayat tagihan mereka.",
  },
  {
    question: "Bagaimana saya menerima pembayaran dari penyewa?",
    answer:
      "Pembayaran dilakukan via sistem, dan dana akan ditransfer otomatis ke rekening Anda setelah penyewa check-in.",
  },
];

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState<"penyewa" | "pemilik">("penyewa");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = activeTab === "penyewa" ? penyewaFaqs : pemilikFaqs;

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">
        {/* Kiri: Judul + Deskripsi + Ilustrasi */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Pertanyaan Umum
          </h2>
          <p className="text-gray-600 mb-6">
            Temukan jawaban atas pertanyaan yang sering diajukan oleh pengguna
            kami. Baik kamu seorang penyewa ataupun pemilik kost, kami bantu
            jelaskan semuanya.
          </p>
          <Image
            src="/faq-illustration.svg" // Ganti dengan ilustrasi yang kamu punya
            alt="FAQ Illustration"
            width={400}
            height={300}
            className="w-full max-w-sm"
          />
        </div>

        {/* Kanan: Tab & FAQ */}
        <div>
          {/* Tab */}
          <div className="flex gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === "penyewa"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => {
                setActiveTab("penyewa");
                setOpenIndex(null);
              }}
            >
              Untuk Penyewa
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === "pemilik"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => {
                setActiveTab("pemilik");
                setOpenIndex(null);
              }}
            >
              Untuk Pemilik Kost
            </button>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border transition-all"
              >
                <button
                  className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-gray-800"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-4 text-sm text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
