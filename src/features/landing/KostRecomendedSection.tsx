import React from "react";
import KostCard from "../../components/CardListKost";

const KostRecomendedSection = () => {
  return (
    <section className="container bg-white mx-auto px-6 md:px-18 lg:px-36 py-16 ">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Rekomendasi Kost Untuk Anda</h2>
        <a href="#" className="text-teal-500">
          Lihat Semua
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {[...Array(4)].map((_, i) => (
          <KostCard
            key={i}
            title="Kost Vinshi"
            location="Remboken, Minahasa"
            type="Campur"
            price={120000}
            // originalPrice={1500000}
            // promo
            // discountPercent={20}
            images={["/kost.jpg", "/kost2.png"]}
            facilities={["wifi", "dapur", "parkiran"]}
          />
        ))}
      </div>
    </section>
  );
};

export default KostRecomendedSection;
