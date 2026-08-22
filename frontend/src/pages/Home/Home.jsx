import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import cofeebanner from "../../assets/images/banners/Cofee.webp";

import Heading from "../../components/Headings/Heading";
import CategoryCard from "../../components/Cards/CategoryCard";
import RestaurantCard from "../../components/Cards/RestaurantCard";

import pizza from "../../assets/icons/Categories/HOME.jpeg";
import burger from "../../assets/icons/Categories/BURGER.webp";
import dessert from "../../assets/icons/Categories/dessert.jpg";
import juice from "../../assets/icons/Categories/juice.jpeg";
import momo from "../../assets/icons/Categories/momo.webp";

export default function Home() {
  // ================= CATEGORIES =================

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

  // ================= RESTAURANTS =================

  const restaurants = [
    {
      id: 1,
      name: "Burger House",
    },
    {
      id: 2,
      name: "Pizza Palace",
    },
    {
      id: 3,
      name: "Tasty Bites",
    },
    {
      id: 4,
      name: "Food Corner",
    },
    {
      id: 5,
      name: "Burger King",
    },
    {
      id: 6,
      name: "The Food Hub",
    },
    {
      id: 7,
      name: "Spice Kitchen",
    },
    {
      id: 8,
      name: "Crave House",
    },
  ];

  return (
    <div className="w-full">
      {/* ================= BANNER ================= */}

      <div className="flex items-center justify-center">
        <img
          src={cofeebanner}
          className="w-[98%] md:w-[98%] md:h-[300px] md:object-cover rounded-md"
          alt="Coffee Banner"
        />
      </div>

      {/* ================= CATEGORIES ================= */}

      <section className="mt-9">
        {/* Heading */}

        <div className="px-3">
          <Heading
            headingname="Categories"
            subheading="Explore your cravings, one category at a time."
          />
        </div>

        {/* Category Swiper */}

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

      {/* ================= POPULAR RESTAURANTS ================= */}

      <section className="mt-9">
        {/* Heading */}

        <div className="px-3">
          <Heading
            headingname="Popular Restaurants"
            subheading="The places everyone is craving right now."
          />
        </div>

        <div className="px-3 mt-5">
          {/* ================================================= */}
          {/* ================= MOBILE GRID =================== */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} />
            ))}
          </div>

          {/* ================================================= */}
          {/* ================= DESKTOP SWIPER ================= */}
          {/* ================================================= */}

          <div className="hidden md:block relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".restaurant-next",
                prevEl: ".restaurant-prev",
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
              {restaurants.map((restaurant) => (
                <SwiperSlide key={restaurant.id}>
                  <RestaurantCard />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ================= PREVIOUS BUTTON ================= */}

            {/* Previous Button */}
            <button
              className="
    restaurant-prev
    absolute
    left-0
    top-1/2
    -translate-y-1/2
    z-10
    w-9
    h-9
    bg-white
    shadow-md
    rounded-full
    flex
    items-center
    justify-center
    text-gray-600
    hover:text-[#FF5A1F]
    transition
  "
            >
              <FiChevronLeft size={20} />
            </button>

            {/* Next Button */}
            <button
              className="
    restaurant-next
    absolute
    right-0
    top-1/2
    -translate-y-1/2
    z-10
    w-9
    h-9
    bg-white
    shadow-md
    rounded-full
    flex
    items-center
    justify-center
    text-gray-600
    hover:text-[#FF5A1F]
    transition
  "
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="px-3 mt-7">
          <Heading headingname={"Picked Just For You "} subheading={"Personalized recommendations from Cravio."} />
        </div>
      </section>
    </div>
  );
}
