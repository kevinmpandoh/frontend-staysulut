// app/(public)/kost/[kostId]/booking/page.tsx

import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import BookingTenant from "./components/BookingTenant";
interface BookingPageProps {
  params: Promise<{ kostId: string }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { kostId } = await params;

  return (
    <ProtectedRoute allowedRoles={["tenant"]}>
      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row">
        <BookingTenant kostId={kostId} />
      </div>
    </ProtectedRoute>
  );
}
