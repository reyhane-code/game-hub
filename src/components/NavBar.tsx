import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import ThemeSwitch from "./ThemeSwitch";
import { IoHomeOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const { isAuthenticated } = useAuth()
  return (
    <div className="flex justify-between items-center sticky z-20 left-0 top-0 right-0 p-2 shadow-lg space-x-4 bg-base-100">
      <Link to="/">
        <IoHomeOutline className="text-3xl" />
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
      {/* <AuthModal /> */}

    </div>
  );
};

export default NavBar;
