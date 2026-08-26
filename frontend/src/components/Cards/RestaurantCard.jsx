import React from "react";
import { Link } from "react-router-dom";
import { FaClock, FaRupeeSign, FaStar } from "react-icons/fa";

export default function RestaurantCard({
  id,
  Rname,
  Rimage,
  rating,
  cuisines,
  deliveryTime,
  priceForTwo,
}) {
  return (
    <Link
      to={`/restaurantdetail/${id}`}
      className="block w-full"
    >
      <div className="w-full h-[242px] bg-white shadow-[0_4px_18px_rgba(255,90,31,0.07)] rounded-[18px] overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-1">
        
        {/* Restaurant Image */}
        <img
          src={Rimage}
          alt={Rname}
          loading="lazy"
          decoding="async"
          className="w-full h-[150px] object-cover"
        />

        {/* Restaurant Name + Rating */}
        <div className="px-3 pt-3 flex justify-between items-center pr-4">
          <h3 className="font-medium text-heading text-sm truncate">
            {Rname}
          </h3>

          <div className="flex items-center justify-center gap-1 shrink-0">
            <FaStar
              className="text-yellow-400"
              size={11}
            />

            <span className="text-[12px] text-subheading">
              {rating}
            </span>
          </div>
        </div>

        {/* Cuisines */}
        <div className="px-3 mt-[1px]">
          <h5 className="text-[11px] font-semibold text-subheading truncate">
            {cuisines?.join(", ")}
          </h5>
        </div>

        {/* Time + Price */}
        <div className="flex items-center justify-between px-3 mt-3">

          {/* Delivery Time */}
          <div className="text-subheading flex items-center gap-1 min-w-0">
            <FaClock
              size={11}
              className="shrink-0"
            />

            <span className="text-[11px] truncate">
              {deliveryTime}
            </span>
          </div>

          {/* Price For Two */}
          <div className="text-subheading flex items-center gap-1 shrink-0">
            <FaRupeeSign size={11} />

            <span className="text-[11px]">
              {priceForTwo} for two
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
}