import { useEffect, useState, useRef } from "react";
import { usecontentstore } from "../store/content";
import { Link } from "react-router-dom";
import axios from "axios";
import { small_image_base_url } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Movieslider({ category }) {
  const { contenttype } = usecontentstore();
  const [content, setcontent] = useState([]);
  const [showarrays, setshowarrays] = useState(false);

  const sliderRef = useRef(null); // Reference for the slider container

  const formatedcontenttype = contenttype === "movie" ? "Movies" : "Tv Shows";
  const formatedcategoryname =
    category.replaceAll("_", "")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);

  useEffect(() => {
    const getcontent = async () => {
      const res = await axios.get(`/api/v1/${contenttype}/${category}`);
      setcontent(res.data.category);
    };
    getcontent();
  }, [contenttype, category]);

  // Function to scroll left
  const handleScrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth; // Scroll by the width of the container
    }
  };

  // Function to scroll right
  const handleScrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.offsetWidth; // Scroll by the width of the container
    }
  };

  return (
    <div
      className="text-white bg-black px-5 md:px-20 relative"
      onMouseEnter={() => setshowarrays(true)}
      onMouseLeave={() => setshowarrays(false)}
    >
      <h2 className="mb-4 font-bold text-2xl">
        {formatedcategoryname} {formatedcontenttype}
      </h2>
      <div
        ref={sliderRef} // Attach the ref to the scrollable div
        className="flex space-x-4 overflow-x-auto scrollbar-hide"
        style={{
          scrollBehavior: "smooth", // Smooth scroll behavior
          WebkitOverflowScrolling: "touch", // Enable smooth scrolling on mobile
          overflow: "hidden", // Hide the scrollbar
        }}
      >
        {content?.map((item) => (
          <Link
            to={`/watch/${item?.id}`}
            className="
              min-w-[50%] sm:min-w-[33.33%] 
              md:min-w-[25%] lg:min-w-[20%]
              relative group"
            key={item?.id}
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={small_image_base_url + item?.backdrop_path}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
            <p className="mt-2 text-center text-sm md:text-base">
              {item?.title || item?.name}
            </p>
          </Link>
        ))}
      </div>
      {showarrays && (
        <>
          {/* Left scroll button */}
          <button
            onClick={handleScrollLeft} // Trigger left scroll on click
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right scroll button */}
          <button
            onClick={handleScrollRight} // Trigger right scroll on click
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}

export default Movieslider;
