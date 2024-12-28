import React from "react";
import Teams from "./Teams";
import Links from "./Links";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-2 py-2 ">
      <div className="flex items-center gap-8 ">
        <Teams />
        <Links />
      </div>
      <div className="flex items-center gap-10">
        <Search />
      </div>
    </nav>
  );
};

export default Navbar;
