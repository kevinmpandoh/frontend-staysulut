import React from "react";
import CityCard from "../../components/CityCard";

const cities = [
  {
    name: "Kota Manado",
    slug: "manado",
    image: "/manado.jpg",
  },
  {
    name: "Kota Tomohon",
    slug: "tomohon",
    image: "/images/city/tomohon.jpg",
  },
  {
    name: "Kotamobagu",
    slug: "kotamobagu",
    image: "/images/city/kotamobagu.jpeg",
  },
  {
    name: "Kota Bitung",
    slug: "bitung",
    image: "/images/city/bitung.jpg",
  },
  {
    name: "Airmadidi",
    slug: "airmadidi",
    image: "/images/city/airmadidi.jpg",
  },
  {
    name: "Tondano",
    slug: "tondano",
    image: "/images/city/tondano.jpeg",
  },
];

const CitySection = () => {
  return (
    <section className="container mx-auto px-6 md:px-18 lg:px-36 py-16">
      <h2 className="text-2xl font-bold mb-8">
        Kota Populer di Sulawesi Utara
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cities.map((city, i) => (
          <CityCard
            key={i}
            name={city.name}
            image={city.image}
            slug={city.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default CitySection;
