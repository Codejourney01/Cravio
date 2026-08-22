import React from 'react'

export default function CategoryCard({
  categoryname,
  categoryimg,
  categoryrestuarants
}) {
  return (
    <div className="
      w-full
      h-[120px]
      md:h-[150px]
      lg:h-[177px]
      flex
      flex-col
      items-center
      justify-center
    ">

      {/* Image Background */}
      <div className="
        w-16 h-16
        md:w-[90px] md:h-[90px]
        lg:w-[105px] lg:h-[105px]

        bg-white

        rounded-full
        md:rounded-[24px]

        flex
        items-center
        justify-center

        shadow-[0_4px_18px_rgba(255,90,31,0.07)]
      ">
        <img
          className="
            w-9 h-9
            md:w-12 md:h-12
            lg:w-14 lg:h-14
            object-contain
          "
          src={categoryimg}
          alt={categoryname}
        />
      </div>

      {/* Details */}
      <div className="mt-2 md:mt-3 flex flex-col items-center justify-center">

        <h2 className="font-semibold text-sm lg:text-base">
          {categoryname}
        </h2>

        <h5 className="
          text-[10px]
          md:text-[11px]
          lg:text-[12px]
          text-[#9097A2]
        ">
          {categoryrestuarants}
        </h5>

      </div>

    </div>
  )
}