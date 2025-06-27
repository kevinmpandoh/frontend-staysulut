// import Alert from "@/components/ui/Alert";
import KostList from "@/components/dashboard/kost-saya/KostList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Kost Saya</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full sm:w-[300px] rounded-lg border border-gray-200 bg-gray-100 text-gray-700 text-[14px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
        />

        <Button type="button" size={"lg"}>
          <Link
            href={"/dashboard/tambah-kost"}
            className="flex items-center gap-1"
          >
            <Plus /> Tambah Kost
          </Link>
        </Button>
      </div>
      <KostList />
    </>
  );
};

export default page;
