import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiChevronLeft,
  FiClock,
  FiHeart,
  FiSearch,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRestaurants } from "../../context/RestaurantContext";

export default function RestaurantDetails() {
  // =================================================
  // GET RESTAURANT ID FROM URL
  // =================================================

  const { id } = useParams();
  const navigate = useNavigate();

  // =================================================
  // GET RESTAURANTS FROM CONTEXT
  // =================================================

  const {
    restaurants,
    loadingRestaurants,
    restaurantError,
  } = useRestaurants();

  // =================================================
  // FIND RESTAURANT USING ID
  // =================================================

  const restaurant = restaurants.find(
    (item) => String(item._id) === String(id)
  );

  // =================================================
  // TAB STATE
  // =================================================

  const [activeTab, setActiveTab] = useState("For You");

  const tabs = [
    "For You",
    "Popular",
    "Best Sellers",
    "Meal Combo",
    "Offers",
  ];

  // =================================================
  // BANNER LOADING STATE
  // =================================================

  const [bannerLoading, setBannerLoading] = useState(true);

  // =================================================
  // RESTAURANT DETAILS SKELETON
  // =================================================

  const RestaurantDetailsSkeleton = () => {
    return (
      <div className="w-full">

        {/* =================================================
            BACK BUTTON SKELETON
        ================================================= */}

        <div className="md:px-4">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
        </div>

        {/* =================================================
            RESTAURANT BANNER SKELETON
        ================================================= */}

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

        {/* =================================================
            RESTAURANT INFO SKELETON
        ================================================= */}

        <div className="mt-5 px-3 md:px-7 md:pr-9">

          {/* Restaurant Name + Favourite */}

          <div className="flex items-center justify-between">
            <div className="h-6 w-[45%] animate-pulse rounded bg-gray-200 md:h-8 md:w-[30%]" />

            <div className="h-7 w-7 animate-pulse rounded-full bg-gray-200" />
          </div>

          {/* Rating + Delivery Time */}

          <div className="mt-3 flex items-center gap-4">
            <div className="h-3 w-[110px] animate-pulse rounded bg-gray-200" />

            <div className="h-3 w-[90px] animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* =================================================
            SEARCH BAR SKELETON
        ================================================= */}

        <div className="mt-5 flex w-full items-center justify-center">
          <div
            className="
              flex
              h-[40px]
              w-[95%]
              animate-pulse
              items-center
              rounded-md
              bg-gray-200
              px-4
            "
          >
            <div className="h-3 w-3 rounded-full bg-gray-300" />

            <div className="ml-2 h-3 w-[130px] rounded bg-gray-300" />
          </div>
        </div>

        {/* =================================================
            MOBILE TABS SKELETON
        ================================================= */}

        <div className="mt-6 px-3 md:hidden">
          <Swiper
            slidesPerView="auto"
            spaceBetween={28}
            className="w-full"
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <SwiperSlide
                key={item}
                className="!w-auto"
              >
                <div className="h-4 w-[65px] animate-pulse rounded bg-gray-200" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* =================================================
            DESKTOP TABS SKELETON
        ================================================= */}

        <div className="mt-6 hidden px-3 md:block md:px-7 md:pr-9">
          <div className="flex items-center gap-7">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-4 w-[70px] animate-pulse rounded bg-gray-200"
              />
            ))}
          </div>
        </div>

      </div>
    );
  };

  // =================================================
  // API LOADING
  // =================================================

  if (loadingRestaurants) {
    return <RestaurantDetailsSkeleton />;
  }

  // =================================================
  // ERROR
  // =================================================

  if (restaurantError) {
    return (
      <div className="flex min-h-[300px] items-center justify-center px-4">
        <div className="text-center">

          <h3 className="text-base font-semibold text-heading">
            Something went wrong
          </h3>

          <p className="mt-1 text-xs text-red-500">
            {restaurantError}
          </p>

        </div>
      </div>
    );
  }

  // =================================================
  // RESTAURANT NOT FOUND
  // =================================================

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
              transition
              hover:opacity-90
            "
          >
            Back to Restaurants
          </button>

        </div>
      </div>
    );
  }

  // =================================================
  // RESTAURANT DETAILS
  // =================================================

  return (
    <>
      {/* =================================================
          BACK BUTTON
      ================================================= */}

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
          <FiChevronLeft
            size={17}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* =================================================
          RESTAURANT BANNER
      ================================================= */}

      <div className="mt-4 w-full px-3 md:px-7 md:pr-9">

        <div className="relative h-[120px] w-full overflow-hidden rounded-md md:h-[197px]">

          {/* =================================================
              BANNER SKELETON
          ================================================= */}

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

          {/* =================================================
              BANNER IMAGE
          ================================================= */}

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
              ${
                bannerLoading
                  ? "opacity-0"
                  : "opacity-100"
              }
            `}
          />

        </div>

      </div>

      {/* =================================================
          RESTAURANT INFO
      ================================================= */}

      <div className="mt-5 px-3 md:px-7 md:pr-9">

        {/* =================================================
            RESTAURANT NAME + FAVOURITE
        ================================================= */}

        <div className="flex items-center justify-between">

          <h3 className="text-lg font-semibold text-heading md:text-2xl">
            {restaurant.Rname}
          </h3>

          <button
            type="button"
            aria-label="Add to favourites"
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-[#FF5A1F]/[57%]
              text-white
              transition-all
              duration-200
              hover:bg-[#FF5A1F]
              active:scale-95
            "
          >
            <FiHeart
              size={12}
              strokeWidth={1.8}
            />
          </button>

        </div>

        {/* =================================================
            RATING + DELIVERY TIME
        ================================================= */}

        <div className="mt-2 flex items-center gap-4">

          {/* Rating */}

          <div className="flex shrink-0 items-center gap-1">

            <FaStar
              className="text-yellow-400"
              size={11}
            />

            <span className="text-[12px] text-subheading">
              {restaurant.rating} (
              {restaurant.reviews || "0"} Reviews)
            </span>

          </div>

          {/* Delivery Time */}

          <div className="flex shrink-0 items-center gap-1">

            <FiClock
              className="text-subheading"
              size={12}
              strokeWidth={1.8}
            />

            <span className="text-[12px] text-subheading">
              {restaurant.deliveryTime || "25 - 30 min"}
            </span>

          </div>

        </div>

      </div>

      {/* =================================================
          RESTAURANT SEARCH
      ================================================= */}

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

      {/* =================================================
          TABS - MOBILE
      ================================================= */}

      <div className="mt-6 px-3 md:hidden">

        <Swiper
          slidesPerView="auto"
          spaceBetween={28}
          className="w-full"
        >

          {tabs.map((tab) => (
            <SwiperSlide
              key={tab}
              className="!w-auto"
            >

              <button
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`
                  relative
                  whitespace-nowrap
                  pb-3
                  text-[12px]
                  font-medium
                  transition-colors
                  ${
                    activeTab === tab
                      ? "text-[#FF5A1F]"
                      : "text-subheading"
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

            </SwiperSlide>
          ))}

        </Swiper>

      </div>

      {/* =================================================
          TABS - DESKTOP
      ================================================= */}

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
                transition-colors
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
    </>
  );
}