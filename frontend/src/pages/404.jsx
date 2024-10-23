import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-white relative"
      style={{
        backgroundImage: `url('/404.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-lg text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl mb-2">Page Not Found</h2>
        <p className="text-lg mb-6">
          Oops! The page you are looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
