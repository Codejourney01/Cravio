import React, { useEffect, useState } from "react";

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

import { getRestaurants } from "../../api/restuarantapi";

export default function Home() {
  // ================= RESTAURANTS FROM API =================

  const [restaurants, setRestaurants] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [restaurantError, setRestaurantError] = useState("");

  // ================= RANDOM LOADING MESSAGE =================

  const [loadingMessage, setLoadingMessage] = useState(
    "Hungry? Cravio now! 🍔"
  );

  const loadingMessages = [
    "Hungry? Cravio now! 🍔",
    "Finding something delicious... 🍕",
    "Your cravings are loading... 😋",
    "Cravio is cooking up something good... 🔥",
    "Searching for your next bite... 🍟",
    "Good food is almost here... ❤️",
    "Something tasty is on the way... 🚀",
    "Preparing your food adventure... 🌮",
    "Your next favourite restaurant is loading... ⭐",
    "Just a little more, food lover... 🍴",
  ];

  // ================= FETCH RESTAURANTS =================

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();

        setRestaurants(data.restaurants);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);

        setRestaurantError("Failed to load restaurants");
      } finally {
        setLoadingRestaurants(false);
      }
    };

    fetchRestaurants();
  }, []);

  // ================= CHANGE LOADING MESSAGE =================

  useEffect(() => {
    if (!loadingRestaurants) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(
        Math.random() * loadingMessages.length
      );

      setLoadingMessage(loadingMessages[randomIndex]);
    }, 1500);

    return () => clearInterval(interval);
  }, [loadingRestaurants]);

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

  return (
    <div className="w-full">

      {/* ================= BANNER ================= */}

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
              className="w-full h-[180px] md:h-[300px] object-cover rounded-md"
              alt="Coffee Banner"
            />
          </SwiperSlide>

          {/* Banner 2 */}

          <SwiperSlide>
            <img
              src={banner2}
              className="w-full h-[180px] md:h-[300px] object-cover rounded-md object-top"
              alt="Banner 2"
            />
          </SwiperSlide>

          {/* Banner 3 */}

          <SwiperSlide>
            <img
              src={banner3}
              className="w-full h-[180px] md:h-[300px] object-cover rounded-md object-top"
              alt="Banner 3"
            />
          </SwiperSlide>

        </Swiper>
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

          {/* ================= LOADING ================= */}

          {loadingRestaurants && (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm md:text-base font-medium text-subheading animate-pulse">
                {loadingMessage}
              </p>
            </div>
          )}

          {/* ================= ERROR ================= */}

          {restaurantError && (
            <p className="text-sm text-red-500">
              {restaurantError}
            </p>
          )}

          {/* ================= MOBILE GRID ================= */}

          {!loadingRestaurants && !restaurantError && (
            <div className="grid grid-cols-1 gap-4 md:hidden">

              {restaurants.map((restaurant) => (
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
          )}

          {/* ================= DESKTOP SWIPER ================= */}

          {!loadingRestaurants && !restaurantError && (
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
          )}

        </div>

      </section>

      {/* ================= PICKED JUST FOR YOU ================= */}

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