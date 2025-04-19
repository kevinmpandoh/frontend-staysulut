import {
  Wifi,
  Snowflake,
  ShowerHead,
  BedSingle,
  ParkingSquare,
  LayoutPanelTop,
  Users,
  CheckCircle,
} from "lucide-react";
import { JSX } from "react";
import { SectionTitle } from "./SectionTitle";

const iconMap: Record<string, JSX.Element> = {
  WiFi: <Wifi className="w-5 h-5 text-primary" />,
  AC: <Snowflake className="w-5 h-5 text-primary" />,
  "Private Bathroom": <ShowerHead className="w-5 h-5 text-primary" />,
  Mattress: <BedSingle className="w-5 h-5 text-primary" />,
  Desk: <LayoutPanelTop className="w-5 h-5 text-primary" />,
  "Motorcycle Parking": <ParkingSquare className="w-5 h-5 text-primary" />,
  "Shared Kitchen": <Users className="w-5 h-5 text-primary" />,
};

interface KostFacilitiesProps {
  roomFacilities: string[];
  sharedFacilities: string[];
}

export function KostFacilities({
  roomFacilities,
  sharedFacilities,
}: KostFacilitiesProps) {
  const renderFacilities = (list: string[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-4">
      {list.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-md font-semibold text-slate-600"
        >
          {iconMap[item] || <CheckCircle className="w-5 h-5 text-primary" />}
          <span>{item}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className=" ">
      <div className="">
        <SectionTitle title="Fasilitas Kamar" />

        {renderFacilities(roomFacilities)}
      </div>

      <div>
        <SectionTitle title="Fasilitas Bersama" />
        {renderFacilities(sharedFacilities)}
      </div>
    </div>
  );
}
