import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header border-b border-slate-300">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div>
          <h1 className="text-2xl font-bold">HexaMission</h1>
        </div>
        <div>
          <Link to="/" className="bg-sky-500 px-5 py-2 rounded font-semibold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
