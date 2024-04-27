import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      className="flex justify-between items-center sticky z-20 
    left-0 top-0 right-0 p-2 shadow-lg space-x-4 bg-base-300"
    >
      <p className="text-gray-700 text-justify w-full lg:w-[40vw] space-y-4 lg:space-y-0">
        Game hub is the best source to find information about any game you need.
        it provides you pictures and trailers along side the given description.
      </p>
      <div className="flex flex-col justify-between items-center">
        <Link to="/" className="underline text-gray-800 space-y-4 lg:space-y-0">
          Contact Us
        </Link>
        <Link to="/" className="underline text-gray-800 space-y-4 lg:space-y-0">
          About Us
        </Link>
        <span className="text-gray-600">Copyright 2024</span>
      </div>
    </div>
  );
}

export default Footer;
