import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
function AuthScreen() {
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const handleformsubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  };
  return (
    <div className="hero-bng relative ">
      {/*navbar */}
      <header className="max-w-6xl flex items-center justify-between mx-auto p-4 pb-10">
        <img src="/netflix-logo.png" alt="" className="w-32 md:w-52" />
        <Link
          to={"/login"}
          className="bg-red-600 text-white py-1 px-2 rounded-md"
        >
          Sign In
        </Link>
      </header>
      {/*hero section */}
      <div className="max-w-6xl flex items-center flex-col justify-between mx-auto py-40 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited movies ,tv shows,and more
        </h1>
        <p className="text-lg pb-4">Watch Anywhere. Cancel Anytime.</p>
        <p className=" pb-4">
          Ready to Watch?. Enter your email to create or restart membership
        </p>
        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handleformsubmit}
        >
          <input
            type="email"
            className="p-2 rounded  border border-gray-700  bg-black/80  w-full"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <button className="w-full bg-red-600 lg:text-2xl rounded py-1 md:py-2 px-2 texl-xl hover:bg-red-700 flex justify-center items-center">
            Get started
            <ChevronRight className="size-8 md:size-10" />
          </button>
        </form>
      </div>
      {/*   separator*/}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>
      {/* section 1 */}
      <div className="bg-black text-white py-10">
        <div className="flex max-w-6xl items-center justify-center md:flex-row flex-col px-4 md:px-2 mx-auto">
          {/* left side */}
          <div className="flex-1 text-center md:text-start">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Enjoy on Your Tv
            </h2>
            <p className="text-lg md:text-xl">
              Watch on Smart Tvs ,PlayStations, Xbox ,ChromeCast ,Apple
              Tv,Blu-ray players, and more
            </p>
          </div>

          {/* right side  */}
          <div className="flex-1 relative">
            <img src="/tv.png" alt="" className="mt-4 relative z-20" />
            <video
              className="absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              controls
              autoPlay={true}
              muted
              playsInline
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/*   separator*/}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>
      {/* section 2 */}
      <div className="bg-black text-white py-10">
        <div className="flex max-w-6xl items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2 mx-auto">
          {/* left side */}
          <div className="flex-1 ">
            <div className="relative">
              <img src="/stranger-things-lg.png" alt="" className="mt-4" />
              <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
                <img src="/stranger-things-sm.png" alt="" className="h-full" />
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      Stranger Things
                    </span>
                    <span className="text-sm text-blue-500">Dowloading...</span>
                  </div>
                  <img src="/download-icon.gif" alt="" className="h-12" />
                </div>
              </div>
            </div>
          </div>

          {/* right side  */}
          <div className="flex-1 md:text-left text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Download Your Shows to watch offline
            </h2>
            <p className="text-lg md:text-xl">
              Save Your Favourites easily and always have something to watch
            </p>
          </div>
        </div>
      </div>

      {/*   separator*/}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>
      {/* section 3 */}
      <div className="bg-black text-white py-10">
        <div className="flex max-w-6xl items-center justify-center md:flex-row flex-col px-4 md:px-2 mx-auto">
          {/* left side */}
          <div className="flex-1 text-center md:text-start">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>

          {/* right side  */}
          <div className="flex-1 relative overflow-hidden">
            <img src="/device-pile.png" alt="" className="mt-4 relative z-20" />
            <video
              className="absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 h-4/6 z-10 max-w-[63%]"
              controls
              autoPlay={true}
              muted
              playsInline
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/*   separator*/}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>
      {/* section 4*/}
      <div className="bg-black text-white py-10">
        <div className="flex max-w-6xl items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2 mx-auto">
          {/* left side */}
          <div className="flex-1 relative">
            <img src="/kids.png" alt="" className="mt-4" />
          </div>

          {/* right side  */}
          <div className="flex-1 md:text-left text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Create Profile For Kids
            </h2>
            <p className="text-lg md:text-xl">
              Send kids an Adventures with their Favourite characters in a space
              mode just for them-free with your membership
            </p>
          </div>
        </div>
      </div>

      {/*   separator*/}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>
      {/* section 4*/}
    </div>
  );
}

export default AuthScreen;
