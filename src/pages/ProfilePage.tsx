import { useNavigate } from "react-router-dom";
import useAuthStore from "../auth.store";
import Alert from "../components/common/Alert";
import Button from "../components/common/Button";
import EditableInput from "../components/common/EditableInput";
import { HttpRequest } from "../helpers/http-request-class.helper";
import useUser from "../hooks/useUser";
import useUserLikes from "../hooks/useUserLikes";
import Layout from "./Layout";
import { useState } from "react";

const ProfilePage = () => {
  // const {data:games, error: gamesError} = useUserLikes()
  const { data: user, error, isLoading } = useUser();
  const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);
  const setIdentity = useAuthStore((s) => s.setIdentity);
  const setTokens = useAuthStore((s) => s.setTokens);
  const { accessToken } = useAuthStore((s) => s.auth.tokens);
  const navigator = useNavigate();
  const [phone, setPhone] = useState(user?.phone || "");
  const [username, setUsername] = useState(user?.username || "");
  const [firstname, setFirstname] = useState(user?.firstName || "");
  const [lastname, setLastname] = useState(user?.lastName || "");
  const [password, setPassword] = useState(user?.password || "");
  const [email, setEmail] = useState(user?.email || "");

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
        navigator("/");
      }
    } catch (error) {
      return (
        <div>
          <Alert text="Can not Logout!" />
        </div>
      );
    }
  };
  const handleUpdateUser = async () => {
    const updateData = {
      phone,
      username,
      email,
      firstname,
      lastname,
    };
    try {
      const res = await HttpRequest.put("/v1/user", updateData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status == 200) {
        //@ts-ignore
        setIdentity({ id: user.id, ...updateData });
      }
    } catch (error) {
      return (
        <div>
          <Alert text="Can not update data!" />
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
        <div className="m-2 p-5 w-1/2">
          <EditableInput
            value={username}
            onChange={setUsername}
            label="Username"
          />
          <EditableInput value={phone} onChange={setPhone} label="Phone" />
          <EditableInput value={email} onChange={setEmail} label="Email" />
          <EditableInput
            value={firstname}
            onChange={setFirstname}
            label="First Name"
          />
          <EditableInput
            value={lastname}
            onChange={setLastname}
            label="Last Name"
          />
          <Button
            color="secondary"
            className="text-lg m-2 text-blue-500"
            onClick={() => handleUpdateUser()}
          >
            Save Changes
          </Button>
          {!user?.password && (
            <>
              <EditableInput
                value={password}
                onChange={setPassword}
                label="Set Password"
              />
              <Button color="secondary" className="text-lg m-2 text-blue-500">
                Save Password
              </Button>
            </>
          )}
        </div>
        {/* <div className="avatar">
          <div className="w-24 rounded">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div> */}
        <div className="m-2 p-3">
          <Button
            color="primary"
            className="text-red-500 text-xl"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
