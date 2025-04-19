import { Review } from "@/types/Review.type";

import { Star, StarHalf, StarOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div key={review.id} className="space-y-3 border-b pb-6 px-6">
      <div className="flex items-start gap-4">
        <Avatar>
          {review.avatarUrl ? (
            <AvatarImage src={review.avatarUrl} />
          ) : (
            <AvatarFallback>
              {review.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1 space-y-1">
          <div className="flex justify-between items-center">
            <p className="font-medium">{review.name}</p>
            <StarRating rating={review.rating} />
          </div>
          <p className="text-sm text-muted-foreground">
            {format(new Date(review.createdAt), "dd MMMM yyyy", {
              locale: id,
            })}
          </p>
          <p className="text-md text-slate-600 mt-1">{review.message}</p>

          {review.reply && (
            <div className="mt-3 border-l-4 border-gray-300 bg-gray-50 p-3 rounded-md text-sm">
              <p className="font-semibold text-md text-gray-700">
                Balasan Pemilik Kost:
              </p>
              <p className="text-gray-600 mt-1  text-md">
                {review.reply.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {format(new Date(review.reply.createdAt), "dd MMMM yyyy", {
                  locale: id,
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    // <div className="rounded-xl border p-4 space-y-2 shadow-sm bg-white">
    //   <div className="flex items-center justify-between">
    //     <p className="font-medium">{review.name}</p>
    //     <p className="text-sm text-gray-500">
    //       {format(new Date(review.createdAt), "dd MMM yyyy")}
    //     </p>
    //   </div>
    //   <p className="text-sm text-gray-800">{review.message}</p>

    //   {review.reply && (
    //     <div className="mt-2 pl-4 border-l-2 border-gray-200 text-sm text-gray-600 flex gap-2">
    //       <MessageCircle className="w-4 h-4 mt-[2px]" />
    //       <span>
    //         <strong>Balasan Pemilik:</strong> {review.reply.message}
    //       </span>
    //     </div>
    //   )}
    // </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center text-yellow-500">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars)
          return <Star key={i} className="w-4 h-4 fill-current" />;
        if (i === fullStars && hasHalf)
          return <StarHalf key={i} className="w-4 h-4" />;
        return <StarOff key={i} className="w-4 h-4 text-muted-foreground" />;
      })}
    </div>
  );
}
