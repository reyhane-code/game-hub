import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import SearchInput from "./SearchInput";
import Image from "./common/Image";
import ThemeSwitch from "./ThemeSwitch";

const NavBar = () => {
  return (
    <div className="flex justify-between sticky left-0 top-0 right-0 p-1">
      <Link to="/">
        <Image source={logo} altText="logo" width="20px" height="20px" />
      </Link>
      <SearchInput />
      <ThemeSwitch />
    </div>
  );
};

export default NavBar;
