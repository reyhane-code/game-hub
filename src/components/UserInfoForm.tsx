import { useState } from "react";
import useUser from "../hooks/useUser";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Alert from "./common/Alert";
import EditableInput from "./common/EditableInput";
import Button from "./common/Button";
import { Form } from "react-router-dom";
import useAuthStore from "../auth.store";

interface Props {
  accessToken: string;
}

function UserInfoForm({ accessToken }: Props) {
  const { data: user, error, isLoading } = useUser();
  console.log("user", user)
  const phone = user?.phone;
  const [username, setUsername] = useState(user?.username || "");
  const [firstname, setFirstname] = useState(user?.firstName || "");
  const [lastname, setLastname] = useState(user?.lastName || "");
  const [password, setPassword] = useState(user?.password || "");
  const [email, setEmail] = useState(user?.email || "");
  const setIdentity = useAuthStore((s) => s.setIdentity);

  if (error) {
    return (
      <div>
        <Alert text="An error ocurred!" />
      </div>
    );
  }
  if (isLoading)
    return (
      <div>
        <h2 className="loading loading-ring loading-lg text-4xl">Loading</h2>
      </div>
    );

  const handleUpdateUser = async () => {
    console.log(user, "userr");
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
  return (
    <>
      <Form
        className="m-2 w-full grid grid-cols-1 lg:grid-cols-3 gap-4 px-8 py-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateUser();
        }}
      >
        <EditableInput
          value={username}
          onChange={setUsername}
          label="Username"
        />
        {phone && <EditableInput
          value={phone}
          onChange={() => console.log()}
          label="Phone"
          disabled={true}
        />}
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
        {!user?.password && (
          <>
            <EditableInput
              value={password}
              onChange={setPassword}
              label="Set Password"
            />
            <Button color="primary" className="text-lg m-2 text-blue-500">
              Save Password
            </Button>
          </>
        )}
        <Button
          type="submit"
          color="primary"
          className="text-lg m-2 text-blue-500 "
        >
          Save Changes
        </Button>
      </Form>
    </>
  );
}

export default UserInfoForm;
