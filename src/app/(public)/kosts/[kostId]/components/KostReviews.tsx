"use client";
import { useState } from "react";
import { ReviewCard } from "./ReviewCard";
import { Button } from "@/components/ui/button";
import { Review } from "@/types/Review.type";
import { ReviewModal } from "./ReviewModal";
import { SectionTitle } from "./SectionTitle";
import { MessageCircleOff } from "lucide-react";

type Props = {
  reviews: Review[];
};

export default function KostReviewList({ reviews }: Props) {
  const [showModal, setShowModal] = useState(false);

  if (reviews.length === 0) {
    return (
      <div className="space-y-6">
        <SectionTitle title="Ulasan Penyewa" />
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground space-y-2 py-10">
          <MessageCircleOff className="w-10 h-10" />
          <p>Belum ada ulasan dari penyewa lain.</p>
        </div>
      </div>
    );
  }
  const firstThree = reviews.slice(0, 3);
  return (
    <div className="space-y-6">
      <SectionTitle title="Ulasan Penyewa" />

      {firstThree.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}

      {reviews.length > 3 && (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={() => setShowModal(true)}>
            Lihat Semua Ulasan
          </Button>
        </div>
      )}

      <ReviewModal
        open={showModal}
        onClose={() => setShowModal(false)}
        reviews={reviews}
      />
    </div>
  );
}
