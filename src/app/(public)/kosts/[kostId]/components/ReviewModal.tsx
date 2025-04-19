import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReviewCard } from "./ReviewCard";
import { Review } from "@/types/Review.type";

export function ReviewModal({
  open,
  onClose,
  reviews,
}: {
  open: boolean;
  onClose: () => void;
  reviews: Review[];
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] p-6">
        <DialogHeader>
          <DialogTitle>Semua Ulasan</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[75vh] pr-4">
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
