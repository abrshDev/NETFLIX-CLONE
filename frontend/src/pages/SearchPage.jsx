import { usecontentstore } from "../store/content";
import { useState } from "react";
import NavBar from "../components/NavBar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { orignal_image_base_url } from "../utils/constants";
function SearchPage() {
  const [activetab, setactivetab] = useState("movie");
  const [results, setresults] = useState([]);
  const [searchitem, setsearchitem] = useState([]);
  const { setcontenttype } = usecontentstore();
  const handletabclick = (tab) => {
    setactivetab(tab);
    tab === "movie" ? setcontenttype("movie") : setcontenttype("tv");
    setresults([]);
  };
  const handlesearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activetab}/${searchitem}`);
      setresults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast(
          "Nothing Found, Make sure you are searching under the right category",
          {
            icon: "😣",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      } else {
        toast("Nothing Found , an error found", {
          icon: "😣",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />
      <div className="mx-auto container px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded ${
              activetab === "movie" ? "bg-red-600" : "bg-gray-700"
            } hover:bg-red-700`}
            onClick={() => handletabclick("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activetab === "tv" ? "bg-red-600" : "bg-gray-700"
            } hover:bg-red-700`}
            onClick={() => handletabclick("tv")}
          >
            Tvs
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activetab === "person" ? "bg-red-600" : "bg-gray-700"
            } hover:bg-red-700`}
            onClick={() => handletabclick("person")}
          >
            Person
          </button>
        </div>
        <form
          className="flex gap items-strech mb-8 max-w-2xl mx-auto"
          onSubmit={handlesearch}
        >
          <input
            type="text"
            placeholder={"search for a " + activetab}
            value={searchitem}
            onChange={(e) => setsearchitem(e.target.value)}
            className="w-full rounded p-2 bg-gray-800 text-white"
          />
          <button className="bg-green-600 p-2 rounded text-white">
            <Search className="size-6" />
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;

            return (
              <div className="bg-gray-800 p-4 rounded" key={result.id}>
                {activetab === "person" ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={orignal_image_base_url + result.profile_path}
                      alt=""
                      className="min-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </div>
                ) : (
                  <Link
                    to={`/watch/${result?.id}`}
                    className="flex flex-col items-center"
                    onClick={() => setcontenttype(activetab)}
                  >
                    <img
                      src={orignal_image_base_url + result.poster_path}
                      alt=""
                      className="min-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
