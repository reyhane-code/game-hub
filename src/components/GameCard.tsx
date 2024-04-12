import { Link } from "react-router-dom";
import Game from "../entities/Game";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
// import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";
import Image from "./common/Image";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <div className="flex flex-col rounded-sm">
      <Image
        source={getCroppedImageUrl(game.background_image)}
        altText=""
        width="[60px]"
        height="[60px]"
      />
      <div>
        <div className="flex items justify-between mb-3">
          <PlatformIconList
            platforms={game.parent_platforms?.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </div>

        <h2>
          <Link to={"/games/" + game.slug}>{game.name}</Link>
          {/* <Emoji rating={game.rating_top} /> */}
        </h2>
      </div>
    </div>
  );
};

export default GameCard;
