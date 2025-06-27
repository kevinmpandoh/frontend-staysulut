"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useQuery } from "@tanstack/react-query";
// import { roomService } from "@/services/room.service";

const KetersediaanKamarPage = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // const { data, isLoading } = useQuery({
  //   queryKey: ["owner-room"],
  //   queryFn: () => roomService.getRoomsByKostType(kostTypeId),
  // });

  const kamarList = [
    { id: 1, nomor: "1", lantai: 1, status: "Kosong" },
    { id: 2, nomor: "2", lantai: 1, status: "Kosong" },
    { id: 3, nomor: "3", lantai: 1, status: "Terisi" },
    { id: 4, nomor: "4", lantai: 1, status: "Kosong" },
    { id: 5, nomor: "5", lantai: 1, status: "Kosong" },
  ];

  const filteredKamar = kamarList.filter((kamar) => {
    const matchesSearch = kamar.nomor.includes(search);
    const matchesStatus =
      filterStatus === "all" ||
      kamar.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Atur Ketersediaa Kamar Anda</h1>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Masukkan nama atau nomor kamar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Semua Kamar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kamar</SelectItem>
              <SelectItem value="Kosong">Kosong</SelectItem>
              <SelectItem value="Terisi">Terisi</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-primary hover:bg-primary text-white">
          <Plus /> Tambahkan Kamar
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nomor</TableHead>
              <TableHead>Nama/ Nomor Kamar</TableHead>
              <TableHead>Lantai</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredKamar.map((kamar, index) => (
              <TableRow
                key={kamar.id}
                className={index % 2 === 1 ? "bg-green-50" : ""}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{kamar.nomor}</TableCell>
                <TableCell>{kamar.lantai}</TableCell>
                <TableCell>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      kamar.status === "Kosong"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {kamar.status}
                  </span>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default KetersediaanKamarPage;
