import GamesContainer from "../components/GameContainer";
// import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";

const HomePage = () => {

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-12 flex flex-col">
        {/* <GameHeading /> */}
        <div className="flex w-full mb-5">
          <div className="mr-5 flex space-between">
            <GenreList />
            <PlatformSelector />
          </div>
          <SortSelector
            sortbyOptions={[
              { value: "", label: "Relevance" },
              { value: "-added", label: "Date added" },
              { value: "name", label: "Name" },
              { value: "-released", label: "Release date" },
              { value: "-metacritic", label: "Popularity" },
              { value: "-rating", label: "Average rating" },
            ]}
          />
        </div>
        <div className="w-full">
          <GamesContainer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
