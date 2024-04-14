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
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image
          source={getCroppedImageUrl(game.background_image)}
          altText={game.name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <Link className="text-xl" to={"/games/" + game.slug}>
            {game.name}
          </Link>
          {/* <Emoji rating={game.rating_top} /> */}
        </h2>
        <div className="card-actions justify-end">
          <PlatformIconList
            platforms={game.parent_platforms?.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </div>
      </div>
    </div>
  );
};

export default GameCard;
