import { useLocation } from "react-router-dom";
import GamesContainer from "../components/GameContainer";
// import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";

const HomePage = () => {

  return (
    <div className="grid grid-cols-12">
      <div className="w-full">
        <GamesContainer />
      </div>
    </div>
  );
};

export default HomePage;
