import React from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

import AddressSelector from "./AddressSelector";
import SearchBar from "./Searchbar.jsx";

export default function Nav() {
  return (
    <header className="h-20 border-b border-gray-100 sm:hidden">
  <div className=" h-full grid-cols-[minmax(0,1fr)_500px_minmax(0,1fr)] items-center gap-6 px-8 hidden">

    {/* Left - Address */}
    <div className="flex min-w-0 items-center justify-start">
      <AddressSelector />
    </div>

    {/* Center - Search */}
   

    {/* Right - Actions */}
    <div className="flex items-center justify-end gap-6 pr-5">
      {/* Wishlist */}
      {/* Cart */}
      {/* Login */}
    </div>

  </div>
</header>
  );
}