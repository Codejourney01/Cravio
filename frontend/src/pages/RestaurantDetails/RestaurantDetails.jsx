import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronLeft, FiClock, FiHeart, FiSearch } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useRestaurants } from "../../context/RestaurantContext";
import { useItems } from "../../context/ItemContext";

import ItemCard, { ItemCardSkeleton } from "../../components/Cards/ItemCard";

// ============================================================
// FAVORITE API
// ============================================================

import {
  addFavoriteRestaurant,
  ViewFavoriteRestuarant,
  RemoveFavoriteRestuarant,
} from "../../api/favoriteapi";

// ============================================================
// COMPONENT
// ============================================================

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ============================================================
  // RESTAURANT CONTEXT
  // ============================================================

  const { restaurants, loadingRestaurants, restaurantError } = useRestaurants();

  // ============================================================
  // ITEM CONTEXT
  // ============================================================

  const {
    restaurantItems,
    getRestaurantItems,
    loadingRestaurantItems,
    restaurantItemsError,
  } = useItems();

  // ============================================================
  // FIND RESTAURANT
  // ============================================================

  const restaurant = restaurants.find(
    (item) => String(item._id) === String(id),
  );

  // ============================================================
  // STATES
  // ============================================================

  const [activeTab, setActiveTab] = useState("For You");
  const [searchQuery, setSearchQuery] = useState("");
  const [bannerLoading, setBannerLoading] = useState(true);

  // Favorite state
  const [isFavourite, setIsFavourite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // Randomized items
  const [displayItems, setDisplayItems] = useState([]);

  // ============================================================
  // TABS
  // ============================================================

  const tabs = ["For You", "Popular", "Best Sellers", "Meal Combo", "Offers"];

  // ============================================================
  // FETCH RESTAURANT ITEMS
  // ============================================================

  useEffect(() => {
    if (!id) return;

    getRestaurantItems(id);
  }, [id]);

  // ============================================================
  // RESET BANNER LOADING
  // ============================================================

  useEffect(() => {
    setBannerLoading(true);
  }, [id]);

  // ============================================================
  // CHECK IF RESTAURANT IS ALREADY FAVORITE
  // ============================================================

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!id) return;

      try {
        const data = await ViewFavoriteRestuarant();

        /*
          Expected backend response should contain favorite restaurants.

          Example:

          {
            success: true,
            favoriteRestaurants: [...]
          }

          We support a few possible response property names
          so the frontend is not unnecessarily fragile.
        */

        const favoriteRestaurants =
          data.favoriteRestaurants || data.restaurants || data.favorites || [];

        const alreadyFavorite = favoriteRestaurants.some((favorite) => {
          const favoriteId =
            favorite?._id ||
            favorite?.restaurant?._id ||
            favorite?.restaurantId;

          return String(favoriteId) === String(id);
        });

        setIsFavourite(alreadyFavorite);
      } catch (error) {
        /*
          If the user is not logged in or the favorite request
          fails, we simply keep the heart inactive.

          We do not break the restaurant page.
        */

        console.error("Failed to check favorite restaurant:", error);

        setIsFavourite(false);
      }
    };

    checkFavoriteStatus();
  }, [id]);

  // ============================================================
  // TOGGLE FAVORITE
  // ============================================================

  const handleFavoriteToggle = async () => {
    if (!id || favoriteLoading) return;

    try {
      setFavoriteLoading(true);

      // ========================================================
      // REMOVE FAVORITE
      // ========================================================

      if (isFavourite) {
        await RemoveFavoriteRestuarant(id);

        setIsFavourite(false);

        return;
      }

      // ========================================================
      // ADD FAVORITE
      // ========================================================

      await addFavoriteRestaurant(id);

      setIsFavourite(true);
    } catch (error) {
      console.error("Favorite restaurant error:", error);

      /*
        We don't change isFavourite when the API fails.

        Example:
        If the restaurant is currently favorite and DELETE fails,
        the heart stays favorite.
      */

      alert(error.message || "Something went wrong");
    } finally {
      setFavoriteLoading(false);
    }
  };

  // ============================================================
  // RANDOMIZE ITEMS
  // ============================================================

  useEffect(() => {
    if (!restaurantItems || restaurantItems.length === 0) {
      setDisplayItems([]);
      return;
    }

    const shuffledItems = [...restaurantItems].sort(() => Math.random() - 0.5);

    setDisplayItems(shuffledItems);
  }, [restaurantItems]);

  // ============================================================
  // FILTER ITEMS BASED ON ACTIVE TAB
  // ============================================================

  const tabFilteredItems = displayItems.filter((item) => {
    switch (activeTab) {
      // --------------------------------------------------------
      // FOR YOU
      // --------------------------------------------------------

      case "For You":
        return item.isAvailable !== false;

      // --------------------------------------------------------
      // POPULAR
      // --------------------------------------------------------

      case "Popular":
        return item.isAvailable !== false && Number(item.orderCount || 0) > 0;

      // --------------------------------------------------------
      // BEST SELLERS
      // --------------------------------------------------------

      case "Best Sellers":
        return (
          item.isAvailable !== false &&
          (item.isBestSeller === true ||
            item.bestSeller === true ||
            Number(item.orderCount || 0) >= 20)
        );

      // --------------------------------------------------------
      // MEAL COMBO
      // --------------------------------------------------------

      case "Meal Combo":
        return (
          item.isAvailable !== false &&
          (item.category?.toLowerCase() === "combo" ||
            item.category?.toLowerCase() === "meal combo" ||
            item.type?.toLowerCase() === "combo" ||
            item.name?.toLowerCase().includes("combo"))
        );

      // --------------------------------------------------------
      // OFFERS
      // --------------------------------------------------------

      case "Offers":
        return item.isAvailable !== false && Number(item.discount || 0) > 0;

      default:
        return true;
    }
  });

  // ============================================================
  // SEARCH
  // ============================================================

  const filteredItems = tabFilteredItems.filter((item) => {
    const name = item.name || "";

    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // ============================================================
  // RESTAURANT PAGE SKELETON
  // ============================================================

  const RestaurantDetailsSkeleton = () => {
    return (
      <div className="w-full pb-10">
        {/* ======================================================
            BACK BUTTON
        ====================================================== */}

        <div className="md:px-4">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
        </div>

        {/* ======================================================
            BANNER
        ====================================================== */}

        <div className="mt-4 w-full px-3 md:px-7 md:pr-9">
          <div
            className="
              h-[120px]
              w-full
              animate-pulse
              rounded-md
              bg-gray-200
              md:h-[197px]
            "
          />
        </div>

        {/* ======================================================
            RESTAURANT INFO
        ====================================================== */}

        <div className="mt-5 px-3 md:px-7 md:pr-9">
          <div className="flex items-center justify-between">
            {/* Restaurant name */}

            <div
              className="
                h-6
                w-[45%]
                animate-pulse
                rounded
                bg-gray-200
                md:h-8
                md:w-[30%]
              "
            />

            {/* Favourite */}

            <div className="h-7 w-7 animate-pulse rounded-full bg-gray-200" />
          </div>

          {/* Rating / delivery */}

          <div className="mt-3 flex gap-4">
            <div className="h-3 w-[110px] animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-[90px] animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* ======================================================
            SEARCH
        ====================================================== */}

        <div className="mt-5 flex justify-center">
          <div
            className="
              h-[40px]
              w-[95%]
              animate-pulse
              rounded-md
              bg-gray-200
            "
          />
        </div>

        {/* ======================================================
            MOBILE TABS
        ====================================================== */}

        <div className="mt-6 px-3 md:hidden">
          <Swiper slidesPerView="auto" spaceBetween={28}>
            {[1, 2, 3, 4, 5].map((item) => (
              <SwiperSlide key={item} className="!w-auto">
                <div className="h-4 w-[65px] animate-pulse rounded bg-gray-200" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ======================================================
            DESKTOP TABS
        ====================================================== */}

        <div className="mt-6 hidden px-7 md:block">
          <div className="flex gap-7">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="
                  h-4
                  w-[70px]
                  animate-pulse
                  rounded
                  bg-gray-200
                "
              />
            ))}
          </div>
        </div>

        {/* ======================================================
            MENU ITEM SKELETONS
        ====================================================== */}

        <div className="mt-7 px-3 md:px-7 md:pr-9">
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((item) => (
              <ItemCardSkeleton key={item} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // RESTAURANT LOADING
  // ============================================================

  if (loadingRestaurants) {
    return <RestaurantDetailsSkeleton />;
  }

  // ============================================================
  // RESTAURANT ERROR
  // ============================================================

  if (restaurantError) {
    return (
      <div className="flex min-h-[300px] items-center justify-center px-4">
        <div className="text-center">
          <h3 className="text-base font-semibold text-heading">
            Something went wrong
          </h3>

          <p className="mt-1 text-xs text-red-500">{restaurantError}</p>
        </div>
      </div>
    );
  }

  // ============================================================
  // RESTAURANT NOT FOUND
  // ============================================================

  if (!restaurant) {
    return (
      <div className="flex min-h-[300px] items-center justify-center px-4">
        <div className="text-center">
          <h3 className="text-base font-semibold text-heading">
            Restaurant not found
          </h3>

          <p className="mt-1 text-xs text-subheading">
            The restaurant you're looking for doesn't exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/restaurants")}
            className="
              mt-4
              rounded-md
              bg-[#FF5A1F]
              px-4
              py-2
              text-xs
              text-white
              hover:opacity-90
            "
          >
            Back to Restaurants
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN UI
  // ============================================================

  return (
    <div className="w-full pb-10">
      {/* ========================================================
          BACK BUTTON
      ======================================================== */}

      <div className="md:px-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            text-heading
            transition
            hover:text-[#FF5A1F]
          "
        >
          <FiChevronLeft size={17} strokeWidth={1.8} />
        </button>
      </div>

      {/* ========================================================
          BANNER
      ======================================================== */}

      <div className="mt-4 w-full px-3 md:px-7 md:pr-9">
        <div
          className="
            relative
            h-[120px]
            w-full
            overflow-hidden
            rounded-md
            md:h-[197px]
          "
        >
          {/* Banner Skeleton */}

          {bannerLoading && (
            <div
              className="
                absolute
                inset-0
                z-10
                animate-pulse
                rounded-md
                bg-gray-200
              "
            />
          )}

          <img
            src={restaurant.Rbanner}
            alt={`${restaurant.Rname} banner`}
            loading="eager"
            decoding="async"
            onLoad={() => setBannerLoading(false)}
            onError={() => setBannerLoading(false)}
            className={`
              h-full
              w-full
              rounded-md
              object-cover
              transition-opacity
              duration-300
              ${bannerLoading ? "opacity-0" : "opacity-100"}
            `}
          />
        </div>
      </div>

      {/* ========================================================
          RESTAURANT INFORMATION
      ======================================================== */}

      <div className="mt-5 px-3 md:px-7 md:pr-9">
        <div className="flex items-center justify-between">
          {/* Restaurant Name */}

          <h1 className="text-lg font-semibold text-heading md:text-2xl">
            {restaurant.Rname}
          </h1>

          {/* ====================================================
              FAVORITE BUTTON
          ==================================================== */}

          <button
            type="button"
            aria-label={
              isFavourite ? "Remove from favourites" : "Add to favourites"
            }
            disabled={favoriteLoading}
            onClick={handleFavoriteToggle}
            className={`
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              transition-all
              duration-200
              active:scale-95
              ${
                isFavourite
                  ? "bg-[#FF5A1F] text-white"
                  : "bg-[#FF5A1F]/[57%] text-white hover:bg-[#FF5A1F]"
              }
              ${favoriteLoading ? "cursor-not-allowed opacity-60" : ""}
            `}
          >
            <FiHeart
              size={12}
              strokeWidth={1.8}
              className={isFavourite ? "fill-white" : ""}
            />
          </button>
        </div>

        {/* ======================================================
            RATING + DELIVERY TIME
        ====================================================== */}

        <div className="mt-2 flex items-center gap-4">
          {/* Rating */}

          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" size={11} />

            <span className="text-[12px] text-subheading">
              {restaurant.rating || "0"} ({restaurant.reviews || "0"} Reviews)
            </span>
          </div>

          {/* Delivery Time */}

          <div className="flex items-center gap-1">
            <FiClock className="text-subheading" size={12} strokeWidth={1.8} />

            <span className="text-[12px] text-subheading">
              {restaurant.deliveryTime || "25 - 30 min"}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          SEARCH
      ======================================================== */}

      <div className="mt-5 flex w-full items-center justify-center">
        <div
          className="
            flex
            h-[40px]
            w-[95%]
            items-center
            rounded-md
            bg-white
            px-4
            shadow-[0_2px_12px_rgba(0,0,0,0.08)]
          "
        >
          <FiSearch
            className="shrink-0 text-subheading"
            size={14}
            strokeWidth={1.8}
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes..."
            className="
              ml-2
              w-full
              bg-transparent
              text-[12px]
              text-heading
              outline-none
              placeholder:text-subheading
            "
          />
        </div>
      </div>

      {/* ========================================================
          MOBILE TABS
      ======================================================== */}

      <div className="mt-6 px-3 md:hidden">
        <Swiper slidesPerView="auto" spaceBetween={28} className="w-full">
          {tabs.map((tab) => (
            <SwiperSlide key={tab} className="!w-auto">
              <button
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`
                  relative
                  whitespace-nowrap
                  pb-3
                  text-[12px]
                  font-medium
                  ${activeTab === tab ? "text-[#FF5A1F]" : "text-subheading"}
                `}
              >
                {tab}

                {activeTab === tab && (
                  <span
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-[2px]
                      w-full
                      rounded-full
                      bg-[#FF5A1F]
                    "
                  />
                )}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ========================================================
          DESKTOP TABS
      ======================================================== */}

      <div className="mt-6 hidden px-3 md:block md:px-7 md:pr-9">
        <div className="flex items-center gap-7">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`
                relative
                pb-3
                text-[12px]
                font-medium
                ${
                  activeTab === tab
                    ? "text-[#FF5A1F]"
                    : "text-subheading hover:text-heading"
                }
              `}
            >
              {tab}

              {activeTab === tab && (
                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-full
                    rounded-full
                    bg-[#FF5A1F]
                  "
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================
          MENU ITEMS
      ======================================================== */}

      <div className="mt-7 px-3 md:px-7 md:pr-9">
        {/* ======================================================
            ITEM LOADING SKELETON
        ====================================================== */}

        {loadingRestaurantItems && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((item) => (
              <ItemCardSkeleton key={item} />
            ))}
          </div>
        )}

        {/* ======================================================
            ERROR
        ====================================================== */}

        {!loadingRestaurantItems && restaurantItemsError && (
          <div className="py-8 text-center">
            <p className="text-xs text-red-500">Unable to load menu</p>

            <button
              type="button"
              onClick={() => getRestaurantItems(id)}
              className="
                  mt-2
                  text-[11px]
                  font-medium
                  text-[#FF5A1F]
                "
            >
              Try Again
            </button>
          </div>
        )}

        {/* ======================================================
            ITEMS
        ====================================================== */}

        {!loadingRestaurantItems &&
          !restaurantItemsError &&
          filteredItems.length > 0 && (
            <div className="flex flex-col gap-3">
              {filteredItems.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          )}

        {/* ======================================================
            NO ITEMS
        ====================================================== */}

        {!loadingRestaurantItems &&
          !restaurantItemsError &&
          filteredItems.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-xs text-subheading">
                {searchQuery
                  ? "No dishes found."
                  : activeTab === "Popular"
                    ? "No popular dishes available."
                    : activeTab === "Best Sellers"
                      ? "No best sellers available."
                      : activeTab === "Meal Combo"
                        ? "No meal combos available."
                        : activeTab === "Offers"
                          ? "No offers available."
                          : "No items available."}
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
