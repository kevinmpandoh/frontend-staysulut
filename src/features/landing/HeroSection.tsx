import Image from "next/image";

import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-blue-100 text-slate-600 mx-auto py-16 px-4 md:px-12 xl:px-36 flex flex-col-reverse md:flex-row items-center justify-between">
      {/* Left Side */}
      <div className="mt-10 md:w-1/3 w-full">
        <h1 className="text-3xl md:text-5xl leading-snug md:leading-[3.5rem] font-bold mb-4 drop-shadow-2xl text-center md:text-left">
          Temukan <span className="text-primary font-bold">Kost Impianmu</span>{" "}
          dengan mudah dan cepat
        </h1>
        <p className="mb-6 font-semibold text-base md:text-lg text-center md:text-left">
          Cari kost berdasarkan lokasi, harga, dan fasilitas yang kamu inginkan.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-lg">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cari Kost, Lokasi..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>

          {/* <input
            type="text"
            placeholder="Cari kost di mana?"
            className="w-full px-4 py-3 text-base text-gray-700 rounded-md focus:outline-none"
          />
          <button className="bg-orange-600 px-4 py-3 text-white text-base font-semibold rounded-md hover:bg-orange-700 transition-all flex items-center justify-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
            Cari
          </button> */}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-[28rem] flex justify-center">
        <Image
          src="/apartment-rent.svg"
          alt="Illustration"
          width={400}
          height={400}
          className="w-72 md:w-full h-auto"
        />
      </div>
    </section>

    // <section className="bg-blue-100 text-slate-600 px-36 py-20 flex items-center gap-10 md:flex-row md:justify-between md:items-center">
    //   {/* Text */}
    //   <div className="text-center md:text-left w-full md:w-1/2">
    //     <h1 className="text-xl md:text-4xl xl:text-5xl leading-snug font-bold mb-4 drop-shadow-2xl">
    //       Temukan <span className="text-primary font-bold">Kost Impianmu</span>{" "}
    //       dengan mudah dan cepat
    //     </h1>
    //     <p className="mb-6 font-semibold text-lg">
    //       Cari kost berdasarkan lokasi, harga, dan fasilitas yang kamu inginkan.
    //     </p>

    //     {/* Input Search */}
    //     <div className="bg-white p-2 rounded flex items-center justify-center md:justify-start max-w-md">
    //       <input
    //         type="text"
    //         placeholder="Cari kost di mana?"
    //         className="w-full max-w-xs md:max-w-sm px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
    //       />
    //       <button className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-orange-700 transition-colors">
    //         Cari
    //       </button>
    //     </div>
    //   </div>

    //   {/* Image */}
    //   <div className="w-full max-w-md md:max-w-lg">
    //     <Image
    //       src="/apartment-rent.svg"
    //       alt="Illustration of houses and a magnifying glass"
    //       width={600}
    //       height={600}
    //       className="hidden md:flex md:w-64 xl:w-120 h-auto"
    //     />
    //   </div>
    // </section>
  );
};

export default HeroSection;
