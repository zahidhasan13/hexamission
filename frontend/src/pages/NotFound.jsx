import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800 text-white text-center p-4">
      <div>
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl mt-2">Page Not Found</p>
        <p className="mt-4 text-gray-400">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 text-lg font-medium bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
