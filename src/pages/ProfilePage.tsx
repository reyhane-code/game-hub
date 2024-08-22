import useAuthStore from "../auth.store";
import Layout from "./Layout";
import { useState } from "react";
import ProfileMenu from "../components/ProfileMenu";
import UserInfoForm from "../components/UserInfoForm";
import UserBookmarks from "./UserBookmarks";
import UserLikes from "./UserLikes";

const ProfilePage = () => {
  const { accessToken } = useAuthStore((s) => s.auth.tokens);
  const [selectedLink, setSelectedLink] = useState("");
  const handleMenuItemSelect = (link: string) => {
    setSelectedLink(link);
  };
  return (
    <>
      <Layout />
      <div className="flex w-full">
        <div className="flex flex-col w-96 max-w-300 me-8 px-6 py-2 space-y-4">
          {accessToken && (
            <ProfileMenu
              accessToken={accessToken}
              onMenuItemSelect={handleMenuItemSelect}
            />
          )}
        </div>
        <div className="w-full grow border-solid border-2 border-gray-200 rounded-sm">
          {selectedLink === "bookmarks" ? (
            <UserBookmarks />
          ) : selectedLink === "likes" ? (
            <UserLikes />
          ) : (
            accessToken && <UserInfoForm accessToken={accessToken} />
          )}
        </div>
      </div>
      {/* <div className="avatar">
          <div className="w-24 rounded">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div> */}
    </>
  );
};

export default ProfilePage;
