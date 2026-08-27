import React from "react";
import { FiHeart, FiClock } from "react-icons/fi";

// ============================================================
// ITEM CARD SKELETON
// ============================================================

export function ItemCardSkeleton() {
  return (
    <div className="w-full min-h-[135px] px-3.5 py-3.5 bg-white rounded-xl shadow-sm flex items-center justify-between gap-3 animate-pulse">
      {/* ========================================================
          IMAGE SKELETON
      ======================================================== */}

      <div className="relative shrink-0 pb-3 order-2 md:order-1">
        <div
          className="
            h-[95px]
            w-[95px]
            md:h-[105px]
            md:w-[105px]
            rounded-lg
            bg-gray-200
          "
        />

        {/* Favorite skeleton */}
        <div
          className="
            absolute
            top-1.5
            right-1.5
            h-7
            w-7
            rounded-full
            bg-gray-300
          "
        />

        {/* Add button skeleton - mobile */}
        <div
          className="
            absolute
            bottom-0
            left-1/2
            -translate-x-1/2
            md:hidden
            h-[29px]
            min-w-[60px]
            rounded-md
            bg-gray-300
          "
        />
      </div>

      {/* ========================================================
          ITEM DETAILS SKELETON
      ======================================================== */}

      <div
        className="
          flex
          flex-1
          min-w-0
          flex-col
          justify-center
          gap-2.5
          order-1
          md:order-2
        "
      >
        {/* Name */}
        <div className="flex items-center gap-2">
          <div className="h-[16px] w-[55%] rounded bg-gray-200" />

          <div className="h-[14px] w-[14px] rounded-[2px] bg-gray-300" />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <div className="h-[12px] w-[90%] rounded bg-gray-200" />
          <div className="h-[12px] w-[65%] rounded bg-gray-200" />
        </div>

        {/* Preparation time */}
        <div className="mt-1 flex items-center gap-1">
          <div className="h-[12px] w-[12px] rounded-full bg-gray-300" />
          <div className="h-[11px] w-[70px] rounded bg-gray-200" />
        </div>

        {/* Mobile price */}
        <div className="mt-2 flex items-center gap-2 md:hidden">
          <div className="h-[15px] w-[50px] rounded bg-gray-200" />
          <div className="h-[11px] w-[42px] rounded bg-gray-200" />
          <div className="h-[11px] w-[48px] rounded bg-gray-200" />
        </div>
      </div>

      {/* ========================================================
          DESKTOP RIGHT SECTION SKELETON
      ======================================================== */}

      <div className="hidden md:flex shrink-0 items-center gap-5 pr-1">
        {/* Price */}
        <div className="flex items-center gap-2">
          <div className="h-[16px] w-[50px] rounded bg-gray-200" />
          <div className="h-[11px] w-[42px] rounded bg-gray-200" />
        </div>

        {/* Add button */}
        <div className="h-[30px] min-w-[62px] rounded-md bg-gray-300" />
      </div>
    </div>
  );
}

// ============================================================
// ITEM CARD
// ============================================================

export default function ItemCard({ item }) {
  const discountedPrice =
    item.discount > 0
      ? Math.round(item.price - (item.price * item.discount) / 100)
      : item.price;

  return (
    <div
      className="
        w-full
        min-h-[135px]
        px-3.5
        py-3.5
        bg-white
        rounded-xl
        shadow-sm
        flex
        items-center
        justify-between
        gap-3
      "
    >
      {/* ========================================================
          MOBILE / DESKTOP CONTENT
      ======================================================== */}

      <div className="flex flex-1 min-w-0 items-center gap-3 md:flex-row">
        {/* ======================================================
            IMAGE
        ====================================================== */}

        <div className="relative shrink-0 pb-3 order-2 md:order-1">
          <img
            src={item.image}
            alt={item.name}
            className="
              h-[95px]
              w-[95px]
              md:h-[105px]
              md:w-[105px]
              rounded-lg
              object-cover
            "
          />

          {/* ====================================================
              FAVORITE BUTTON
          ==================================================== */}

          <button
            type="button"
            aria-label={`Add ${item.name} to favourites`}
            className="
              absolute
              top-1.5
              right-1.5
              flex
              h-7
              w-7
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
              size={13}
              strokeWidth={1.8}
            />
          </button>

          {/* ====================================================
              ADD BUTTON - MOBILE
          ==================================================== */}

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
              min-w-[60px]
              h-[29px]
              rounded-md
              bg-white
              border
              border-[#FF5A1F]
              px-3
              text-[11px]
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

        {/* ======================================================
            ITEM DETAILS
        ====================================================== */}

        <div
          className="
            flex
            flex-1
            flex-col
            min-w-0
            justify-center
            order-1
            md:order-2
          "
        >
          {/* ====================================================
              ITEM NAME + VEG
          ==================================================== */}

          <div className="flex items-center gap-2">
            <h1
              className="
                text-[15px]
                md:text-[17px]
                font-semibold
                text-heading
                truncate
              "
            >
              {item.name}
            </h1>

            {/* Veg Indicator */}
            <span
              className={`
                flex
                h-[14px]
                w-[14px]
                shrink-0
                items-center
                justify-center
                border
                rounded-[2px]
                ${
                  item.isVeg
                    ? "border-green-600"
                    : "border-red-600"
                }
              `}
            >
              <span
                className={`
                  h-[7px]
                  w-[7px]
                  rounded-full
                  ${
                    item.isVeg
                      ? "bg-green-600"
                      : "bg-red-600"
                  }
                `}
              />
            </span>
          </div>

          {/* ====================================================
              DESCRIPTION
          ==================================================== */}

          <p
            className="
              mt-1
              max-w-[500px]
              text-[12px]
              md:text-[14px]
              leading-[17px]
              md:leading-[19px]
              text-subheading
              line-clamp-2
            "
          >
            {item.description || "No description available."}
          </p>

          {/* ====================================================
              PREPARATION TIME
          ==================================================== */}

          <div
            className="
              mt-2
              flex
              items-center
              gap-1.5
              text-[11px]
              md:text-[12px]
              text-subheading
            "
          >
            <FiClock
              size={12}
              className="shrink-0"
            />

            <span>
              {item.preparationTime} mins
            </span>
          </div>

          {/* ====================================================
              PRICE - MOBILE ONLY
          ==================================================== */}

          <div className="mt-3 md:hidden flex items-center gap-2">
            <span
              className="
                text-[15px]
                font-semibold
                text-heading
              "
            >
              ₹{discountedPrice}
            </span>

            {item.discount > 0 && (
              <>
                <span
                  className="
                    text-[11px]
                    text-subheading
                    line-through
                  "
                >
                  ₹{item.price}
                </span>

                <span
                  className="
                    text-[11px]
                    font-medium
                    text-green-600
                  "
                >
                  {item.discount}% OFF
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
          DESKTOP RIGHT SECTION
      ======================================================== */}

      <div
        className="
          hidden
          md:flex
          shrink-0
          items-center
          gap-5
          pr-1
        "
      >
        {/* ====================================================
            PRICE
        ==================================================== */}

        <div className="flex items-center gap-2">
          <span
            className="
              text-[16px]
              font-semibold
              text-heading
            "
          >
            ₹{discountedPrice}
          </span>

          {item.discount > 0 && (
            <span
              className="
                text-[11px]
                text-subheading
                line-through
              "
            >
              ₹{item.price}
            </span>
          )}
        </div>

        {/* ====================================================
            ADD BUTTON
        ==================================================== */}

        <button
          type="button"
          className="
            flex
            items-center
            justify-center
            min-w-[62px]
            h-[30px]
            rounded-md
            bg-white
            border
            border-[#FF5A1F]
            px-3
            text-[12px]
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