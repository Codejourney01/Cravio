import React from "react";
import { FiHeart, FiClock } from "react-icons/fi";

export default function ItemCard({ item }) {
  const discountedPrice =
    item.discount > 0
      ? Math.round(item.price - (item.price * item.discount) / 100)
      : item.price;

  return (
    <div className="w-full min-h-[125px] px-3.5 py-3 bg-white rounded-xl shadow-sm flex items-center justify-between gap-3">

      {/* ================= MOBILE / DESKTOP CONTENT ================= */}
      <div className="flex flex-1 min-w-0 items-center gap-3 md:flex-row">

        {/* ================= IMAGE ================= */}
        <div className="relative shrink-0 pb-3 order-2 md:order-1">

          <img
            src={item.image}
            alt={item.name}
            className="
              h-[90px]
              w-[90px]
              md:h-[96px]
              md:w-[96px]
              rounded-lg
              object-cover
            "
          />

          {/* Favorite Button */}
          <button
            type="button"
            aria-label={`Add ${item.name} to favourites`}
            className="
              absolute
              top-1.5
              right-1.5
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              bg-white/95
              text-[#FF5A1F]
              shadow-sm
              backdrop-blur-sm
              transition-all
              duration-200
              hover:bg-[#FF5A1F]
              hover:text-white
              active:scale-90
            "
          >
            <FiHeart
              size={12}
              strokeWidth={1.8}
            />
          </button>

          {/* ADD BUTTON - MOBILE ONLY */}
          <button
            type="button"
            className="
              absolute
              bottom-0
              left-1/2
              -translate-x-1/2
              flex
              md:hidden
              items-center
              justify-center
              min-w-[56px]
              h-[27px]
              rounded-md
              bg-white
              border
              border-[#FF5A1F]
              px-3
              text-[10px]
              font-bold
              tracking-wide
              text-[#FF5A1F]
              shadow-[0_2px_7px_rgba(0,0,0,0.12)]
              transition-all
              duration-200
              hover:bg-[#FF5A1F]
              hover:text-white
              active:scale-95
            "
          >
            ADD
          </button>

        </div>

        {/* ================= ITEM DETAILS ================= */}
        <div className="flex flex-1 flex-col min-w-0 justify-center order-1 md:order-2">

          {/* Item Name + Veg */}
          <div className="flex items-center gap-2">

            <h1 className="text-[14px] md:text-[15px] font-semibold text-heading truncate">
              {item.name}
            </h1>

            {/* Veg Indicator */}
            <span
              className={`flex h-[13px] w-[13px] shrink-0 items-center justify-center border rounded-[2px] ${
                item.isVeg
                  ? "border-green-600"
                  : "border-red-600"
              }`}
            >
              <span
                className={`h-[6px] w-[6px] rounded-full ${
                  item.isVeg
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              />
            </span>

          </div>

          {/* Description */}
          <p className="mt-1 max-w-[500px] text-[11px] md:text-[12px] leading-[15px] text-subheading line-clamp-2">
            {item.description || "No description available."}
          </p>

          {/* ================= PREPARATION TIME ================= */}
          <div className="mt-2 flex items-center gap-1 text-[10px] text-subheading">
            <FiClock size={11} />
            <span>{item.preparationTime} mins</span>
          </div>

          {/* PRICE - MOBILE ONLY */}
          <div className="mt-3 md:hidden flex items-center gap-2">

            <span className="text-[13px] font-semibold text-heading">
              ₹{discountedPrice}
            </span>

            {item.discount > 0 && (
              <>
                <span className="text-[10px] text-subheading line-through">
                  ₹{item.price}
                </span>

                <span className="text-[10px] font-medium text-green-600">
                  {item.discount}% OFF
                </span>
              </>
            )}

          </div>

        </div>
      </div>

      {/* ================= DESKTOP RIGHT SECTION ================= */}
      <div className="hidden md:flex shrink-0 items-center gap-4 pr-1">

        {/* Price */}
        <div className="flex items-center gap-2">

          <span className="text-[14px] font-semibold text-heading">
            ₹{discountedPrice}
          </span>

          {item.discount > 0 && (
            <span className="text-[10px] text-subheading line-through">
              ₹{item.price}
            </span>
          )}

        </div>

        {/* ADD Button */}
        <button
          type="button"
          className="
            flex
            items-center
            justify-center
            min-w-[56px]
            h-[27px]
            rounded-md
            bg-white
            border
            border-[#FF5A1F]
            px-3
            text-[10px]
            font-bold
            tracking-wide
            text-[#FF5A1F]
            shadow-[0_2px_7px_rgba(0,0,0,0.12)]
            transition-all
            duration-200
            hover:bg-[#FF5A1F]
            hover:text-white
            active:scale-95
          "
        >
          ADD
        </button>

      </div>

    </div>
  );
}