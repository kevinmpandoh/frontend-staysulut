// app/(main)/kosts/page.tsx
import KostListHeader from "@/features/kost-list/KostListHeader";
import KostFilterTags from "@/features/kost-list/KostFilterTags";
import KostFilterModal from "@/features/kost-list/KostFilterModal";
import KostList from "@/features/kost-list/KostList";
import { Suspense } from "react";

export default function KostListPage() {
  return (
    <div className="p-4 max-w-6xl mx-auto my-10">
      <Suspense>
        <KostListHeader />
        <KostFilterTags />
        <KostFilterModal />
        <KostList />
      </Suspense>
    </div>
  );
}
