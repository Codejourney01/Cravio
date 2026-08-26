import React, { useState } from "react";
import { useParams } from "react-router-dom";

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
  const { id } = useParams();

  const {
    getRestaurantById,
    loadingRestaurants,
  } = useRestaurants();

  const restaurant = getRestaurantById(id);

  const [activeTab, setActiveTab] = useState("For You");

  const tabs = [
    "For You",
    "Popular",
    "Best Sellers",
    "Meal Combo",
    "Offers",
  ];

  // ================= LOADING =================

  if (loadingRestaurants) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-subheading">
          Loading restaurant...
        </p>
      </div>
    );
  }

  // ================= NOT FOUND =================

  if (!restaurant) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <h3 className="text-base font-semibold text-heading">
            Restaurant not found
          </h3>

          <p className="mt-1 text-xs text-subheading">
            The restaurant you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ================= BACK BUTTON ================= */}

      <div className="md:px-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="
            flex h-8 w-8
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

      {/* ================= RESTAURANT INFO ================= */}

      <div className="mt-5 px-3 md:px-7 md:pr-9">

        {/* Restaurant Name + Favourite */}

        <div className="flex items-center justify-between">

          <h3 className="text-lg font-semibold text-heading md:text-2xl">
            {restaurant.Rname}
          </h3>

          <button
            type="button"
            aria-label="Add to favourites"
            className="
              flex h-7 w-7
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

        {/* Rating + Delivery Time */}

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

      {/* ================= RESTAURANT SEARCH ================= */}

      <div className="mt-5 flex w-full items-center justify-center">

        <div
          className="
            flex h-[40px]
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

      {/* ================= TABS ================= */}

      {/* MOBILE - SWIPER */}

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

      {/* DESKTOP - NORMAL TABS */}

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