import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import SearchInput from "./SearchInput";
import Image from "./common/Image";
import ThemeSwitch from "./ThemeSwitch";
import useAuthStore from "../auth.store";
import { IoHomeOutline } from "react-icons/io5";

const NavBar = () => {
  const isAuthenticated = useAuthStore((s) => s.auth.isAuthenticated);
  return (
    <div className="flex justify-between items-center sticky z-20 left-0 top-0 right-0 p-2 shadow-lg space-x-4 bg-base-100">
      <Link to="/">
        <IoHomeOutline className="text-3xl"/>
      </Link>
      <SearchInput />
      <Link to="/articles" className="btn btn-outline">
        Articles
      </Link>
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
