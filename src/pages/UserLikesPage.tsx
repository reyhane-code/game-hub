import ProfileMenu from "../components/ProfileMenu";
import UserContentFeed from "../components/UserContentFeed";
import DefaultLayout from "../components/layouts/DefaultLayout";

const UserLikesPage = () => {

  return (
    <>
      <DefaultLayout />

      <div className="flex items-start w-full mt-5 mx-2 px-2">
        <div className="w-1/4 max-width-[25rem] min-width-[16rem]">
          <ProfileMenu />
        </div>

        <div className="flex flex-col flex-grow-1 w-3/4">
          <div role="tablist" className="tabs tabs-bordered">

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Games"
              defaultChecked />
            <div role="tabpanel" className="tab-content p-10"><UserContentFeed contentType="game" requestType="likes" /></div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Articles" />
            <div role="tabpanel" className="tab-content p-10"><UserContentFeed contentType="article" requestType="likes" /></div>
          </div>


        </div>
      </div>
    </>
  );
};

export default UserLikesPage;
