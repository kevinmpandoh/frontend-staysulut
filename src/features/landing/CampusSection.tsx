import CampusCard from "../../components/CampusCard";

const campusList = [
  {
    name: "Universitas Negeri Manado",
    slug: "unima",
    logo: "/logos/unima.png",
  },
  {
    name: "Universitas Sam Ratulangi",
    slug: "unsrat",
    logo: "/logos/unsrat.png",
  },
  {
    name: "Politeknik Negeri Manado",
    slug: "polimdo",
    logo: "/logos/politeknik.png",
  },
  {
    name: "Prisma Manado",
    slug: "prisma",
    logo: "/logos/prisma.png",
  },
  {
    name: "Universitas De La Salle",
    slug: "delasalle",
    logo: "/logos/delasalle.jpg",
  },
  {
    name: "Universitas Kristen Indonesia Manado",
    slug: "ukit",
    logo: "/logos/ukit.jpg",
  },
  {
    name: "Universitas Klabat",
    slug: "unklab",
    logo: "/logos/unklab.png",
  },
  {
    name: "Sekolah Tinggi Theologi Indonesia Manado",
    slug: "stti",
    logo: "/logos/stti.png",
  },
];

const CampusSection = () => {
  return (
    <section className="py-6 px-6 md:px-18 lg:px-36">
      <h2 className="text-2xl font-bold mb-4">Cari Kost Dekat Kampus</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {campusList.map((campus) => (
          <CampusCard key={campus.slug} {...campus} />
        ))}
      </div>
    </section>
  );
};

export default CampusSection;
