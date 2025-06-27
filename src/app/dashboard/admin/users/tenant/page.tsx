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
import React from "react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/ui/ConfirmModalDelete";
import { tenantService } from "@/services/tenant.service";

const UserListPage = () => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => tenantService.getAll(), // sesuaikan endpoint
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daftar Penyewa</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nama Penyewa</TableHead>
            <TableHead>Jenis Kelamin</TableHead>
            <TableHead>Pekerjaan</TableHead>
            <TableHead>Kota Asal</TableHead>
            <TableHead>Kontak Darurat</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    <Image
                      width={40}
                      height={40}
                      src={user.photo || "/profile-default.png"}
                      alt="Foto Profil"
                    />
                  </div>
                  <div>
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {user.name}
                    </span>
                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                      {user.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.jenis_kelamin ?? "-"}</TableCell>
              <TableCell>{user.pekerjaan ?? "-"}</TableCell>
              <TableCell>{user.kota_asal ?? "-"}</TableCell>
              <TableCell>{user.kontak_darurat ?? "-"}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="link"
                    className="text-blue-500 p-0 h-auto"
                    onClick={() => alert("Edit user " + user.name)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="link"
                    className="text-red-500 p-0 h-auto"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDeleteModal(true);
                    }}
                  >
                    Hapus
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal Konfirmasi Hapus */}
      <ConfirmDeleteModal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          // deleteUserMutation.mutate(selectedUser._id);
          setShowDeleteModal(false);
        }}
        title={`Hapus Penyewa?`}
        description={`Apakah Anda yakin ingin menghapus ${selectedUser?.name}? Tindakan ini tidak dapat dibatalkan.`}
      />
    </div>
  );
};

export default UserListPage;
