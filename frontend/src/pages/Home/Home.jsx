import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import cofeebanner from "../../assets/images/banners/Cofee.webp";
import banner2 from "../../assets/images/banners/banner2.jpeg";
import banner3 from "../../assets/images/banners/banner3.jpeg";

import Heading from "../../components/Headings/Heading";
import CategoryCard from "../../components/Cards/CategoryCard";
import RestaurantCard from "../../components/Cards/RestaurantCard";

import pizza from "../../assets/icons/Categories/HOME.png";
import burger from "../../assets/icons/Categories/BURGER.webp";
import dessert from "../../assets/icons/Categories/dessert.png";
import juice from "../../assets/icons/Categories/juice.png";
import momo from "../../assets/icons/Categories/momo.webp";

import { useRestaurants } from "../../context/RestaurantContext";

export default function Home() {
  // =================================================
  // RESTAURANTS FROM CONTEXT
  // =================================================

  const {
    popularRestaurants,
    loadingRestaurants,
    restaurantError,
  } = useRestaurants();

  // =================================================
  // RESTAURANT SWIPER BUTTON REFS
  // =================================================

  const restaurantPrevRef = useRef(null);
  const restaurantNextRef = useRef(null);
  const restaurantSwiperRef = useRef(null);

  // =================================================
  // CONNECT CUSTOM SWIPER BUTTONS
  // =================================================

  useEffect(() => {
    if (
      !restaurantSwiperRef.current ||
      !restaurantPrevRef.current ||
      !restaurantNextRef.current
    ) {
      return;
    }

    const swiper = restaurantSwiperRef.current;

    swiper.params.navigation.prevEl = restaurantPrevRef.current;
    swiper.params.navigation.nextEl = restaurantNextRef.current;

    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, [popularRestaurants]);

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
  // BANNER SKELETON
  // =================================================

  const BannerSkeleton = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="w-[98%] h-[180px] md:h-[300px] rounded-md bg-gray-200 animate-pulse" />
      </div>
    );
  };

  // =================================================
  // CATEGORY SKELETON
  // =================================================

  const CategorySkeleton = () => {
    return (
      <div className="w-full h-[120px] md:h-[150px] lg:h-[177px] bg-gray-200 rounded-[24px] animate-pulse" />
    );
  };

  // =================================================
  // RESTAURANT SKELETON
  // =================================================

  const RestaurantSkeleton = () => {
    return (
      <div className="w-full h-[242px] bg-white shadow-[0_4px_18px_rgba(255,90,31,0.07)] rounded-[18px] overflow-hidden">
        {/* Image */}
        <div className="w-full h-[150px] bg-gray-200 animate-pulse" />

        {/* Name + Rating */}
        <div className="px-3 pt-3 flex justify-between items-center pr-4">
          <div className="w-[45%] h-4 bg-gray-200 rounded animate-pulse" />

          <div className="w-10 h-3 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Cuisine */}
        <div className="px-3 mt-2">
          <div className="w-[55%] h-3 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Time + Price */}
        <div className="flex items-center justify-between px-3 mt-4">
          <div className="w-[35%] h-3 bg-gray-200 rounded animate-pulse" />

          <div className="w-[30%] h-3 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  };

  // =================================================
  // FULL PAGE SKELETON LOADING
  // =================================================

  if (loadingRestaurants) {
    return (
      <div className="w-full">
        {/* =================================================
            BANNER SKELETON
        ================================================= */}

        <BannerSkeleton />

        {/* =================================================
            CATEGORIES SKELETON
        ================================================= */}

        <section className="mt-9">
          <div className="px-3">
            <div className="w-[140px] h-6 bg-gray-200 rounded animate-pulse" />

            <div className="w-[280px] h-4 bg-gray-200 rounded animate-pulse mt-2" />
          </div>

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
              {[1, 2, 3, 4, 5].map((item) => (
                <SwiperSlide key={item}>
                  <CategorySkeleton />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* =================================================
            POPULAR RESTAURANTS SKELETON
        ================================================= */}

        <section className="mt-9">
          <div className="px-3">
            <div className="w-[200px] h-6 bg-gray-200 rounded animate-pulse" />

            <div className="w-[320px] h-4 bg-gray-200 rounded animate-pulse mt-2" />
          </div>

          <div className="px-3 mt-5">
            {/* Mobile */}

            <div className="grid grid-cols-1 gap-4 md:hidden">
              {[1, 2, 3, 4].map((item) => (
                <RestaurantSkeleton key={item} />
              ))}
            </div>

            {/* Desktop */}

            <div className="hidden md:block">
              <Swiper
                slidesPerView={3}
                spaceBetween={16}
                breakpoints={{
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
                className="w-full"
              >
                {[1, 2, 3, 4].map((item) => (
                  <SwiperSlide key={item}>
                    <RestaurantSkeleton />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* =================================================
            PICKED JUST FOR YOU SKELETON
        ================================================= */}

        <section>
          <div className="px-3 mt-9">
            <div className="w-[190px] h-6 bg-gray-200 rounded animate-pulse" />

            <div className="w-[280px] h-4 bg-gray-200 rounded animate-pulse mt-2" />
          </div>
        </section>
      </div>
    );
  }

  // =================================================
  // ERROR
  // =================================================

  if (restaurantError) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <p className="text-sm text-red-500">{restaurantError}</p>
      </div>
    );
  }

  // =================================================
  // ACTUAL HOME PAGE
  // =================================================

  return (
    <div className="w-full">
      {/* =================================================
          BANNER
      ================================================= */}

      <div className="flex items-center justify-center">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          slidesPerView={1}
          className="w-[98%]"
        >
          {/* Banner 1 */}

          <SwiperSlide>
            <img
              src={cofeebanner}
              loading="eager"
              decoding="async"
              className="w-full h-[180px] md:h-[300px] object-cover rounded-md"
              alt="Coffee Banner"
            />
          </SwiperSlide>

          {/* Banner 2 */}

          <SwiperSlide>
            <img
              src={banner2}
              loading="lazy"
              decoding="async"
              className="w-full h-[180px] md:h-[300px] object-cover rounded-md object-top"
              alt="Banner 2"
            />
          </SwiperSlide>

          {/* Banner 3 */}

          <SwiperSlide>
            <img
              src={banner3}
              loading="lazy"
              decoding="async"
              className="w-full h-[180px] md:h-[300px] object-cover rounded-md object-top"
              alt="Banner 3"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* =================================================
          CATEGORIES
      ================================================= */}

      <section className="mt-9">
        <div className="px-3">
          <Heading
            headingname="Categories"
            subheading="Explore your cravings, one category at a time."
          />
        </div>

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
                  categoryrestuarants={category.categoryrestuarants}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* =================================================
          POPULAR RESTAURANTS
      ================================================= */}

      <section className="mt-9">
        <div className="px-3">
          <Heading
            headingname="Popular Restaurants"
            subheading="The places everyone is craving right now."
          />
        </div>

        <div className="px-3 mt-5">
          {/* =================================================
              MOBILE
          ================================================= */}

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {popularRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                Rname={restaurant.Rname}
                Rimage={restaurant.Rimage}
                rating={restaurant.rating}
                cuisines={restaurant.cuisines}
                deliveryTime={restaurant.deliveryTime}
                priceForTwo={restaurant.priceForTwo}
              />
            ))}
          </div>

          {/* =================================================
              DESKTOP
          ================================================= */}

          <div className="hidden md:block relative">
            <Swiper
              modules={[Navigation]}
              onSwiper={(swiper) => {
                restaurantSwiperRef.current = swiper;
              }}
              slidesPerView={3}
              spaceBetween={16}
              breakpoints={{
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              className="w-full"
            >
              {popularRestaurants.map((restaurant) => (
                <SwiperSlide key={restaurant._id}>
                  <RestaurantCard
                    Rname={restaurant.Rname}
                    Rimage={restaurant.Rimage}
                    rating={restaurant.rating}
                    cuisines={restaurant.cuisines}
                    deliveryTime={restaurant.deliveryTime}
                    priceForTwo={restaurant.priceForTwo}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* =================================================
                PREVIOUS BUTTON
            ================================================= */}

            <button
              ref={restaurantPrevRef}
              type="button"
              aria-label="Previous restaurants"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:text-[#FF5A1F] transition"
            >
              <FiChevronLeft size={20} />
            </button>

            {/* =================================================
                NEXT BUTTON
            ================================================= */}

            <button
              ref={restaurantNextRef}
              type="button"
              aria-label="Next restaurants"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:text-[#FF5A1F] transition"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* =================================================
          PICKED JUST FOR YOU
      ================================================= */}

      <section>
        <div className="px-3 mt-7">
          <Heading
            headingname="Picked Just For You"
            subheading="Personalized recommendations from Cravio."
          />
        </div>
      </section>
    </div>
  );
}