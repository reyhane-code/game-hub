import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import SearchInput from "./SearchInput";
import Image from "./common/Image";
import ThemeSwitch from "./ThemeSwitch";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center sticky left-0 top-0 right-0 p-2 shadow-lg space-x-4 bg-base-100">
      <Link to="/">
        <Image source={logo} altText="logo" className="w-16 h-16 bg-cover" />
      </Link>
      <SearchInput />
      <ThemeSwitch />
    </div>
  );
};

export default NavBar;
