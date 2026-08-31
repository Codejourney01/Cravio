
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Heading from "../../components/Headings/Heading";
import FavoriteRestaurantCard from "../../components/Cards/Favrestaurantcard";

function Favorites() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/favorites/restaurants",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch favorites"
          );
        }

        setFavorites(data.favorites || []);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);

        toast.error(
          error.message || "Unable to load favorites"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-[70vh] px-4 py-8 md:px-10">
        <div className="flex min-h-[55vh] items-center justify-center">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-cravio border-t-transparent" />
        </div>
      </div>
    );
  }

  // ============================================================
  // EMPTY STATE
  // ============================================================

  if (favorites.length === 0) {
    return (
      <div className="min-h-[70vh] px-4 py-8 md:px-10">
        <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">

          <h2 className="text-base font-semibold tracking-tight text-heading">
            No favorites yet
          </h2>

          <p className="mt-1.5 text-sm text-subheading">
            Save your favorite restaurants and dishes here.
          </p>

          <button
            type="button"
            onClick={() => navigate("/restaurants")}
            className="
              mt-6
              flex
              items-center
              gap-2
              rounded-lg
              bg-cravio
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              transition-all
              duration-200
              hover:-translate-y-[1px]
              hover:shadow-[0_6px_18px_rgba(255,90,31,0.22)]
              active:translate-y-0
            "
          >
            Explore Restaurants

            <FiArrowRight
              size={15}
              strokeWidth={2}
            />
          </button>

        </div>
      </div>
    );
  }

  // ============================================================
  // FAVORITES
  // ============================================================

  return (
    <div className="min-h-[70vh] px-4 py-8 md:px-10">

      <Heading
        headingname="My Favourite Restaurants"
        subheading="Your go-to places, saved for your next craving."
      />

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((favorite) => (
          <FavoriteRestaurantCard
            key={favorite._id}
            id={favorite._id}
            Rname={favorite.Rname}
            Rimage={favorite.Rimage}
            rating={favorite.rating}
            cuisines={favorite.cuisines}
          />
        ))}
      </div>

    </div>
  );
}

export default Favorites;

