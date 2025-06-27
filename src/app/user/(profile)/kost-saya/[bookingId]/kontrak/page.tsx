// app/user/kost-saya/[bookingId]/page.tsx
import KontrakClient from "@/components/contract/tenantContract";

const KontrakPage = async ({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) => {
  const { bookingId } = await params;
  return <KontrakClient bookingId={bookingId} />;
};

export default KontrakPage;
