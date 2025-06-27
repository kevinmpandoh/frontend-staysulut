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
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import AdminFormModal from "./AdminFormModal";
import ConfirmDeleteModal from "@/components/ui/ConfirmModalDelete";
import { adminService } from "@/services/admin.service";

const AdminListPage = () => {
  const { data, refetch } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => adminService.getAllAdmins(),
  });

  const admins = data || [];

  const [showFormModal, setShowFormModal] = useState(false);
  const [formInitialData, setFormInitialData] = useState<any>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddAdmin = () => {
    setFormInitialData(null);
    setShowFormModal(true);
  };

  const handleSubmit = async (formData: { name: string; email: string }) => {
    try {
      await adminService.createAdmin(formData);
      setShowFormModal(false);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Admin</h1>
        <Button onClick={handleAddAdmin}>+ Tambah Admin</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin: any) => (
            <TableRow key={admin._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    <Image
                      width={40}
                      height={40}
                      src={"/profile-default.png"}
                      alt="FOTO"
                    />
                  </div>
                  <div>
                    <span className="block font-medium text-gray-800">
                      {admin.name}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => {
                      setFormInitialData(admin);
                      setShowFormModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => {
                      setSelectedAdmin(admin);
                      setShowDeleteModal(true);
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal Tambah/Edit */}
      <AdminFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleSubmit}
        initialData={formInitialData}
      />

      {/* Modal Hapus */}
      <ConfirmDeleteModal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          // TODO: delete admin
          setShowDeleteModal(false);
          refetch();
        }}
        title={`Hapus Admin?`}
        description={`Apakah Anda yakin ingin menghapus ${selectedAdmin?.name}?`}
      />
    </div>
  );
};

export default AdminListPage;
