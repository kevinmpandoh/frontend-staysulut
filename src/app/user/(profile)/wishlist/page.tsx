import React from "react";
import { Wishlist } from "./Wishlist";

const wishlistPage = () => {
  return (
    <>
      <h1 className="text-base font-bold text-gray-900 mb-6 select-none">
        Riwayat Kost
      </h1>
      <div className="flex flex-wrap gap-4">
        <Wishlist />
      </div>
    </>
  );
};

export default wishlistPage;
