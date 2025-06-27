"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import ConfirmDeleteModal from "@/components/ui/ConfirmModalDelete";
import EditOwnerModal from "./EditOwnerModal";
import { PAYMENT_METHOD } from "@/constants/paymentMethod";
import { getAllOwner } from "@/services/owner.service";

const getBankData = (bankCode: string) => {
  for (const category of PAYMENT_METHOD) {
    const found = category.methods.find((m) => m.value === bankCode);
    if (found) return found;
  }
  return null;
};

const OwnerListPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-owner-list"],
    queryFn: () => getAllOwner(),
  });
  const owners = data || [];

  const [selectedOwner, setSelectedOwner] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  if (isLoading) {
    <h1>Loading</h1>;
  }
  console.log(owners, "DATANYA");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daftar Pemilik Kost</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Nama Pemilik</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Nomor HP</TableHead>
            <TableHead>Rekening Bank</TableHead>
            <TableHead>Nomor Rekening</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {owners.map((owner: any, i: number) => {
            const bankData = getBankData(owner.rekening_bank?.nama_bank);
            return (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      width={40}
                      height={40}
                      src={owner.photo || "/profile-default.png"}
                      alt={"Foto"}
                      className="rounded-full"
                    />
                    <span className="font-medium">{owner.name}</span>
                  </div>
                </TableCell>
                <TableCell>{owner.email}</TableCell>
                <TableCell>{owner.phone ?? "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {bankData && (
                      <Image
                        src={bankData.logo}
                        alt={bankData.name}
                        width={30}
                        height={30}
                      />
                    )}
                    <div>
                      <span className="block font-medium">
                        {bankData?.name ?? "-"}
                      </span>
                      <span className="text-sm text-gray-500">
                        Pemilik: {owner.rekening_bank?.nama_pemilik}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {owner.rekening_bank?.nomor_rekening ?? "-"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setSelectedOwner(owner);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => {
                        setSelectedOwner(owner);
                        setShowDeleteModal(true);
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Modal Edit */}
      <EditOwnerModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        owner={selectedOwner}
      />

      {/* Modal Hapus */}
      <ConfirmDeleteModal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          // TODO: delete owner
          setShowDeleteModal(false);
        }}
        title="Hapus Pemilik Kost?"
        description={`Apakah Anda yakin ingin menghapus pemilik "${selectedOwner?.name}"?`}
      />
    </div>
  );
};

export default OwnerListPage;
