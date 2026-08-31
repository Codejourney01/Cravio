
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

import {
  ViewFavoriteRestuarant,
  RemoveFavoriteRestuarant,
} from "../../api/favoriteapi";

// ============================================================
// FAVORITE RESTAURANT CARD
// ============================================================

function FavoriteRestaurantCard({ restaurant, onRemove }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/restaurantdetail/${restaurant._id}`);
  };

  const handleRemove = async (e) => {
    e.stopPropagation();

    await onRemove(restaurant._id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="
        group
        cursor-pointer
        overflow-hidden
        rounded-lg
        bg-white
        shadow-[0_2px_12px_rgba(0,0,0,0.08)]
        transition
        duration-200
        hover:-translate-y-0.5
        hover:shadow-[0_4px_18px_rgba(0,0,0,0.12)]
      "
    >
      {/* ======================================================
          RESTAURANT IMAGE
      ====================================================== */}

      <div className="relative h-[160px] w-full overflow-hidden">

        <img
          src={restaurant.Rimage}
          alt={restaurant.Rname}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-300
            group-hover:scale-105
          "
        />

        {/* ====================================================
            REMOVE FAVORITE
        ==================================================== */}

        <button
          type="button"
          onClick={handleRemove}
          aria-label="Remove from favourites"
          className="
            absolute
            right-3
            top-3
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-[#FF5A1F]
            text-white
            shadow-md
            transition
            active:scale-95
          "
        >
          <FiHeart
            size={14}
            strokeWidth={1.8}
            className="fill-white"
          />
        </button>

      </div>

      {/* ======================================================
          RESTAURANT INFORMATION
      ====================================================== */}

      <div className="p-4">

        {/* Restaurant Name */}

        <h2
          className="
            truncate
            text-base
            font-semibold
            text-heading
          "
        >
          {restaurant.Rname}
        </h2>

        {/* ====================================================
            RATING + DELIVERY
        ==================================================== */}

        <div className="mt-2 flex items-center gap-4">

          {/* Rating */}

          <div className="flex items-center gap-1">

            <FaStar
              size={11}
              className="text-yellow-400"
            />

            <span className="text-[12px] text-subheading">
              {restaurant.rating || "0"}
            </span>

          </div>

          {/* Delivery Time */}

          <div className="flex items-center gap-1">

            <FiClock
              size={12}
              strokeWidth={1.8}
              className="text-subheading"
            />

            <span className="text-[12px] text-subheading">
              {restaurant.deliveryTime || "25 - 30 min"}
            </span>

          </div>

        </div>

        {/* ====================================================
            CUISINES
        ==================================================== */}

        {restaurant.cuisines && (
          <p
            className="
              mt-2
              truncate
              text-[12px]
              text-subheading
            "
          >
            {Array.isArray(restaurant.cuisines)
              ? restaurant.cuisines.join(" • ")
              : restaurant.cuisines}
          </p>
        )}

        {/* ====================================================
            PRICE FOR TWO
        ==================================================== */}

        {restaurant.priceForTwo && (
          <p className="mt-2 text-[12px] text-subheading">
            ₹{restaurant.priceForTwo} for two
          </p>
        )}

      </div>

    </div>
  );
}

// ============================================================
// SKELETON
// ============================================================

function FavoriteRestaurantSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-lg
        bg-white
        shadow-[0_2px_12px_rgba(0,0,0,0.08)]
      "
    >
      <div className="h-[160px] animate-pulse bg-gray-200" />

      <div className="p-4">

        <div className="h-5 w-[65%] animate-pulse rounded bg-gray-200" />

        <div className="mt-3 h-3 w-[45%] animate-pulse rounded bg-gray-200" />

        <div className="mt-3 h-3 w-[75%] animate-pulse rounded bg-gray-200" />

      </div>
    </div>
  );
}

// ============================================================
// FAVORITES PAGE
// ============================================================

function Favorites() {
  // ============================================================
  // STATES
  // ============================================================

  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [removingId, setRemovingId] = useState(null);

  // ============================================================
  // FETCH FAVORITE RESTAURANTS
  // ============================================================

  useEffect(() => {
    const fetchFavoriteRestaurants = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await ViewFavoriteRestuarant();

        /*
          Your backend should return:

          {
            success: true,
            favoriteRestaurants: [...]
          }
        */

        setFavoriteRestaurants(
          data.favoriteRestaurants || []
        );
      } catch (error) {
        console.error(
          "Failed to fetch favorite restaurants:",
          error
        );

        setError(
          error.message ||
            "Failed to load favorite restaurants"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteRestaurants();
  }, []);

  // ============================================================
  // REMOVE FAVORITE
  // ============================================================

  const handleRemoveFavorite = async (restaurantId) => {
    try {
      setRemovingId(restaurantId);

      await RemoveFavoriteRestuarant(restaurantId);

      /*
        Remove the restaurant from local state immediately.

        No need to call GET again.
      */

      setFavoriteRestaurants((currentRestaurants) =>
        currentRestaurants.filter(
          (restaurant) =>
            String(restaurant._id) !==
            String(restaurantId)
        )
      );
    } catch (error) {
      console.error(
        "Failed to remove favorite restaurant:",
        error
      );

      alert(
        error.message ||
          "Failed to remove restaurant from favorites"
      );
    } finally {
      setRemovingId(null);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="w-full">

        {/* Page Header */}

        <div>
          <h1 className="text-3xl font-bold text-heading">
            Favorites
          </h1>

          <p className="mt-2 text-subheading">
            Your favorite restaurants and dishes.
          </p>
        </div>

        {/* Skeleton Cards */}

        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {[1, 2, 3, 4].map((item) => (
            <FavoriteRestaurantSkeleton key={item} />
          ))}
        </div>

      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="w-full">

        <div>
          <h1 className="text-3xl font-bold text-heading">
            Favorites
          </h1>

          <p className="mt-2 text-subheading">
            Your favorite restaurants and dishes.
          </p>
        </div>

        <div className="flex min-h-[250px] items-center justify-center">

          <div className="text-center">

            <p className="text-sm text-red-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="
                mt-3
                text-xs
                font-medium
                text-[#FF5A1F]
              "
            >
              Try Again
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ============================================================
  // EMPTY FAVORITES
  // ============================================================

  if (favoriteRestaurants.length === 0) {
    return (
      <div className="w-full">

        <div>
          <h1 className="text-3xl font-bold text-heading">
            Favorites
          </h1>

          <p className="mt-2 text-subheading">
            Your favorite restaurants and dishes.
          </p>
        </div>

        <div className="flex min-h-[300px] items-center justify-center">

          <div className="text-center">

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[#FF5A1F]/10
                text-[#FF5A1F]
              "
            >
              <FiHeart
                size={24}
                strokeWidth={1.6}
              />
            </div>

            <h2 className="mt-4 text-base font-semibold text-heading">
              No favorite restaurants yet
            </h2>

            <p className="mt-1 text-xs text-subheading">
              Start adding restaurants to your favorites.
            </p>

          </div>

        </div>

      </div>
    );
  }

  // ============================================================
  // MAIN PAGE
  // ============================================================

  return (
    <div className="w-full">

      {/* ========================================================
          PAGE HEADER
      ======================================================== */}

      <div>

        <h1 className="text-3xl font-bold text-heading">
          Favorites
        </h1>

        <p className="mt-2 text-subheading">
          Your favorite restaurants and dishes.
        </p>

      </div>

      {/* ========================================================
          FAVORITE RESTAURANTS
      ======================================================== */}

      <div
        className="
          mt-8
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >

        {favoriteRestaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className={
              removingId === restaurant._id
                ? "pointer-events-none opacity-50 transition-opacity"
                : ""
            }
          >
            <FavoriteRestaurantCard
              restaurant={restaurant}
              onRemove={handleRemoveFavorite}
            />
          </div>
        ))}

      </div>

    </div>
  );
}

export default Favorites;

