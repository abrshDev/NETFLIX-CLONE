import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { usecontentstore } from "../store/content";
import axios from "axios";
import NavBar from "../components/NavBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import {
  orignal_image_base_url,
  small_image_base_url,
} from "../utils/constants";

function formatReleaseDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function WatchPage() {
  const [trailers, settrailers] = useState([]);
  const [similar, setsimilar] = useState([]);
  const [details, setdetails] = useState({});
  const [currenttraileridx, setcurrenttraileridx] = useState(0);
  const [loading, setloading] = useState(true);
  const { id } = useParams();
  const { contenttype } = usecontentstore();
  const sliderRef = useRef(null); // Ref for the similar items slider

  useEffect(() => {
    const gettrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contenttype}/${id}/trailers`);
        settrailers(res.data.trailer);
      } catch (error) {
        if (error.message.includes("404")) {
          settrailers([]);
        }
      }
    };
    gettrailers();
  }, [contenttype, id]);

  useEffect(() => {
    const getsimilar = async () => {
      try {
        const res = await axios.get(`/api/v1/${contenttype}/${id}/similar`);
        setsimilar(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setsimilar([]);
        }
      }
    };
    getsimilar();
  }, [contenttype, id]);

  useEffect(() => {
    const getdetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contenttype}/${id}/details`);
        setdetails(res.data.details);
      } catch (error) {
        if (error.message.includes("404")) {
          setdetails(null);
        }
      } finally {
        setloading(false);
      }
    };
    getdetails();
  }, [contenttype, id]);

  const handleprev = () => {
    if (currenttraileridx > 0) {
      setcurrenttraileridx((current) => current - 1);
    }
  };

  const handlenext = () => {
    if (currenttraileridx < trailers.length - 1) {
      setcurrenttraileridx((current) => current + 1);
    }
  };

  const handleScrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth; // Scroll by container width
    }
  };

  const handleScrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.offsetWidth; // Scroll by container width
    }
  };
  if (loading) {
    return (
      <div className="bg-black min-h-screen p-10">
        <div className="animate-plus">
          <div className="bg-gray-700 rounded-md shimmer w-40 h-6 mb-4"></div>
          <div className="bg-gray-700 rounded-md shimmer w-full h-96 mb-4"></div>
          <div className="bg-gray-700 rounded-md shimmer w-3/4 h-6 mb-2"></div>
          <div className="bg-gray-700 rounded-md shimmer w-1/2 h-6 mb-4"></div>
          <div className="bg-gray-700 rounded-md shimmer w-full h-24 "></div>
        </div>
      </div>
    );
  }
  if (!details) {
    return (
      <div className="bg-black min-h-screen text-white">
        <div className="max-w-6xl mx-auto">
          <NavBar />
          <div className="text-center h-full mt-40 mx-auto py-8 px-4">
            <h1 className="text-6xl font-semibold">Content not Found 😥</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <NavBar />
        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currenttraileridx === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currenttraileridx === 0}
              onClick={handleprev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currenttraileridx === trailers.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currenttraileridx === trailers.length - 1}
              onClick={handlenext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        <div className="aspect-video mb-8 p-2 sm:px-10 sm:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              url={`https://www.youtube.com/watch?v=${trailers[currenttraileridx].key}`}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
            />
          )}
          {trailers.length === 0 && (
            <h2 className="text-xl text-center mt-8">
              No Videos Available for{" "}
              <span className="font-bold text-red-600">
                {details?.title || details?.name}
              </span>
              😥
            </h2>
          )}
        </div>

        {/** movie details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {details?.title || details?.name}
            </h2>
            <p className="mt-2 text-lg">
              {formatReleaseDate(
                details?.release_date || details?.first_air_date
              )}{" "}
              |{" "}
              {details?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>
            <p className="mt-2 text-lg">{details?.overview}</p>
          </div>
          <img
            src={orignal_image_base_url + details?.poster_path}
            alt=""
            className="max-h-[600px] rounded-md"
          />
        </div>

        {similar.length > 0 && (
          <div className="relative max-w-5xl mx-auto mt-12">
            <h2 className="text-3xl font-bold mb-4">Similar TV Shows/Movies</h2>
            <div
              ref={sliderRef}
              className="overflow-hidden whitespace-nowrap relative scroll-smooth"
              style={{ scrollBehavior: "smooth" }} // Inline smooth scrolling
            >
              <div className="flex gap-4">
                {similar.map((content) => {
                  if (similar?.poster_path === null) return null;
                  return (
                    <Link
                      key={content.id}
                      to={`/watch/${content.id}`}
                      className="w-52 flex-none"
                    >
                      <img
                        src={small_image_base_url + content?.poster_path}
                        alt=""
                        className="w-full h-auto rounded-md"
                      />
                      <h4 className="font-semibold mt-2 text-xl">
                        {content?.name || content?.title}
                      </h4>
                    </Link>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleScrollLeft}
              className="absolute top-1/2 -translate-y-1/2 left-5 bg-black bg-opacity-50 hover:bg-opacity-75 text-red-600 p-3 rounded-full z-10"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleScrollRight}
              className="absolute top-1/2 -translate-y-1/2 right-5 bg-black bg-opacity-50 hover:bg-opacity-75 text-red-600 p-3 rounded-full z-10"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchPage;
