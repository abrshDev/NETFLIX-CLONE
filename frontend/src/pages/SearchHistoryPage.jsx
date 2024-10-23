import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { small_image_base_url } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
function formatDates(dateString) {
  // Create a Date object from the date string
  const date = new Date(dateString);

  // Get the month, day, and year components
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  // Construct the formatted date string
  return `${month} ${day}, ${year}`;
}

function SearchHistoryPage() {
  const [searchhistory, setsearchhistory] = useState([]);
  useEffect(() => {
    const getsearch = async () => {
      try {
        const res = await axios.get("/api/v1/search/history");
        setsearchhistory(res.data.history);
      } catch (error) {
        console.log(error.message);
        setsearchhistory([]);
      }
    };
    getsearch();
  }, []);
  const handledelete = async (item) => {
    try {
      await fetch(`/api/v1/search/${item?.id}`, {
        method: "DELETE",
      });
      setsearchhistory(
        searchhistory.filter((entry) => {
          return entry.id !== item.id;
        })
      );
      toast.success("deteled succesfully");
    } catch (error) {
      toast("an error found", {
        icon: "😣",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  if (searchhistory?.length === 1) {
    return (
      <div className="bg-black text-white min-h-screen">
        <NavBar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 ">Search History</h1>

          <div className="flex justify-center items-center h-96">
            <p className="text-2xl text-yellow-700 font-semibold">
              No Search History found
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black text-white min-h-screen">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchhistory.map((item, index) => {
            if (!item.image) return null;
            return (
              <div
                className="bg-gray-800 p-4 rounded flex items-start"
                key={`${item.id}-${index}`}
              >
                <img
                  src={small_image_base_url + item.image}
                  alt=""
                  className="rounded-full size-16 object-cover mr-4"
                />
                <div className="flex flex-col">
                  <span className="text-white text-lg">
                    {item.title.substring(0, 10)}..
                  </span>
                  <span className="text-gray-400 text-sm">
                    {formatDates(item.createdat)}
                  </span>
                </div>
                <span
                  className={`py-1 px-3  min-w-25 text-center rounded-full text-sm ml-auto ${
                    item.searchtitle === "movie"
                      ? "bg-red-600"
                      : item.searchtitle === "tv"
                      ? "bg-green-500"
                      : "bg-yellow-400"
                  }`}
                >
                  {item.searchtitle}
                </span>
                <Trash
                  className="ml-4 cursor-pointer  size-5 hover:fill-red-600"
                  onClick={() => handledelete(item)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchHistoryPage;
