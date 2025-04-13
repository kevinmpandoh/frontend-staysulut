"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Users, ShieldCheck, BarChart2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
  "/images/dashboard-kamar.png",
  "/images/dashboard-pembayaran.png",
  "/images/dashboard-chat.png",
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
    defaultAnimation: {
      duration: 1000,
      easing: (t) => t,
    },
    // animation: {
    //   duration: 1000,
    // },
    // autoplay: {
    //   delay: 3000,
    //   pauseOnMouseEnter: true,
    // },
  });

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
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
            <Link
              href="/daftar-pemilik"
              // className="inline-block bg-primary hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Daftarkan Kost Sekarang
            </Link>
          </Button>
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            className="keen-slider rounded-xl overflow-hidden shadow-lg"
          >
            {screenshots.map((src, i) => (
              <div key={i} className="keen-slider__slide">
                <Image
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => instanceRef.current?.moveToIdx(i)}
                className={`w-2.5 h-2.5 rounded-full ${
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
