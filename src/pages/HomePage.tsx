import GameGrid from "../components/GameGrid";
// import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";

const HomePage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="hidden lg:flex h-max lg:col-span-3 3xl:col-span-2">
        <GenreList />
      </div>
      <div className="col-span-12 lg:col-span-9 3xl:col-span-10 flex flex-col">
        {/* <GameHeading /> */}
        <div className="flex w-full mb-5">
          <div className="mr-5 flex space-between">
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
          <GameGrid />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
