import KostCard from "@/components/CardListKost";
import { SectionTitle } from "./SectionTitle";

export function NearbyKostRecommendations({ kosts }: { kosts: any[] }) {
  if (kosts.length === 0) return null;

  return (
    <section className="mt-10 space-y-4">
      <SectionTitle title="Kost di Sekitar" />
      <div className="overflow-x-auto">
        <div className="flex gap-4 w-max pr-4">
          {kosts.map((kost) => (
            <KostCard
              key={kost.id}
              id={kost.id}
              title={kost.nama_kost}
              location={kost.alamat}
              type={kost.jenis_kost}
              price={kost.harga_perbulan}
              images={kost.foto}
              facilities={kost.facilities}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
