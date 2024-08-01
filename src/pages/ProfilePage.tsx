import { Navigate } from "react-router-dom";
import useAuthStore from "../auth.store";
import Alert from "../components/common/Alert";
import Button from "../components/common/Button";
import { HttpRequest } from "../helpers/http-request-class.helper";
import useUser from "../hooks/useUser";
import useUserLikes from "../hooks/useUserLikes";
import Layout from "./Layout";

const ProfilePage = () => {
  const { data: user, error, isLoading } = useUser();
  // const {data:games, error: gamesError} = useUserLikes()
  const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);
  const setTokens = useAuthStore((s) => s.setTokens);
  const { accessToken } = useAuthStore((s) => s.auth.tokens);
  const handleLogout = async () => {
    try {
      const res = await HttpRequest.delete("/v1/auth/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status == 200) {
        setIsAuthenticated(false);
        setTokens({ accessToken: undefined, refreshToken: undefined });
        return <Navigate to={"/"} />;
      }
    } catch (error) {
      return (
        <div>
          <Alert text="Can not Logout!" />
        </div>
      );
    }
  };
  if (error) {
    return (
      <div>
        <Layout />
        <Alert text="An error ocurred!" />
      </div>
    );
  }

  if (isLoading)
    return (
      <div>
        <Layout />
        <h2 className="loading loading-ring loading-lg text-4xl">Loading</h2>
      </div>
    );

  return (
    <>
      <Layout />
      <div>
        {/* <div className="avatar">
          <div className="w-24 rounded">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div> */}
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 ml-5">
          {/* Sidebar content here */}
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>{`${user.firstName} ${user.lastName}`}</li>
          <li>{user.username}</li>
        </ul>
        <Button
          color="primary"
          className="text-red-300"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </div>
    </>
  );
};

export default ProfilePage;
