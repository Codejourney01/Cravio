
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

import { useFavorites } from "../../context/Favouritecontext";

export default function FavoriteRestaurantCard({
  id,
  Rname,
  Rimage,
  rating,
  cuisines,
  onRemove,
}) {
  const [removing, setRemoving] = useState(false);

  const { removeFavorite } = useFavorites();

  const handleRemove = async () => {
    if (removing) return;

    try {
      setRemoving(true);

      await removeFavorite(id);

      if (onRemove) {
        onRemove(id);
      }

      toast.success("Removed from favourites");
    } catch (error) {
      console.error(
        "Remove favorite error:",
        error
      );

      toast.error(
        error.message ||
          "Unable to remove favourite"
      );

      setRemoving(false);
    }
  };

  return (
    <div
      className={`w-full overflow-hidden rounded-[18px] bg-white shadow-[0_4px_18px_rgba(255,90,31,0.07)] transition-all duration-200 hover:-translate-y-1 ${
        removing
          ? "pointer-events-none opacity-60"
          : ""
      }`}
    >
      {/* IMAGE */}

      <div className="relative">
        <img
          src={Rimage}
          alt={Rname}
          loading="lazy"
          decoding="async"
          className="h-[150px] w-full object-cover"
        />

        {/* DELETE BUTTON */}

        <button
          type="button"
          onClick={handleRemove}
          disabled={removing}
          aria-label={`Remove ${Rname} from favourites`}
          className="
            absolute
            right-2.5
            top-2.5
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            bg-white
            text-gray-500
            shadow-[0_2px_8px_rgba(0,0,0,0.12)]
            transition-all
            duration-200
            hover:bg-white
            hover:text-cravio
            hover:scale-105
            active:scale-95
            disabled:cursor-not-allowed
          "
        >
          <FiTrash2
            size={13}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* INFO */}

      <div className="px-3 pt-3">
        <div className="flex items-center justify-between gap-3 pr-1">
          <h3 className="truncate text-sm font-medium text-heading">
            {Rname}
          </h3>

          <div className="flex shrink-0 items-center justify-center gap-1">
            <FaStar
              className="text-yellow-400"
              size={11}
            />

            <span className="text-[12px] text-subheading">
              {rating}
            </span>
          </div>
        </div>

        <h5 className="mt-[2px] truncate text-[11px] font-semibold text-subheading">
          {cuisines?.join(", ")}
        </h5>
      </div>

      {/* VIEW RESTAURANT */}

      <div className="px-3 pb-3 pt-4">
        <Link
          to={`/restaurantdetail/${id}`}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-cravio
            py-2.5
            text-[11px]
            font-semibold
            text-white
            transition-all
            duration-200
            hover:shadow-[0_5px_14px_rgba(255,90,31,0.20)]
          "
        >
          View Restaurant

          <FiArrowRight
            size={13}
            strokeWidth={2}
          />
        </Link>
      </div>
    </div>
  );
}

