"use client";
import { useState } from "react";
import { ReviewCard } from "./ReviewCard";
import { Button } from "@/components/ui/button";
import { Review } from "@/types/Review.type";
import { ReviewModal } from "./ReviewModal";
import { SectionTitle } from "./SectionTitle";

type Props = {
  reviews: Review[];
};

export default function KostReviewList({ reviews }: Props) {
  const [showModal, setShowModal] = useState(false);
  const firstThree = reviews.slice(0, 3);
  return (
    <div className="space-y-6">
      <SectionTitle title="Ulasan Penyewa" />

      {firstThree.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}

      {reviews.length > 3 && (
        <Button variant="ghost" onClick={() => setShowModal(true)}>
          Lihat Semua Ulasan
        </Button>
      )}

      <ReviewModal
        open={showModal}
        onClose={() => setShowModal(false)}
        reviews={reviews}
      />
    </div>
  );
}
