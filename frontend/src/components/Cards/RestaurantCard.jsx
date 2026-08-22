import React from 'react'

import bgking from '../../assets/images/Restuarants/burgerking.webp'

import { FaClock, FaRupeeSign, FaStar } from 'react-icons/fa'

export default function RestaurantCard() {
  return (
    <div className="w-full h-[242px] bg-white shadow-[0_4px_18px_rgba(255,90,31,0.07)] rounded-[18px] overflow-hidden">

      {/* Restaurant Image */}
      <img
        src={bgking}
        alt="Burger House"
        className="w-full h-[150px] object-cover object-top"
      />

      {/* Restaurant Name + Rating */}
      <div className="px-3 pt-3 flex justify-between items-center pr-4">

        <h3 className="font-medium text-heading text-sm truncate">
          Burger House
        </h3>

        <div className="flex items-center justify-center gap-1 shrink-0">

          <FaStar
            className="text-yellow-400"
            size={11}
          />

          <span className="text-[12px] text-subheading">
            4.5
          </span>

        </div>

      </div>

      {/* Category */}
      <div className="px-3 mt-[1px]">

        <h5 className="text-[11px] font-semibold text-subheading truncate">
          Burger, Fastfood
        </h5>

      </div>

      {/* Time + Delivery */}
      <div className="flex items-center justify-between px-3 mt-3">

        {/* Time */}
        <div className="text-subheading flex items-center gap-1 min-w-0">

          <FaClock
            size={11}
            className="shrink-0"
          />

          <span className="text-[11px] truncate">
            20-30 Minutes
          </span>

        </div>

        {/* Delivery */}
        <div className="text-subheading flex items-center gap-1 shrink-0">

          <FaRupeeSign size={11} />

          <span className="text-[11px]">
            25 Delivery
          </span>

        </div>

      </div>

    </div>
  )
}