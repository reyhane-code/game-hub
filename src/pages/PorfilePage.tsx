import Alert from "../components/common/Alert";
import useUser from "../hooks/useUser";
import Layout from "./Layout";

const ProfilePage = () => {
  const { data, error, isLoading } = useUser();

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

      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 ml-5">
        {/* Sidebar content here */}
        <li>
          <a>Sidebar Item 1</a>
        </li>
        <li>
          <a>Sidebar Item 2</a>
        </li>
      </ul>
    </>
  );
};

export default ProfilePage;
