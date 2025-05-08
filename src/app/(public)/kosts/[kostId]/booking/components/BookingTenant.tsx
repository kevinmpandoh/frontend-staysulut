// app/(public)/kost/[kostId]/booking/components/BookingClient.tsx

"use client";

import { useState } from "react";
import BookingForm from "./BookingForm";
import BookingSidebar from "./BookingSidebar";
import BookingSuccess from "./BookingSuccess";

interface BookingTenantProps {
  kostId: string;
}

export default function BookingTenant({ kostId }: BookingTenantProps) {
  const [success, setSuccess] = useState(false);

  return (
    <>
      {success ? (
        <BookingSuccess />
      ) : (
        <>
          {/* Kiri - Form */}
          <div className="flex-1 space-y-6 mr-8">
            <a
              href={`/kost/${kostId}`}
              className="text-blue-600 hover:underline"
            >
              ← Kembali ke Detail Kost
            </a>

            <BookingForm kostId={kostId} onSuccess={() => setSuccess(true)} />
          </div>

          {/* Kanan - Sidebar */}
          <div className="w-full md:w-1/3">
            <BookingSidebar
              kost={{
                name: "Kost Vinshi",
                address: "Kembangan, Jakarta Barat",
                image: "/path/image.jpg",
                price: 700000,
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
