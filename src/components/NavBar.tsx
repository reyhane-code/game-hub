import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import ThemeSwitch from "./ThemeSwitch";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex justify-between items-center sticky z-20 left-0 top-0 right-0 p-2 shadow-lg space-x-4 bg-base-100">
      <Link to="/">
        <img src="/logo.png" className="w-16 h-16 object-cover" />
      </Link>
      <div className="w-full transform translate-x-0 lg:max-w-[50vw] lg:mx-auto">
        <SearchInput />
      </div>
      <div className="flex items-center gap-x-4">
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

      {/* <AuthModal /> */}
    </div>
  );
};

export default NavBar;
