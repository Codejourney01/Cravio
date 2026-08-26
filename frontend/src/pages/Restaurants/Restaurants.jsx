import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

import Heading from "../../components/Headings/Heading";
import CategoryCard from "../../components/Cards/CategoryCard";
import RestaurantCard from "../../components/Cards/RestaurantCard";

import pizza from "../../assets/icons/Categories/HOME.png";
import burger from "../../assets/icons/Categories/BURGER.webp";
import dessert from "../../assets/icons/Categories/dessert.png";
import juice from "../../assets/icons/Categories/juice.png";
import momo from "../../assets/icons/Categories/momo.webp";

import { useRestaurants } from "../../context/RestaurantContext";

function Restaurants() {
  // =================================================
  // RESTAURANTS FROM CONTEXT
  // =================================================

  const {
    restaurants,
    loadingRestaurants,
    restaurantError,
  } = useRestaurants();

  // =================================================
  // ACTIVE FILTER TAB
  // =================================================

  const restaurantTabs = [
    "All",
    "Fast Delivery",
    "Top Rated",
    "Best Sellers",
  ];

  const [activeTab, setActiveTab] = useState("All");

  // =================================================
  // CATEGORIES
  // =================================================

  const categories = [
    {
      categoryname: "Pizza",
      categoryimg: pizza,
      categoryrestuarants: "18 Restaurants",
    },
    {
      categoryname: "Burgers",
      categoryimg: burger,
      categoryrestuarants: "12 Restaurants",
    },
    {
      categoryname: "Dessert",
      categoryimg: dessert,
      categoryrestuarants: "10 Restaurants",
    },
    {
      categoryname: "Juice",
      categoryimg: juice,
      categoryrestuarants: "15 Restaurants",
    },
    {
      categoryname: "Momos",
      categoryimg: momo,
      categoryrestuarants: "20 Restaurants",
    },
  ];

  // =================================================
  // FILTER RESTAURANTS
  // =================================================

  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (activeTab === "All") {
      return true;
    }

    // -------------------------------
    // TOP RATED
    // -------------------------------

    if (activeTab === "Top Rated") {
      return Number(restaurant.rating) >= 4;
    }

    // -------------------------------
    // FAST DELIVERY
    // -------------------------------

    if (activeTab === "Fast Delivery") {
      const deliveryTime = String(
        restaurant.deliveryTime || ""
      );

      const firstNumber = parseInt(
        deliveryTime.match(/\d+/)?.[0]
      );

      return firstNumber && firstNumber <= 30;
    }

    // -------------------------------
    // BEST SELLERS
    // -------------------------------

    if (activeTab === "Best Sellers") {
      return restaurant.bestSeller === true;
    }

    return true;
  });

  // =================================================
  // RESTAURANT SKELETON
  // =================================================

  const RestaurantSkeleton = () => {
    return (
      <div className="w-full h-[242px] overflow-hidden rounded-[18px] bg-white shadow-[0_4px_18px_rgba(255,90,31,0.07)] dark:bg-[#1a1a1a]">

        {/* IMAGE */}
        <div className="w-full h-[150px] animate-pulse bg-gray-200 dark:bg-gray-800" />

        {/* NAME + RATING */}
        <div className="flex items-center justify-between px-3 pt-3 pr-4">
          <div className="w-[45%] h-4 rounded animate-pulse bg-gray-200 dark:bg-gray-800" />

          <div className="w-10 h-3 rounded animate-pulse bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* CUISINE */}
        <div className="px-3 mt-2">
          <div className="w-[55%] h-3 rounded animate-pulse bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* TIME + PRICE */}
        <div className="flex items-center justify-between px-3 mt-4">
          <div className="w-[35%] h-3 rounded animate-pulse bg-gray-200 dark:bg-gray-800" />

          <div className="w-[30%] h-3 rounded animate-pulse bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    );
  };

  // =================================================
  // RENDER RESTAURANT SKELETONS
  // =================================================

  const renderRestaurantSkeletons = () => {
    return (
      <>
        {/* MOBILE */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {[1, 2, 3, 4].map((item) => (
            <RestaurantSkeleton key={item} />
          ))}
        </div>

        {/* DESKTOP */}
        <div className="hidden grid-cols-2 gap-5 md:grid lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <RestaurantSkeleton key={item} />
          ))}
        </div>
      </>
    );
  };

  // =================================================
  // RENDER RESTAURANT CARDS
  // =================================================

  const renderRestaurantCards = () => {
    if (filteredRestaurants.length === 0) {
      return (
        <p className="col-span-full py-10 text-center text-xs text-subheading">
          No restaurants found.
        </p>
      );
    }

    return filteredRestaurants.map((restaurant) => (
      <RestaurantCard
        key={restaurant._id}
        id={restaurant._id}
        Rname={restaurant.Rname}
        Rimage={restaurant.Rimage}
        rating={restaurant.rating}
        cuisines={restaurant.cuisines}
        deliveryTime={restaurant.deliveryTime}
        priceForTwo={restaurant.priceForTwo}
      />
    ));
  };

  // =================================================
  // PAGE
  // =================================================

  return (
    <div className="w-full">

      {/* =================================================
          CATEGORIES
      ================================================= */}

      <section className="mt-9">

        {/* HEADING */}

        <div className="px-3">
          <Heading
            headingname="Categories"
            subheading="Explore your cravings, one category at a time."
          />
        </div>

        {/* CATEGORY SWIPER */}

        <div className="mt-6 px-3">
          <Swiper
            modules={[FreeMode]}
            freeMode={true}
            slidesPerView={3}
            spaceBetween={12}
            breakpoints={{
              768: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            className="w-full"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <CategoryCard
                  categoryname={category.categoryname}
                  categoryimg={category.categoryimg}
                  categoryrestuarants={
                    category.categoryrestuarants
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* =================================================
          ALL RESTAURANTS
      ================================================= */}

      <section>

        {/* HEADING */}

        <div className="mt-10 px-3">
          <Heading
            headingname="All Restaurants"
            subheading="Explore all restaurants and find your next favorite."
          />
        </div>

        {/* =================================================
            FILTER TABS
        ================================================= */}

        <div className="mt-5 px-3">

          {/* MOBILE */}

          <div className="md:hidden">
            <Swiper
              modules={[FreeMode]}
              freeMode={true}
              slidesPerView="auto"
              spaceBetween={28}
              className="w-full"
            >
              {restaurantTabs.map((tab) => (
                <SwiperSlide
                  key={tab}
                  className="!w-auto"
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative whitespace-nowrap pb-2 text-[12px] font-medium transition-colors ${
                      activeTab === tab
                        ? "text-[#FF5A1F]"
                        : "text-subheading"
                    }`}
                  >
                    {tab}

                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#FF5A1F]" />
                    )}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* DESKTOP */}

          <div className="hidden items-center gap-7 md:flex">
            {restaurantTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative whitespace-nowrap pb-2 text-[12px] font-medium transition-colors ${
                  activeTab === tab
                    ? "text-[#FF5A1F]"
                    : "text-subheading hover:text-heading"
                }`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#FF5A1F]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* =================================================
            RESTAURANTS
        ================================================= */}

        <div className="mt-5 px-3">

          {/* =============================================
              LOADING
          ============================================= */}

          {loadingRestaurants && (
            renderRestaurantSkeletons()
          )}

          {/* =============================================
              ERROR
          ============================================= */}

          {!loadingRestaurants && restaurantError && (
            <div className="py-10 text-center">
              <h3 className="text-sm font-semibold text-heading">
                Something went wrong
              </h3>

              <p className="mt-1 text-xs text-red-500">
                {restaurantError}
              </p>
            </div>
          )}

          {/* =============================================
              MOBILE RESTAURANTS
          ============================================= */}

          {!loadingRestaurants &&
            !restaurantError && (
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {filteredRestaurants.length > 0 ? (
                  filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant._id}
                      id={restaurant._id}
                      Rname={restaurant.Rname}
                      Rimage={restaurant.Rimage}
                      rating={restaurant.rating}
                      cuisines={restaurant.cuisines}
                      deliveryTime={restaurant.deliveryTime}
                      priceForTwo={restaurant.priceForTwo}
                    />
                  ))
                ) : (
                  <p className="py-10 text-center text-xs text-subheading">
                    No restaurants found.
                  </p>
                )}
              </div>
            )}

          {/* =============================================
              DESKTOP RESTAURANTS
          ============================================= */}

          {!loadingRestaurants &&
            !restaurantError && (
              <div className="hidden grid-cols-2 gap-5 md:grid lg:grid-cols-3 xl:grid-cols-4">
                {filteredRestaurants.length > 0 ? (
                  filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant._id}
                      id={restaurant._id}
                      Rname={restaurant.Rname}
                      Rimage={restaurant.Rimage}
                      rating={restaurant.rating}
                      cuisines={restaurant.cuisines}
                      deliveryTime={restaurant.deliveryTime}
                      priceForTwo={restaurant.priceForTwo}
                    />
                  ))
                ) : (
                  <p className="col-span-full py-10 text-center text-xs text-subheading">
                    No restaurants found.
                  </p>
                )}
              </div>
            )}
        </div>
      </section>
    </div>
  );
}

export default Restaurants;