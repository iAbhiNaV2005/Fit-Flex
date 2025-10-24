import React from "react";
import SvgIcon from "./SvgIcon";

const SearchExercises = ({
  setSearch,
  search,
  setBodyPart,
  bodyPart,
  bodyParts,
}) => (
  <section
    id="exercises-section"
    className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
  >
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
        Find Your <span className="text-rose-500">Perfect</span> Exercise
      </h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-2xl mx-auto mb-12"
      >
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search for exercises..."
            className="w-full py-4 pl-5 pr-12 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-4"
          >
            <SvgIcon name="search" className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </form>

      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          <button
            onClick={() => setBodyPart("all")}
            className={`flex-shrink-0 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${
              bodyPart === "all"
                ? "bg-rose-500 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          
          
          {bodyParts.map((item) => (
            <button
              key={item}
              onClick={() => setBodyPart(item)}
              className={`flex-shrink-0 px-6 py-3 text-sm font-semibold capitalize rounded-full transition-all duration-300 ${
                bodyPart === item
                  ? "bg-rose-500 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SearchExercises;
