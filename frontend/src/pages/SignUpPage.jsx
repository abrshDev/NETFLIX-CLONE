import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthUser } from "../store/AuthUser";

function SignUpPage() {
  const { searchParams } = new URL(document.location);
  const emailvalue = searchParams.get("email");
  const [email, setemail] = useState(emailvalue || "");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const { signup, issigningup } = useAuthUser();
  const handlesubmit = (e) => {
    e.preventDefault();
    signup({ email, username, password });
    /*  setemail("");
    setusername("");
    setpassword(""); */
  };
  return (
    <div className="hero-bng h-screen w-full">
      <header className="max-w-6xl flex justify-between mx-auto">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="" className="w-52" />
        </Link>
        <Link to={"/login"}>
          <button>sign in</button>
        </Link>
      </header>
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md bg-black/60 p-8 space-y-6 rounded-lg shadow-md">
          <h1 className="text-white text-2xl font-bold mb-4 text-center">
            Sign up
          </h1>
          <form className="space-y-4" onSubmit={handlesubmit}>
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
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Username
              </label>
              <input
                type="username"
                className="py-2 px-3 w-full border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="simon"
                id="username"
                value={username}
                name="username"
                onChange={(e) => setusername(e.target.value)}
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
              {issigningup ? "loading" : "Sign Up"}
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already a member?{" "}
            <Link to={"/login"} className="text-red-500 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
