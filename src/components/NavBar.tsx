import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import SearchInput from "./SearchInput";
import Image from "./common/Image";
import ThemeSwitch from "./ThemeSwitch";
import { checkAuthentication } from "../helpers/checkAuth.helper";

const NavBar = () => {
  const isAuthenticated = checkAuthentication();
  return (
    <div className="flex justify-between items-center sticky z-20 left-0 top-0 right-0 p-2 shadow-lg space-x-4 bg-base-100">
      <Link to="/">
        <Image
          src={logo}
          altText="logo"
          className="w-12 lg:w-16 max-h-16 bg-cover"
        />
      </Link>
      <SearchInput />
      {isAuthenticated ? (
        <Link to="/profile" className="btn btn-outline">
          Profile
        </Link>
      ) : (
        <Link to="/login" className="btn btn-outline">
          Login
        </Link>
      )}

      <ThemeSwitch />
    </div>
  );
};

export default NavBar;
