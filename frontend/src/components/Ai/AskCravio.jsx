import React from "react";
import ailogo from "../../assets/icons/ai-logo.png";

export default function AskCravio() {
  return (
    <button
      type="button"
      className="
        fixed
        bottom-5
        right-5
        z-[100]

        flex
        h-[53px]
        w-[150px]
        items-center
        justify-center
        gap-2

        rounded-[28px]

        bg-gradient-to-r
        from-[#FF8A5B]
        to-[#FF5A1F]

        text-white

        shadow-[0_6px_20px_rgba(255,90,31,0.30)]

        transition-all
        duration-200

        hover:scale-105
        hover:shadow-[0_8px_25px_rgba(255,90,31,0.40)]
      "
    >
      {/* AI Logo */}
      <img
        src={ailogo}
        alt="Cravio AI"
        className="h-6 w-6 object-contain"
      />

      {/* Button Text */}
      <span className="text-[12px]  font-medium whitespace-nowrap">
        Ask Cravio AI
      </span>
    </button>
  );
}