"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Info, Star, Trash } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { reviewService } from "@/services/review.service";
import React, { useState } from "react";
import { ReviewDetailModal } from "./ReviewDetailModal";
import Image from "next/image";
import ReviewPagination from "./ReviewPagination";
import { useRouter, useSearchParams } from "next/navigation";
import ConfirmDeleteModal from "@/components/ui/ConfirmModalDelete";

const AdminReviews = () => {
  const [searchInput, setSearchInput] = useState(""); // untuk input di UI
  const [search, setSearch] = useState(""); // untuk dikirim ke backend
  const [rating, setRating] = useState<string | undefined>();
  const [detailReview, setDetailReview] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") ?? "1");

  const { data, isLoading } = useQuery({
    queryKey: ["owner-review", page, search, rating],
    queryFn: () =>
      reviewService.getAdminReview({
        page,
        limit: 10,
        search: search || undefined,
        // rating: rating === "all" ? undefined : rating,
        rating: rating && rating !== "all" ? parseInt(rating) : undefined, // konversi ke number
      }),
  });

  const reviews = data?.data || [];
  const pagination = data?.pagination;

  const currentPage = Math.max(1, page);

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/dashboard/admin/reviews?${params.toString()}`);
  };

  const handleSearch = () => {
    setPage(1); // reset ke halaman 1
    setSearch(searchInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleRatingChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("rating", val);
    params.set("page", "1"); // reset ke halaman 1
    router.push(`/dashboard/admin/reviews?${params.toString()}`);
    setRating(val);
  };

  if (isLoading) {
    <h1>Loading</h1>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Rating dan Ulasan</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative w-full sm:w-[300px]">
          <Input
            placeholder="Cari Nama Penyewa"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-10"
          />
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
            onClick={handleSearch}
          >
            🔍
          </Button>
        </div>

        <Select
          value={rating}
          onValueChange={handleRatingChange}
          // placeholder="Semua"
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="1">1</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white p-6 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Penyewa</TableHead>
              <TableHead>Nama Kost</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review: any) => (
              <TableRow
                key={review._id}
                className="cursor-pointer hover:bg-gray-50"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/profile-default.png"
                      alt="foto"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span>{review.penyewa?.name ?? "Penyewa"}</span>
                  </div>
                </TableCell>
                <TableCell>{review.kost_type?.nama_tipe ?? "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(review.createdAt), "dd MMM yyyy", {
                    locale: id,
                  })}
                </TableCell>
                <TableCell>
                  <div className="space-x-2">
                    <Button
                      size={"lg"}
                      variant="ghost"
                      onClick={() => setDetailReview(review)}
                    >
                      <Info />
                    </Button>
                    <Button
                      size={"lg"}
                      variant={"ghost"}
                      className="text-red-600"
                      onClick={(e) => {
                        e.stopPropagation(); // 🛑 Cegah klik bubble ke TableRow
                        setShowDeleteModal(true);
                      }}
                    >
                      <Trash />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {pagination && (
          <div className="mt-6">
            <ReviewPagination
              page={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          // deleteMutation.mutate();
          setShowDeleteModal(false);
        }}
        title={`Hapus Anda yakin ingin menghapus review ini?`}
        description="Tindakan ini tidak dapat dibatalkan."
      />

      <ReviewDetailModal
        open={!!detailReview}
        data={detailReview}
        onClose={() => setDetailReview(null)}
      />
    </>
  );
};

export default AdminReviews;
