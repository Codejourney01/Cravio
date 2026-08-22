import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (
    <div className="relative w-full">

      {/* Search Icon */}

      <FiSearch
        size={19}
        strokeWidth={1.8}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[#9CA3AF]
        "
      />

      {/* Input */}

      <input
        type="text"
        placeholder="Search restaurants, dishes..."
        className="
          h-11
          w-full
          rounded-xl
          border
          border-gray-100
          bg-[#F8F9FA]

          pl-11
          pr-4

          text-sm
          text-black

          outline-none

          placeholder:text-[#9CA3AF]

          shadow-sm

          transition-all
          duration-200

          focus:border-[#FF5A1F]
          focus:bg-white
          focus:shadow-md
        "
      />

    </div>
  );
}