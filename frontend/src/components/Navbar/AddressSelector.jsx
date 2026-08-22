import React, { useState } from "react";
import {
  FiMapPin,
  FiChevronDown,
  FiCheck,
  FiPlus,
} from "react-icons/fi";

export default function AddressSelector() {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState({
    name: "Home",
    address: "123, ABC Society, Ahmedabad",
  });

  const savedAddresses = [
    {
      name: "Home",
      address: "123, ABC Society, Ahmedabad",
    },
    {
      name: "Work",
      address: "SG Highway, Ahmedabad",
    },
  ];

  return (
    <div className="relative w-[200px]">

      {/* Selected Address */}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex w-full items-center gap-3
          rounded-xl
          px-3 py-2.5
          text-left
          transition
          hover:border-gray-200
        "
      >
        <FiMapPin
          size={19}
          strokeWidth={1.8}
          className="shrink-0 text-[#FF5A1F]"
        />

        <div className="min-w-0 flex-1">

          <p className="text-xs text-[#9097A2]">
            Select your address
          </p>



        </div>

        <FiChevronDown
          size={18}
          className={`
            shrink-0
            text-[#9CA3AF]
            transition-transform
            duration-200
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>


      {/* Dropdown */}

      {isOpen && (
        <div
          className="
            absolute left-0 top-full z-[100]
            mt-2 w-full
            overflow-hidden
            rounded-xl
            border border-gray-100
            bg-white
            shadow-lg
          "
        >

          {/* Heading */}

          <div className="border-b border-gray-100 px-4 py-3">

            <p className="text-sm font-semibold text-black">
              Select your address
            </p>

            <p className="mt-0.5 text-xs text-[#C1C1C1]">
              Choose where you want your order delivered
            </p>

          </div>


          {/* Saved Addresses */}

          <div className="p-2">

            {savedAddresses.map((item) => {

              const isSelected =
                selectedAddress.name === item.name;

              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => {
                    setSelectedAddress(item);
                    setIsOpen(false);
                  }}
                  className="
                    flex w-full items-start gap-3
                    rounded-lg
                    px-3 py-3
                    text-left
                    transition
                    hover:bg-gray-50
                  "
                >

                  <FiMapPin
                    size={18}
                    strokeWidth={1.8}
                    className={
                      isSelected
                        ? "mt-0.5 text-[#FF5A1F]"
                        : "mt-0.5 text-[#9CA3AF]"
                    }
                  />

                  <div className="min-w-0 flex-1">

                    <p className="text-sm font-medium text-black">
                      {item.name}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-[#9097A2]">
                      {item.address}
                    </p>

                  </div>

                  {isSelected && (
                    <FiCheck
                      size={17}
                      strokeWidth={2}
                      className="text-[#FF5A1F]"
                    />
                  )}

                </button>
              );
            })}


            {/* Add Address */}

            <button
              type="button"
              className="
                mt-1
                flex w-full items-center gap-3
                rounded-lg
                px-3 py-3
                text-sm font-medium
                text-[#FF5A1F]
                transition
                hover:bg-orange-50
              "
            >
              <FiPlus size={18} />

              <span>
                Add new address
              </span>
            </button>

          </div>
        </div>
      )}

    </div>
  );
}