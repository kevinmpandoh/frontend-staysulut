"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {
  Users,
  ShieldCheck,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const benefits = [
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Jangkau Lebih Banyak Penyewa",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "Kelola Kost Lebih Mudah & Aman",
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-primary" />,
    title: "Pantau Tagihan & Riwayat Sewa",
  },
];

const screenshots = [
  "/images/screenshot/dashboard-overview.png",
  "/images/screenshot/dashboard-overview.png",
  "/images/screenshot/dashboard-overview.png",
  "/images/screenshot/dashboard-overview.png",
];

const JoinAsOwnerSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // Auto-play setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 6000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <section className="bg-white py-12 px-4 md:px-16 lg:px-36">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* LEFT */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Punya Kost? Gabung dan Pasarkan Sekarang!
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            Sudah lebih dari{" "}
            <span className="font-semibold text-primary">3.200+</span> pemilik
            kost bergabung dan mengelola properti mereka dengan mudah di
            platform kami.
          </p>

          <ul className="space-y-3 mb-6">
            {benefits.map((item, i) => (
              <li key={i} className="flex items-center">
                <div className="mr-3">{item.icon}</div>
                <span className="text-gray-700 font-medium">{item.title}</span>
              </li>
            ))}
          </ul>
          <Button size={"xl"} asChild>
            <Link href="/daftar-pemilik">Daftarkan Kost Sekarang</Link>
          </Button>
        </div>

        {/* RIGHT */}
        <div className="relative w-full">
          {/* Slider */}
          <div
            ref={sliderRef}
            className="keen-slider w-full rounded-xl overflow-hidden shadow-lg"
          >
            {screenshots.map((src, i) => (
              <div key={i} className="keen-slider__slide w-full">
                <Image
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  width={600}
                  height={400}
                  className="object-cover rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* Panah Navigasi */}
          <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 z-10">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="bg-white shadow p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="bg-white shadow p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Bullet Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => instanceRef.current?.moveToIdx(i)}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === i ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinAsOwnerSection;
