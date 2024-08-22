import { useNavigate } from "react-router-dom";
import useAuthStore from "../auth.store";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Button from "./common/Button";
import { useState } from "react";
import Alert from "./common/Alert";

interface Props {
  accessToken: string;
  onMenuItemSelect: (link: string) => void; // New prop for handling menu item selection
}

interface MenuItem {
  label: string;
  link: string;
}

const ProfileMenu = ({ accessToken, onMenuItemSelect }: Props) => {
  const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);
  const setTokens = useAuthStore((s) => s.setTokens);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { label: "User Information", link: "user" },
    { label: "Bookmarks", link: "bookmarks" },
    { label: "Likes", link: "likes" }
  ];

  const handleLogout = async () => {
    try {
      const res = await HttpRequest.delete("/v1/auth/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status === 200) {
        setIsAuthenticated(false);
        setTokens({ accessToken: undefined, refreshToken: undefined });
        navigate("/");
      }
    } catch (error) {
      setError("Cannot Logout!");
    }
  };

  return (
    <>
      {error && <Alert text={error} />}
      {menuItems.map((item) => (
        <Button
          key={item.link}
          className="text-lg m-3 p-5 text-gray-700 flex flex-row items-center space-x-3"
          color="primary"
          onClick={() => {
            onMenuItemSelect(item.link); // Call the parent function with the selected link
          }}
        >
          {item.label}
        </Button>
      ))}
      <Button
        color="primary"
        className="text-red-500 text-lg w-full p-1"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
};

export default ProfileMenu;
