import NavBar from "../../components/NavBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";
import Usegettrendingcontent from "../../hooks/usegettrendingcontent";
import Movieslider from "../../components/Movieslider";
import {
  orignal_image_base_url,
  movie_categories,
  tv_categories,
} from "../../utils/constants";
import { usecontentstore } from "../../store/content";

function HomeScreen() {
  const { gettrending } = Usegettrendingcontent();
  const { contenttype } = usecontentstore();
  const [imgloading, setimgloading] = useState(true);
  if (!gettrending) {
    return (
      <>
        <div className="h-screen text-white relative">
          <NavBar />
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-20 shimmer"></div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="relative h-screen text-white ">
        <NavBar />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50"
          aria-hidden="true"
        />
        {imgloading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-20 shimmer"></div>
        )}
        <img
          onLoad={() => setimgloading(false)}
          src={orignal_image_base_url + gettrending?.backdrop_path}
          alt=""
          className="top-0 left-0 absolute w-full h-full object-cover -z-10"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b via-transparent from-black to-transparent absolute top-0 left-0 w-full h-full -z-10" />
          <div className="max-w-2xl ">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {gettrending?.name || gettrending?.title}
            </h1>
            <p className="mt-2 text-lg">
              {gettrending?.release_date?.split("-")[0] ||
                gettrending?.first_air_date.split("-")[0]}{" "}
              | {gettrending?.adult ? "18+" : "13-pg"}
            </p>
            <p className="mt-4 text-lg">
              {gettrending?.overview.length
                ? gettrending?.overview?.slice(0, 200) + "..."
                : gettrending?.overview}
            </p>
          </div>
          <div className="flex mt-8">
            <Link
              to={`/watch/${gettrending?.id}`}
              className="bg-white text-black flex font-bold hover:bg-white/80 py-2 px-4  rounded  mr-4 items-center"
            >
              <Play className="size-6 mr-2 fill-black" />
              Play
            </Link>
            <Link className="bg-gray-500/70 text-black flex font-bold hover:bg-white/10 py-2 px-4  rounded items-center">
              <Info className="size-6 mr-2 " />
              More Info
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-black gap-10 py-10">
        {contenttype === "movie"
          ? movie_categories.map((category) => (
              <Movieslider key={category} category={category} />
            ))
          : tv_categories.map((category) => (
              <Movieslider key={category} category={category} />
            ))}
      </div>
    </>
  );
}

export default HomeScreen;
