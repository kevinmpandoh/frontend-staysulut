"use client";

import {
  Calendar,
  Contact,
  FileText,
  Mail,
  Phone,
  User,
  User2,
  UserCheck,
} from "lucide-react";
import React, { useState } from "react";
import InfoRow from "./InfoRow";
import CardSection from "./CardSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // pastikan komponen Tabs dari ShadCN tersedia
import { Skeleton } from "@/components/ui/skeleton";
import { bookingService } from "@/services/booking.service";
import { useQuery } from "@tanstack/react-query";

import StopRentModal from "./StopRentModal";
import { useChat } from "@/hooks/useChat";

const TenantDetailCard = ({ bookingId }: { bookingId: string }) => {
  const [tab, setTab] = useState<"biodata" | "kontrak">("biodata");
  const [openStopModal, setOpenStopModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["tenant-detail", bookingId],
    queryFn: () => bookingService.getBiodataTenant(bookingId as string),
    enabled: !!bookingId,
  });

  const { getChatTenant } = useChat();

  if (isLoading || !data) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-60 w-full" />
      </div>
    );
  }

  return (
    <CardSection title="Informasi Penyewa">
      {/* Tabs */}
      <Tabs
        defaultValue={tab}
        onValueChange={(val) => setTab(val as "biodata" | "kontrak")}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="biodata">Biodata</TabsTrigger>
          <TabsTrigger value="kontrak">Kontrak Sewa</TabsTrigger>
        </TabsList>

        {/* Tab: Biodata */}
        <TabsContent value="biodata">
          <div className="space-y-6">
            {/* Data Diri */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">Data Diri</h3>
              <InfoRow
                icon={<User2 size={20} />}
                label="Nama Lengkap"
                value={data.tenant.name || "-"}
              />
              <InfoRow
                icon={<UserCheck size={20} />}
                label="Jenis Kelamin"
                value={data.tenant?.gender || "-"}
              />
              {/* <InfoRow
                icon={<User size={20} />}
                label="Status"
                value={data.biodata.status}
              /> */}
              <InfoRow
                icon={<Contact size={20} />}
                label="Pekerjaan"
                value={data.tenant.pekerjaan || "-"}
              />
            </div>

            {/* Kontak Penyewa */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Kontak Penyewa
              </h3>
              <InfoRow
                icon={<Phone size={20} />}
                label="No HP"
                value={data.tenant.phone || "-"}
              />
              <InfoRow
                icon={<Mail size={20} />}
                label="Email"
                value={data.tenant.email || "-"}
              />
              <InfoRow
                icon={<User size={20} />}
                label="Kontak Darurat"
                value={data.tenant.emergency_contact || "-"}
              />
            </div>

            {/* Dokumen */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Dokumen Penyewa
              </h3>
              <InfoRow
                icon={<FileText size={20} />}
                label="KTP"
                value={data.tenant.ktp || "-"}
              />
              <InfoRow
                icon={<FileText size={20} />}
                label="Foto Profil"
                value={data.tenant.photo || "-"}
              />
            </div>
          </div>
        </TabsContent>

        {/* Tab: Kontrak */}
        <TabsContent value="kontrak">
          <div className="space-y-4">
            <InfoRow
              icon={<Calendar size={20} />}
              label="Kost"
              value={data.nama_kost || "-"}
            />
            <InfoRow
              icon={<Calendar size={20} />}
              label="Kamar"
              value={data.kamar}
            />
            <InfoRow
              icon={<Calendar size={20} />}
              label="Mulai Sewa"
              value={data.tanggal_masuk}
            />
            <InfoRow
              icon={<Calendar size={20} />}
              label="Selesai Sewa"
              value={data.tanggal_selesai}
            />
            <InfoRow label="Durasi" value={`${data.durasi} bulan`} />
            <InfoRow
              label="Biaya Sewa"
              value={`Rp ${data.biaya_sewa.toLocaleString("id-ID")}`}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-4 pt-4 justify-center ">
        <Button
          className="w-full "
          variant="outline"
          onClick={() =>
            getChatTenant({
              kostTypeId: data.kostTypeId,
              tenantId: data.tenant.id,
            })
          }
        >
          Chat Penyewa
        </Button>

        {data.status === "Aktif" && (
          <Button
            className="w-full "
            variant="destructive"
            onClick={() => setOpenStopModal(true)}
          >
            Hentikan Kontrak Sewa
          </Button>
        )}
      </div>
      <StopRentModal
        open={openStopModal}
        onClose={() => setOpenStopModal(false)}
        bookingId={bookingId}
      />
    </CardSection>
  );
};

export default TenantDetailCard;
