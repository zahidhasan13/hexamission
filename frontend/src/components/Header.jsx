import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Header = () => {
  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };
  return (
    <div className="header border-b border-slate-300">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div>
          <h1 className="text-2xl font-bold">HexaMission</h1>
        </div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-rose-500 px-5 py-2 rounded font-semibold cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="bg-sky-500 px-5 py-2 rounded font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 px-5 py-2 rounded font-semibold"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
