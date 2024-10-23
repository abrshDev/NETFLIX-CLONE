import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthUser } from "../store/AuthUser";
import { Loader } from "lucide-react";
function LoginPage() {
  const [email, setemail] = useState("");

  const [password, setpassword] = useState("");
  const { user, isloginging, login } = useAuthUser();
  const handlelogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  if (isloginging) {
    return (
      <>
        <div className="h-screen">
          <div className="flex items-center justify-center bg-black h-full">
            <Loader className="animate-spin text-red-600 size-10" />
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="hero-bng h-screen w-full">
      <header className="max-w-6xl flex justify-between mx-auto">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="" className="w-52" />
        </Link>
      </header>
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md bg-black/60 p-8 space-y-6 rounded-lg shadow-md">
          <h1 className="text-white text-2xl font-bold mb-4 text-center">
            Login
          </h1>
          <form className="space-y-4" onSubmit={handlelogin}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                className="py-2 px-3 w-full border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="you@gmail.com"
                id="email"
                value={email}
                name="email"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                password
              </label>
              <input
                type="password"
                className="py-2 px-3 w-full border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="password"
                id="password"
                value={password}
                name="password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <button className="w-full bg-red-600 text-white font-semibold rounded-md py-2 hover:bg-red-700">
              {isloginging ? "loading..." : "Sign In"}
            </button>
          </form>
          <div className="text-center text-gray-400">
            don&apos;t have an Account?{" "}
            <Link to={"/signup"} className="text-red-500 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
