"use client";

import FacilityCard from "@/components/Card/FacilityCard";
import {
  Wifi,
  Snowflake,
  Bath,
  ParkingSquare,
  CookingPot,
  WashingMachine,
} from "lucide-react";

const KOST_FACILITIES = [
  { name: "WiFi", icon: <Wifi className="w-full h-full" /> },
  { name: "Parkir", icon: <ParkingSquare className="w-full h-full" /> },
  { name: "Dapur", icon: <CookingPot className="w-full h-full" /> },
  { name: "Laundry", icon: <WashingMachine className="w-full h-full" /> },
];

const ROOM_FACILITIES = [
  { name: "AC", icon: <Snowflake className="w-full h-full" /> },
  { name: "Kamar Mandi Dalam", icon: <Bath className="w-full h-full" /> },
];

interface Props {
  selectedKost: string[];
  selectedRoom: string[];
  onToggleKost: (facility: string) => void;
  onToggleRoom: (facility: string) => void;
}

export default function FacilitiesFilter({
  selectedKost,
  selectedRoom,
  onToggleKost,
  onToggleRoom,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="font-medium text-sm block mb-2">Fasilitas Kost</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {KOST_FACILITIES.map(({ name, icon }) => (
            <FacilityCard
              key={name}
              name={name}
              icon={icon}
              selected={selectedKost.includes(name)}
              onClick={() => onToggleKost(name)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="font-medium text-sm block mb-2">
          Fasilitas Kamar
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ROOM_FACILITIES.map(({ name, icon }) => (
            <FacilityCard
              key={name}
              name={name}
              icon={icon}
              selected={selectedRoom.includes(name)}
              onClick={() => onToggleRoom(name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// const FACILITY_LIST = [
//   { name: "WiFi", icon: <Wifi className="w-full h-full" /> },
//   { name: "AC", icon: <Snowflake className="w-full h-full" /> },
//   { name: "Kamar Mandi Dalam", icon: <Bath className="w-full h-full" /> },
//   { name: "Parkir", icon: <ParkingSquare className="w-full h-full" /> },
//   { name: "Dapur", icon: <CookingPot className="w-full h-full" /> },
//   { name: "Laundry", icon: <WashingMachine className="w-full h-full" /> },
// ];

// interface Props {
//   selected: string[];
//   onToggle: (facility: string) => void;
// }

// export default function FacilitiesFilter({ selected, onToggle }: Props) {
//   return (
//     <div className="space-y-2">
//       <label className="font-medium text-sm block">Fasilitas Tersedia</label>
//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//         {FACILITY_LIST.map(({ name, icon }) => (
//           <FacilityCard
//             key={name}
//             name={name}
//             icon={icon}
//             selected={selected.includes(name)}
//             onClick={() => onToggle(name)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
