"use client";

import Image from "next/image";
import Link from "next/link";

interface CampusCardProps {
  name: string;
  logo: string;
  slug: string; // untuk redirect ke halaman kampus
}

const CampusCard = ({ name, logo, slug }: CampusCardProps) => {
  return (
    <Link
      href={`/kosts?campus=${slug}`}
      className="bg-white rounded-xl shadow hover:shadow-md transition-shadow flex flex-col items-center justify-center p-4"
    >
      <div className="relative w-20 h-20 mb-3">
        <Image
          src={logo}
          alt={`Logo ${name}`}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <p className="text-center font-medium text-sm md:text-base">{name}</p>
    </Link>
  );
};

export default CampusCard;
