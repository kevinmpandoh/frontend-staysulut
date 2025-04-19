"use client";

// import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Photo {
  _id: string;
  url: string;
  kategori: string;
}

interface KostImageGalleryProps {
  photos: Photo[];
}

export function KostImageGallery({ photos }: KostImageGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openPreview = (index: number) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const closePreview = () => {
    setIsModalOpen(false);
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <>
      {/* Desktop view */}
      <div className="hidden  sm:grid grid-cols-9 gap-2 sm:h-[280px] lg:h-[380px] rounded-2xl overflow-hidden">
        <div className="col-span-5 relative" onClick={() => openPreview(0)}>
          <Image
            src={photos[0].url}
            alt="Kost utama"
            fill
            className="object-cover rounded"
          />
        </div>

        <div className="col-span-4 grid grid-cols-2 grid-rows-2 gap-2">
          {photos.slice(1, 5).map((photo, idx) => (
            <div
              key={photo._id}
              className="relative w-full h-full"
              onClick={() => openPreview(idx + 1)}
            >
              <Image
                src={photo.url}
                alt={`Kost ${photo.kategori}`}
                fill
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view: swipeable gallery */}
      <div className="sm:hidden relative aspect-[4/3] rounded-xl overflow-hidden">
        <Image
          src={photos[activeIndex].url}
          alt={`Kost mobile ${activeIndex + 1}`}
          fill
          className="object-cover"
          onClick={() => openPreview(activeIndex)}
        />
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded">
          {activeIndex + 1} / {photos.length}
        </div>
      </div>

      {/* Modal preview manual */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={photos[activeIndex].url}
              alt={`Preview ${activeIndex + 1}`}
              fill
              className="object-contain"
            />

            {/* Close */}
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 bg-white text-black rounded-full p-1 shadow"
            >
              <X />
            </button>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
            >
              <ChevronRight />
            </button>

            {/* Index */}
            <div className="absolute bottom-4 right-4 text-white text-sm bg-black/60 px-3 py-1 rounded">
              {activeIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
