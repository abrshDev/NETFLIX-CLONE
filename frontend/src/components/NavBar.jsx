import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthUser } from "../store/AuthUser";
import { usecontentstore } from "../store/content";
function NavBar() {
  const { user, logout } = useAuthUser();
  const { setcontenttype } = usecontentstore();
  const [ismobile, setismoblie] = useState(false);
  const toggler = () => {
    setismoblie(!ismobile);
  };

  return (
    <div className="max-w-6xl flex flex-wrap items-center justify-between mx-auto p-4 h-20  ">
      <div className="flex items-center gap-10 z-50 ">
        <Link to={"/login"}>
          <img src="/netflix-logo.png" alt="" className="w-32 md:w-52" />
        </Link>

        {/** desktop navbar items */}
        <div className="hidden sm:flex  gap-2  items-center">
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setcontenttype("movie")}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setcontenttype("tv")}
          >
            Tv shows
          </Link>
          <Link to={"/history"} className="hover:underline">
            Search History
          </Link>
        </div>
      </div>
      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="cursor-pointer size-6" />
        </Link>
        <img src={user.image} alt="" className="h-8 rounde cursor-pointer" />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="cursor-pointer size-6" onClick={toggler} />
        </div>
        <div />
      </div>
      {ismobile && (
        <div className="w-full  sm:hidden mt-4 z-50 border bg-black rounded border-gray-800">
          <Link to={"/"} className="hover:underline block">
            Movies
          </Link>
          <Link to={"/"} className="hover:underline block">
            Tv shows
          </Link>
          <Link to={"/history"} className="hover:underline block">
            Search History
          </Link>
        </div>
      )}
      {/**mobile */}
    </div>
  );
}

export default NavBar;
