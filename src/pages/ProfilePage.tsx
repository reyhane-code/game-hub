import DefaultLayout from "../components/layouts/DefaultLayout";
import ProfileMenu from "../components/ProfileMenu";
import UserInfoForm from "../components/UserInfoForm";

const ProfilePage = () => {

  return (
    <>
      <DefaultLayout />

      <div className="flex items-start w-full mt-5 mx-2 px-2">
        <div className="w-1/4 max-width-[25rem] min-width-[16rem]">
          <ProfileMenu />
        </div>

        <div className="flex flex-col flex-grow-1 w-3/4">
          <UserInfoForm />
        </div>
      </div>

    </>
  );
};

export default ProfilePage;
