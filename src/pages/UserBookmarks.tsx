import { useState } from "react";
import useUserBookmarks from "../hooks/useUserBookmarks";
import Alert from "../components/common/Alert";

const UserBookmarks = () => {
  const [entity, setEntity] = useState("game");
  const { data, isLoading, error } = useUserBookmarks(entity);

  if (error) {
    return (
      <div>
        <Alert text="An error ocurred!" />
      </div>
    );
  }
  //
  if (isLoading)
    return (
      <div>
        <h2 className="loading loading-ring loading-lg text-4xl">Loading</h2>
      </div>
    );

  return (
    <>
      <div>
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Games"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            {}
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Articles"
            onClick={() => setEntity("article")}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
       
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBookmarks;
